import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { getHomeNews, saveNews, unsaveNews } from "../action/news.action.js"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import TopNewsSection from "../Component/Home/Top News/TopNewsSection.jsx"
import LatestNewsSection from "../Component/Home/Latest News/LatestNewsSection.jsx"
import CategorySection from "../Component/Home/Category News/CategorySection.jsx"
import Navbar from "../Component/Navbar.jsx"
import Footer from "../Component/Footer.jsx"

function Home() {
    const navigate = useNavigate()
    const [accountDetail, setAccountDetail] = useState({ uid: "", token: "", profile_pic: "" })
    const [topNews, setTopNews] = useState([])
    const [latestNews, setLatestNews] = useState([])
    const [politicsNews, setPoliticsNews] = useState([])
    const [sportsNews, setSportsNews] = useState([])
    const [techNews, setTechNews] = useState([])
    const [economyNews, setEconomyNews] = useState([])
    const [scienceNews, setScienceNews] = useState([])
    const [likedNews, setLikedNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const isNewsLiked = (newsid) => {
        return likedNews.includes(newsid)
    }

    const toggleBookmark = (newsid) => {
        if(accountDetail.uid === ""){
            toast.warning('Anda harus login terlebih dahulu', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            return
        }

        if(isNewsLiked(newsid)){
            unsaveNews(accountDetail.token, accountDetail.uid, newsid)
                .then(() => {
                    toast.dismiss()
                    toast.info('Berita Dihapus Dari Favorit', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    })
                    setLikedNews(likedNews.filter(id => id !== newsid))
                })
                .catch(error => {
                    toast.dismiss()
                    toast.error(`Error: ${error}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    })
                })
        }
        else {
            saveNews(accountDetail.token, accountDetail.uid, newsid)
                .then(() => {
                    toast.dismiss()
                    toast.info('Berita Disimpan', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    })
                    setLikedNews([...likedNews, newsid])
                })
                .catch(error => {
                    toast.dismiss()
                    toast.error(`Error: ${error}`, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    })
                })
        }
    }

    const validateToken = () => {
        setIsLoading(true)
        const token = localStorage.getItem("jwt")
        if(!token){
            setAccountDetail({uid: "", token: "", profile_pic: ""})
            fetchNews("")
            return false
        }

        try{
            const decode = jwtDecode(token)
            const currentTime = Date.now() / 1000
            if(decode.exp < currentTime){
                toast.error("Session Expired", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    onClose: () => {
                        localStorage.removeItem("jwt")
                        navigate("/login")
                    }
                })
                return false
            }
            setAccountDetail({
                uid: decode.uid || "",
                profile_pic: decode.profile_pic || "",
                token: token
            })
            fetchNews(decode.uid)
        }
        catch (error){
            toast.error("Invalid Token", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            localStorage.removeItem("jwt")
            return false
        }
    }

    const fetchNews = (uid) => {
        getHomeNews(uid)
            .then(data => {
                if (data) {
                    const politics = data.latestCat?.filter(news => news.category === "Politik") || []
                    const sports = data.latestCat?.filter(news => news.category === "Olahraga") || []
                    const tech = data.latestCat?.filter(news => news.category === "Teknologi") || []
                    const economy = data.latestCat?.filter(news => news.category === "Ekonomi") || []
                    const science = data.latestCat?.filter(news => news.category === "Sains") || []

                    setTopNews(data.topNews || [])
                    setLatestNews(data.latestAll || [])
                    setPoliticsNews(politics)
                    setSportsNews(sports)
                    setTechNews(tech)
                    setEconomyNews(economy)
                    setScienceNews(science)
                    setLikedNews(data.savedNewsIds || [])
                }
                else {
                    toast.error("Failed to load news data", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    })
                }
                setIsLoading(false)
            })
            .catch(error => {
                toast.error(`Error loading news: ${error}`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
                setIsLoading(false)
            })
    }

    useEffect(() => {
        validateToken()
    }, [])

    return(
        <div className="font-inter min-h-screen flex flex-col">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {isLoading && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex opacity-80 items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg">
                            <LoadingSpinner
                                message={"Loading News..."}/>
                        </div>
                    </div>
                </>
            )}
            <Navbar
                uid={accountDetail.uid}
                profile_pic={accountDetail.profile_pic}
                useCategory={true}/>
            <main className="py-16 px-12 min-h-screen max-[1281px]:px-10 max-[1281px]:py-12">
                <TopNewsSection
                    newsItems={topNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <LatestNewsSection
                    newsItems={latestNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <CategorySection
                    newsItems={politicsNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}
                    title="Politik"/>
                <CategorySection
                    newsItems={sportsNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}
                    title="Olahraga"/>
                <CategorySection
                    newsItems={techNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}
                    title="Teknologi"/>
                <CategorySection
                    newsItems={economyNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}
                    title="Ekonomi"/>
                <CategorySection
                    newsItems={scienceNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}
                    title="Sains"/>
            </main>
            <Footer />
        </div>
    )
}

export default Home