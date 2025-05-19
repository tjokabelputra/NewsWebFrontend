import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getAllNews, saveNews, unsaveNews} from "../action/news.action.js";
import { formatDate } from "../Utils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faBookmark as faBookmarkSolid, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {jwtDecode} from "jwt-decode";

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

const NewsCard = ({ news, isNewsSaved, toggleBookmark, newsDetail }) => {
    return(
        <div className="flex flex-row gap-6">
            <div className="w-60 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                <img
                    src={news.banner_url}
                    alt="banner"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => newsDetail(news.newsid)}
                />
            </div>
            <div className="flex flex-col justify-between">
                <p
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => newsDetail(news.newsid)}>{news.title}</p>
                <p
                    className="text-base cursor-pointer"
                    onClick={() => newsDetail(news.newsid)}>{news.summary}</p>
                <div className="flex flex-row justify-between">
                    <div
                        className="flex flex-row text-xl gap-2 cursor-pointer"
                        onClick={() => newsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => toggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isNewsSaved(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{ width: "20px", height: "26px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const CategoryNews = ({ news, isNewsSaved, toggleBookmark, maxNews, newsDetail }) => {
    return(
        <div className="my-10 flex flex-col gap-6">
            {news.slice(0, maxNews).map((news, index) => {
                return <NewsCard
                    news={news}
                    key={index}
                    isNewsSaved = {isNewsSaved}
                    toggleBookmark = {toggleBookmark}
                    newsDetail={newsDetail}/>
            })}
        </div>
    )
}

function CategoricalNews() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [accountDetail, setAccountDetail] = useState({uid:"", profile_pic:"", token:""})
    const [currentCategory, setCurrentCategory] = useState("")
    const [searchKeyword, setSearchKeyword] = useState("")
    const [finalKeyword, setFinalKeyword] = useState("")
    const [categoryNews, setCategoryNews] = useState([])
    const [savedCategorical, setSavedCategories] = useState()
    const [maxNews, setMaxNews] = useState(10)
    const [isLoading, setIsLoading] = useState(true)

    const isNewsSaved = (newsid) => {
        return savedCategorical.includes(newsid)
    }

    const toggleBookmark = (newsid) => {
        if(accountDetail.uid === ""){
            toast.warn("Anda harus login terlebih dahulu", {
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
            return
        }

        if(isNewsSaved(newsid)){
            unsaveNews(accountDetail.token, accountDetail.uid, newsid)
                .then(() => {
                    toast.dismiss()
                    toast.success("Berita berhasil dihapus dari daftar tersimpan", {
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
                    setSavedCategories(savedCategorical.filter(id => id !== newsid))
                })
                .catch(error => {
                    toast.dismiss()
                    toast.error(error, {
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
        else{
            saveNews(accountDetail.token, accountDetail.uid, newsid)
                .then(() => {
                    toast.dismiss()
                    toast.success("Berita berhasil disimpan", {
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
                    setSavedCategories([...savedCategorical, newsid])
                })
                .catch(error => {
                    toast.dismiss()
                    toast.error(error, {
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
    }

    const search = () => {
        setFinalKeyword(searchKeyword)
    }

    const validateToken = () => {
        const token = localStorage.getItem("jwt")

        if(!token){
            setAccountDetail({uid:"", profile_pic: "", token: ""})
            return { uid: "" }
        }

        try {
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
                return { uid: "" }
            }

            setAccountDetail({
                uid: decode.uid,
                profile_pic: decode.profile_pic,
                token: token
            })

            return { uid: decode.uid }
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
                transition: Bounce,
            })
            localStorage.removeItem("jwt")
            return { uid: "" }
        }
    }

    const fetchNews = (categoryName, uid, keyword = "") => {
        setIsLoading(true)

        getAllNews(categoryName, uid, keyword)
            .then(data => {
                setCurrentCategory(categoryName)
                setCategoryNews(data.news)
                setSavedCategories(data.savedNewsIds)
            })
            .catch(error => {
                toast.error(error, {
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
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        const tokenValidation = validateToken()
        fetchNews(category, tokenValidation.uid, "")
    }, []);

    useEffect(() => {
        if (currentCategory === "") return;

        if (category !== currentCategory) {
            setSearchKeyword("")
            setFinalKeyword("")
            fetchNews(category, accountDetail.uid, "")
            return
        }

        fetchNews(category, accountDetail.uid, finalKeyword)
    }, [category, finalKeyword]);

    const extentPage = () => {
        setMaxNews(maxNews + 10)
    }

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

    const handleDashboard = () => {
        navigate("/dashboard")
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
                {accountDetail.uid === "" ? (
                    <button
                        className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer"
                        onClick={() => handleLogin()}>Log in</button>
                ) : (
                    <img
                        src={accountDetail.profile_pic}
                        alt="user_pp"
                        className="w-12 h-12 rounded-full cursor-pointer"
                        onClick={() => handleDashboard()}/>
                )}
            </nav>
            <main className="flex-grow bg-darkgray flex justify-center">
                <div className="w-320 px-20 pt-10 min-h-screen bg-white">
                    {isLoading ? <LoadingSpinner /> : (
                        <>
                            <h1 className="text-7xl text-sheen font-bold text-center">{category}</h1>
                            <div className="mt-6 flex justify-center items-center">
                                <div className="relative w-200 h-12">
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
                            <CategoryNews
                                news={categoryNews}
                                isNewsSaved={isNewsSaved}
                                toggleBookmark={toggleBookmark}
                                maxNews={maxNews}
                                newsDetail={handleNewsDetail}/>
                            {maxNews < categoryNews.length ? (
                                <button
                                    className="mb-10 w-280 h-16 rounded-2xl text-4xl font-bold border-black border-2 cursor-pointer"
                                    onClick={extentPage}>Tampilkan Lebih Banyak Berita</button>
                            ) : null}
                        </>
                    )}
                </div>
            </main>
            <footer className="p-12 gap-4 bg-darkgray text-white flex flex-col">
                <p className="text-5xl font-bold">News Web</p>
                <p className="text-2xl">Cepat, Akurat, dan Terpercaya</p>
                <p className="text-xs">©2025 News Web</p>
            </footer>
        </div>
    )
}

export default CategoricalNews;