import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { createNews } from "../action/news.action.js"
import { jwtDecode } from "jwt-decode"
import { Bounce, toast, ToastContainer } from "react-toastify"
import Navbar from "../Component/Navbar.jsx"
import Footer from "../Component/Footer.jsx"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"


function CreateNews() {
    const navigate = useNavigate()
    const [accountDetail, setAccountDetail] = useState({ uid:"", profile_pic:"" })
    const [bannerFile, setBannerFile] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [titleText, setTitleText] = useState("")
    const [category, setCategory] = useState("Politik")
    const [contentText, setContentText] = useState("")
    const [summaryText, setSummaryText] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const maxChar = 255

    const handleTitleChange = (e) => {
        const text = e.target.value
        if(text.length <= maxChar) {
            setTitleText(text)
        }
    }

    const getRemainingCharTitle = () => {
        return maxChar - titleText.length
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleContentChange = (e) => {
        const text = e.target.value
        setContentText(text)
    }

    const handleSummaryChange = (e) => {
        const text = e.target.value
        if(text.length <= maxChar) {
            setSummaryText(text)
        }
    }

    const getRemainingCharSummary = () => {
        return maxChar - summaryText.length
    }

    const handleBannerChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setBannerFile(file)
            const previewUrl = URL.createObjectURL(file)
            setBannerName(previewUrl)

            return () => URL.revokeObjectURL(previewUrl)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            const previewUrl = URL.createObjectURL(file)
            setImageName(previewUrl)
        }
    }

    const handleCreateNews = () => {
        console.log(accountDetail.token, accountDetail.uid, titleText, contentText, category, summaryText, bannerFile, imageFile)

        if(titleText === "" || contentText === "" || summaryText === "" || bannerFile === null || imageFile === null) {
            toast.error("Mohon Lengkapi Informasi Berita", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return false
        }

        setIsLoading(true)
        createNews(accountDetail.token, accountDetail.uid, titleText, contentText, category, summaryText, bannerFile, imageFile)
            .then(() => {
                setIsLoading(false)
                toast.success("Berita berhasil ditambahkan", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    onClose: () => {
                        navigate("/manage")
                    }
                })
            })
            .catch(error => {
                setIsLoading(false)
                toast.error(error.message, {
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

    const validateToken = () => {
        setIsLoading(true)
        const token = localStorage.getItem("jwt")
        if(!token) {
            toast.error("Token Needed", {
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
            navigate("/login")
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
                return false
            }
            setAccountDetail({
                uid: decode.uid,
                profile_pic: decode.profile_pic,
                token: token
            })
            setIsLoading(false)
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
            navigate("/login")
        }
    }

    useEffect(() => {
        validateToken()
    }, [])

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
                                message={"Loading..."}/>
                        </div>
                    </div>
                </>
            )}
            <Navbar
                uid={accountDetail.uid}
                profile_pic={accountDetail.profile_pic}
                useCategory={false} />
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
                <div className="w-320 py-10 min-h-screen bg-white max-[1281px]:w-240">
                    <h1 className="text-7xl text-sheen font-bold text-center max-[1281px]:text-6xl">Tambah Berita</h1>
                    <div className="py-10 px-20 flex flex-col gap-6 max-[1281px]:px-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Judul</label>
                            <input
                                type="text"
                                className="w-280 h-12 px-4 py-2 text-base border-2 border-black rounded-lg outline-none max-[1281px]:w-220"
                                placeholder="Judul Berita"
                                value={titleText}
                                onChange={handleTitleChange}
                                maxLength={maxChar}/>
                            <p className="text-xs ml-2">{getRemainingCharTitle()} Karakter Tersisa</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Kategori</label>
                            <select
                                className="w-60 h-12 px-4 py-2 text-base border-2 border-black rounded-lg outline-none"
                                value={category}
                                onChange={handleCategoryChange}>
                                <option value="Politik">Politik</option>
                                <option value="Ekonomi">Ekonomi</option>
                                <option value="Sosial">Sosial</option>
                                <option value="Hukum">Hukum</option>
                                <option value="Bisnis">Bisnis</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Gambar Banner</label>
                            <div className="w-135 h-12 px-4 py-2 flex items-center justify-between border-2 rounded-lg max-[1281px]:w-120">
                                <span className="text-base truncate max-w-[70%]">
                                    {bannerFile ? bannerFile.name : "No File Selected"}
                                </span>
                                <label className="w-16 h-6 bg-sheen text-xs text-white font-bold rounded-sm flex items-center justify-center cursor-pointer">
                                    Upload
                                    <input
                                        type="file"
                                        onChange={handleBannerChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Gambar Berita</label>
                            <div className="w-135 h-12 px-4 py-2 flex items-center justify-between border-2 rounded-lg max-[1281px]:w-120">
                                <span className="text-base truncate max-w-[70%]">
                                    {imageFile ? imageFile.name : "No File Selected"}
                                </span>
                                <label className="w-16 h-6 bg-sheen text-xs text-white font-bold rounded-sm flex items-center justify-center cursor-pointer">
                                    Upload
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Isi Berita</label>
                            <textarea
                                className="w-280 h-250 p-4 text-base border-2 border-black rounded-lg outline-none resize-none max-[1281px]:w-220"
                                placeholder="Isi Berita"
                                value={contentText}
                                onChange={handleContentChange}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Rangkuman Berita</label>
                            <textarea
                                className="w-280 h-24 p-4 text-base border-2 border-black rounded-lg outline-none resize-none max-[1281px]:w-220"
                                placeholder="Rangkuman Berita"
                                value={summaryText}
                                onChange={handleSummaryChange}
                                maxLength={maxChar}/>
                            <p className="text-xs ml-2">{getRemainingCharSummary()} Karakter Tersisa</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="w-280 h-16 rounded-xl bg-sheen text-white text-5xl font-bold cursor-pointer max-[1281px]:w-220 max-[1281px]:h-14 max-[1281px]:text-4xl"
                            onClick={handleCreateNews}>
                            Tambah Berita
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CreateNews