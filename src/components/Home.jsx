import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Utils.js";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { getHomeNews, saveNews, unsaveNews } from "../action/news.action.js"

const LoadingSpinner = () => {
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <FontAwesomeIcon
                icon={faSpinner}
                className="text-sheen text-6xl animate-spin mb-4"
            />
            <p className="text-3xl font-bold text-gray-700">Loading news...</p>
        </div>
    )
}

{/* The First Top News */}
const FirstTopNews = ({ news, onToggleBookmark, isLiked, newsDetail }) => {
    return(
        <div className="flex flex-col max-w-160 cursor-pointer">
            <img src={news.banner_url} alt="banner"
                 className="w-160 h-[345px] rounded-xl cursor-pointer"
                 onClick={() => newsDetail(news.newsid)}/>
            <div className="flex flex-col gap-4 mt-6">
                <div className="mr-4 flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2 cursor-pointer"
                         onClick={() => newsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{ width: "20px", height: "26px" }}
                        />
                    </div>
                </div>
                <p className="text-2xl font-bold cursor-pointer"
                   onClick={() => newsDetail(news.newsid)}>{news.title}</p>
                <p className="text-2xl cursor-pointer"
                   onClick={() => newsDetail(news.newsid)}>{news.summary}</p>
            </div>
        </div>
    )
}

{/* Second and Third Top News */}
const RestTopNews = ({ news, onToggleBookmark, isLiked, newsDetail }) => {
    return(
        <div className="flex flex-row items-center justify-between cursor-pointer">
            <div className="w-140 flex flex-col gap-4 mr-4">
                <div className="mr-2 flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2 cursor-pointer"
                         onClick={() => newsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{ width: "20px", height: "26px" }}
                        />
                    </div>
                </div>
                <p className="text-xl font-bold cursor-pointer"
                   onClick={() => newsDetail(news.newsid)}>{news.title}</p>
                <p className="text-xl cursor-pointer"
                   onClick={() => newsDetail(news.newsid)}>{news.summary}</p>
            </div>
            <img src={news.banner_url} alt="banner"
                 className="w-130 h-70 rounded-xl cursor-pointer"
                 onClick={() => newsDetail(news.newsid)}/>
        </div>
    )
}

{/* Grouped Second and Third News */}
const RestTopNewsSection = ({ secondNews, thirdNews, onToggleBookmarked, isLiked, newsDetail }) => {
    return(
        <div className="flex flex-col gap-4">
            < RestTopNews
                news={secondNews}
                onToggleBookmark={onToggleBookmarked}
                isLiked={isLiked}
                newsDetail={newsDetail}/>
            < RestTopNews
                news={thirdNews}
                onToggleBookmark={onToggleBookmarked}
                isLiked={isLiked}
                newsDetail={newsDetail}/>
        </div>
    )
}

{/* Grouped Top News */}
const TopNewsSection = ({ newsItems, onToggleBookmark, isLiked, newsDetail }) => {
    return(
        <div className="flex flex-row justify-between">
            <FirstTopNews
                news={newsItems[0]}
                onToggleBookmark={onToggleBookmark}
                isLiked={isLiked}
                newsDetail={newsDetail}/>
            <RestTopNewsSection
                secondNews={newsItems[1]}
                thirdNews={newsItems[2]}
                onToggleBookmarked={onToggleBookmark}
                isLiked={isLiked}
                newsDetail={newsDetail}/>
        </div>
    )
}

const LatestNewsCard = ({ news, onToggleBookmark, isLiked, newsDetail }) => {
    return(
        <div className="flex flex-col max-w-105 gap-4">
            <img
                src={news.banner_url}
                alt="banner"
                className="w-105 h-60 rounded-xl cursor-pointer"
                onClick={() => newsDetail(news.newsid)}/>
            <div className="mt-4 gap-4 flex flex-col">
                <div className="mr-r flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2 cursor-pointer"
                         onClick={() => newsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{ width: "20px", height: "26px" }}
                        />
                    </div>
                </div>
            </div>
            <p className="text-xl font-bold cursor-pointer"
               onClick={() => newsDetail(news.newsid)}>{news.title}</p>
        </div>
    )
}

const LatestNewsSection = ({ newsItems, onToggleBookmark, isLiked, newsDetail }) => {
    return(
        <div className="mt-16 mb-16">
            <h2 className="text-5xl font-bold">Latest News</h2>
            <div className="mt-6 flex flex-row justify-between">
                {newsItems.map((news) => {
                    return <LatestNewsCard
                        key={news.newsid}
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}
                        newsDetail={newsDetail}/>
                })}
            </div>
        </div>
    )
}

const CategoryNewsCard = ({ news, onToggleBookmark, isLiked, newsDetail }) => {
    return (
        <div className="flex flex-col max-w-105 gap-2">
            <img src={news.banner_url} alt="banner"
                 className="w-105 h-60 rounded-xl cursor-pointer"
                 onClick={() => newsDetail(news.newsid)}/>
            <div className="mt-4 gap-2 flex flex-col">
                <div className="gap-4 flex flex-row items-center">
                    <img src={news.auth_pp} className="w-10 h-10 rounded-[50%] border-[1px] border-solid border-black" alt="profile picture"/>
                    <p className="text-xl">{news.username}</p>
                </div>
                <div className="mr-2 flex flex-row justify-between">
                    <div
                        className="flex flex-row text-xl gap-2 cursor-pointer"
                        onClick={() => newsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{ width: "20px", height: "26px" }}
                        />
                    </div>
                </div>
            </div>
            <p
                className="text-xl font-bold cursor-pointer"
                onClick={() => newsDetail(news.newsid)}>{news.title}</p>
        </div>
    )
}

