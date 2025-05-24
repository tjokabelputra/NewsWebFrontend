import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import NewsManagementSection from "../Component/News Management/NewsManagementSection.jsx"
import { Bounce, toast, ToastContainer } from "react-toastify"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import { jwtDecode } from "jwt-decode"
import { getCreatedNews } from "../action/news.action.js"
import { deleteNews } from "../action/news.action.js"
import Footer from "../Component/Footer.jsx"
import Navbar from "../Component/Navbar.jsx"

function NewsManagement() {
    const navigate = useNavigate()
    const [accountDetail, setAccountDetail] = useState({ uid: "", profile_pic: "", token: "" })
    const [managedNews, setManagedNews] = useState([])
    const [filteredNews, setFilteredNews] = useState(managedNews)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [maxNews, setMaxNews] = useState(10)
    const [isLoading, setIsLoading] = useState(true)

    const handleDeleteNews = (newsid) => {
        setIsLoading(true)
        deleteNews(accountDetail.token, newsid)
            .then(() => {
                toast.success("Berita berhasil dihapus", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                setFilteredNews(filteredNews.filter(news => news.newsid !== newsid))
                setManagedNews(managedNews.filter(news => news.newsid !== newsid))
                setIsLoading(false)
            })
            .catch(error => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                setIsLoading(false)
            })
    }

    const filter = (category) => {
        setSearchKeyword("")
        if (category === "Semua") {
            setFilteredNews(managedNews)
        }
        else {
            setFilteredNews(managedNews.filter(news => news.category === category))
        }
    }

    const search = () => {
        if (searchKeyword === "") {
            setFilteredNews(managedNews)
        }
        else {
            setFilteredNews(managedNews.filter(news => news.title.includes(searchKeyword) || news.summary.includes(searchKeyword)))
        }
    }

    const extentPage = () => {
        setMaxNews(maxNews + 10)
    }

    const validateToken = () => {
        setIsLoading(true)
        const token = localStorage.getItem("jwt")

        if (!token) {
            setAccountDetail({ uid: "", profile_pic: "", token: "" })
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
                setIsLoading(false)
                return
            }
            setAccountDetail({
                uid: decode.uid,
                profile_pic: decode.profile_pic,
                token: token,
            })
            fetchManagedNews(token, decode.uid)
        }

        catch (error) {
            toast.error("Invalid Token", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            localStorage.removeItem("jwt")
            return false
        }
    }

    const fetchManagedNews = (token, uid) => {
        getCreatedNews(token, uid)
            .then(data => {
                setManagedNews(data.createdNews)
                setFilteredNews(data.createdNews)
                setIsLoading(false)
            })
            .catch(error => {
                toast.error(error.message,{
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
                setIsLoading(false)
            })
    }

    useEffect(() => {
        validateToken()
    }, [])

    const handleCreateNews = () => {
        navigate("/create")
    }

    return(
        <div className="font-inter">
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
                transition={Bounce}
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
                useCategory={false} />
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
                <div className="w-320 p-10 min-h-screen bg-white max-[1281px]:w-240">
                    <h1 className="text-7xl text-sheen font-bold text-center max-[1281px]:text-6xl">Manajemen Berita</h1>
                    <div className="mt-6 flex justify-center items-center">
                        <div className="relative w-200 h-12 max-[1281px]:w-150">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
                            </div>
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        search(searchKeyword)
                                    }
                                }}
                                className="w-full h-full px-8 text-base rounded-lg border-2 border-black outline-none leading-12"
                                placeholder="Cari Berita"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex flex-row justify-center items-center gap-2">
                        <p className="text-2xl">Kategori: </p>
                        <select
                            className="w-60 h-10 p-2 rounded-lg border-2 border-black max-[1281px]:w-50"
                            onChange={(e) => filter(e.target.value)}>
                            <option>Semua</option>
                            <option>Politik</option>
                            <option>Olahraga</option>
                            <option>Teknologi</option>
                            <option>Ekonomi</option>
                            <option>Sains</option>
                        </select>
                    </div>
                    <NewsManagementSection
                        news={filteredNews}
                        maxNews={maxNews}
                        deleteNews={handleDeleteNews}/>
                    {maxNews < filteredNews.length ? (
                        <button
                            className="mb-10 w-300 h-16 rounded-2xl text-4xl font-bold border-black border-2 cursor-pointer max-[1281px]:w-220 max-[1281px]:h-14 max-[1281px]:text-4xl"
                            onClick={extentPage}>Tampilkan Lebih Banyak Berita</button>
                    ) : null}
                    {!isLoading && (
                        <button
                            className="w-300 h-16 rounded-xl bg-sheen text-white text-5xl font-bold cursor-pointer max-[1281px]:w-220 max-[1281px]:h-14 max-[1281px]:text-4xl"
                            onClick={() => handleCreateNews()}>Tambah Berita</button>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default NewsManagement