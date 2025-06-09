import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllNews, saveNews, unsaveNews } from "../action/news.action.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast, Bounce } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import CategoryNews from "../Component/Category News/CategoryNews.jsx"
import Navbar from "../Component/Navbar.jsx"
import Footer from "../Component/Footer.jsx"

function CategoricalNews() {
    const navigate = useNavigate()
    const { category } = useParams()
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
    }, [])

    useEffect(() => {
        if (currentCategory === "") return

        if (category !== currentCategory) {
            setSearchKeyword("")
            setFinalKeyword("")
            fetchNews(category, accountDetail.uid, "")
            return
        }

        fetchNews(category, accountDetail.uid, finalKeyword)
    }, [category, finalKeyword])

    const extentPage = () => {
        setMaxNews(maxNews + 10)
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
                useCategory={true}/>
            <main className="flex-grow bg-darkgray flex justify-center">
                <div className="w-320 p-10 min-h-screen bg-white max-[1281px]:w-240 max-[1025px]:w-216 max-[1025px]:p-6 max-[769px]:w-176 max-[769px]:px-4">
                    <h1 className="text-7xl text-sheen font-bold text-center max-[1281px]:text-6xl max-[1025px]:text-5xl max-[769px]:text-4xl">{category}</h1>
                    <div className="mt-6 flex justify-center items-center max-[1025px]:mt-4">
                        <div className="relative w-200 h-12 max-[1281px]:w-150 max-[1025px]:w-120 max-[1025px]:h-10 max-[769px]:w-90 max-[769px]:h-9">
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
                                className="w-full h-full px-8 text-base rounded-lg border-2 border-black outline-none leading-12 max-[769px]:border-1 max-[769px]:text-sm"
                                placeholder="Cari Berita"
                            />
                        </div>
                    </div>
                    <CategoryNews
                        news={categoryNews}
                        isNewsSaved={isNewsSaved}
                        toggleBookmark={toggleBookmark}
                        maxNews={maxNews}/>
                    {maxNews < categoryNews.length ? (
                        <button
                            className="mt-10 w-300 h-16 rounded-2xl text-4xl font-bold border-black border-2 cursor-pointer
                            max-[1281px]:w-220
                            max-[1025px]:w-204 max-[1025px]:h-12 max-[1025px]:text-3xl max-[1025px]:mt-6
                            max-[769px]:w-168 max-[769px]:h-10 max-[769px]:text-2xl max-[769px]:rounded-xl max-[769px]:border-1"
                            onClick={extentPage}>Tampilkan Lebih Banyak Berita</button>
                    ) : null}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CategoricalNews