const CategorySection = ({ title, newsItems, onToggleBookmark, isLiked, newsDetail }) => {
    return(
        <div className="mt-6">
            <h2 className="text-5xl font-bold">{title}</h2>
            <div className="mt-6 flex flex-row justify-between">
                {newsItems.map((news) => {
                    return <CategoryNewsCard
                        key={news.newsid}
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}
                        newsDetail={newsDetail}/>
                })}
            </div>
        </div>
    )
}

function Home() {
    const navigate = useNavigate()
    const [topNews, setTopNews] = useState([])
    const [latestNews, setLatestNews] = useState([])
    const [politicsNews, setPoliticsNews] = useState([])
    const [sportsNews, setSportsNews] = useState([])
    const [techNews, setTechNews] = useState([])
    const [economyNews, setEconomyNews] = useState([])
    const [scienceNews, setScienceNews] = useState([])
    const [likedNews, setLikedNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const uid = "a24c76a0-4f8a-4a85-8ef0-bbdcaa28c6bf"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzZhODQ2OC0wN2M2LTQ5MmQtOGJjOS01ZjlhNDA5ZTk0MTUiLCJ1c2VybmFtZSI6InVzZXIxIiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsInByb2ZpbGVfcGljIjoiaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL25ld3N3ZWItZWY1YmYtZGV2L1Byb2ZpbGUgUGljdHVyZS8xNzZhODQ2OC0wN2M2LTQ5MmQtOGJjOS01ZjlhNDA5ZTk0MTVfMTc0NjE5NzY4NDk3NyIsImlhdCI6MTc0NzI5MTAzNCwiZXhwIjoxNzQ3Mzc3NDM0fQ.nVWfMVhHN_I7UasbGvCtzlksS214E_vxJTFbe9ozfQY"

    const isNewsLiked = (newsid) => {
        return likedNews.includes(newsid)
    }

    const toggleBookmark = (newsid) => {
        if(uid === ""){
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
            unsaveNews(token, uid, newsid)
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
                        theme: "colored",
                        transition: Bounce,
                    })
                })
        }
        else {
            saveNews(token, uid, newsid)
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

    useEffect(() => {
        setIsLoading(true)
        getHomeNews(uid)
            .then(data => {
                const politics = data.latestCat.filter(news => news.category === "Politik")
                const sports = data.latestCat.filter(news => news.category === "Olahraga")
                const tech = data.latestCat.filter(news => news.category === "Teknologi")
                const economy = data.latestCat.filter(news => news.category === "Ekonomi")
                const science = data.latestCat.filter(news => news.category === "Sains")

                console.log(data)
                setTopNews(data.topNews)
                setLatestNews(data.latestAll)
                setPoliticsNews(politics)
                setSportsNews(sports)
                setTechNews(tech)
                setEconomyNews(economy)
                setScienceNews(science)
                setLikedNews(data.savedNewsIds)
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
    }, [])

    const handleHome = () => {
        navigate("/home")
    }

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`)
    }

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    const handleLogin = () => {
        navigate("/login")
    }

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
            <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
                <p
                    className="text-4xl text-white font-bold cursor-pointer"
                    onClick={() => handleHome()}>NewsWeb</p>
                <div className="flex flex-row justify-center p-2 text-2xl gap-4 text-white font-bold cursor-pointer">
                    <p onClick={() => handleCategoryClick("Politik")}>Politik</p>
                    <p onClick={() => handleCategoryClick("Olahraga")}>Olahraga</p>
                    <p onClick={() => handleCategoryClick("Teknologi")}>Teknologi</p>
                    <p onClick={() => handleCategoryClick("Ekonomi")}>Ekonomi</p>
                    <p onClick={() => handleCategoryClick("Sains")}>Sains</p>
                    <p onClick={() => handleCategoryClick("Semua Berita")}>Semua Berita</p>
                </div>
                <button
                    className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer"
                    onClick={() => handleLogin()}>Log in</button>
            </nav>
            <main className="mt-16 px-12">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <TopNewsSection
                            newsItems={topNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            newsDetail={handleNewsDetail}/>
                        <LatestNewsSection
                            newsItems={latestNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            newsDetail={handleNewsDetail}/>
                        <CategorySection
                            newsItems={politicsNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            title="Politik"
                            newsDetail={handleNewsDetail}/>
                        <CategorySection
                            newsItems={sportsNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            title="Olahraga"
                            newsDetail={handleNewsDetail}/>
                        <CategorySection
                            newsItems={techNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            title="Teknologi"
                            newsDetail={handleNewsDetail}/>
                        <CategorySection
                            newsItems={economyNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            title="Ekonomi"
                            newsDetail={handleNewsDetail}/>
                        <CategorySection
                            newsItems={scienceNews}
                            onToggleBookmark={toggleBookmark}
                            isLiked={isNewsLiked}
                            title="Sains"
                            newsDetail={handleNewsDetail}/>
                    </>
                )}
            </main>
            <footer className="p-12 mt-16 gap-4 bg-darkgray text-white flex flex-col">
                <p className="text-5xl font-bold">News Web</p>
                <p className="text-2xl">Cepat, Akurat, dan Terpercaya</p>
                <p className="text-xs">©2025 News Web</p>
            </footer>
        </div>
    )
}

export default Home;