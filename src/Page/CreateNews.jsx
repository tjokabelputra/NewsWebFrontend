import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {sampleUser} from "../newsData.js"

function CreateNews() {
    const navigate = useNavigate();
    const [bannerName, setBannerName] = useState("No File Selected")
    const [imageName, setImageName] = useState("No File Selected")
    const [titleText, setTitleText] = useState("")
    const [summaryText, setSummaryText] = useState("")
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

    const handleSummaryChange = (e) => {
        const text = e.target.value
        if(text.length <= maxChar) {
            setSummaryText(text)
        }
    }

    const getRemainingCharSummary = () => {
        return maxChar - summaryText.length
    }

    const changeBannerName = (e) => {
        setBannerName(e.target.files[0].name)
    }

    const changeImageName = (e) => {
        setImageName(e.target.files[0].name)
    }

    const handleHome = () => {
        navigate("/home")
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    return(
        <div className="font-inter">
            <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
                <p
                    className="text-4xl text-white font-bold cursor-pointer"
                    onClick={() => handleHome()}>NewsWeb</p>
                <img
                    src={sampleUser.user_pp}
                    alt="user_pp"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleDashboard()}/>
            </nav>
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
                <div className="w-320 py-10 min-h-screen bg-white">
                    <h1 className="text-7xl text-sheen font-bold text-center">Tambah Berita</h1>
                    <div className="py-10 px-20 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Judul</label>
                            <input
                                type="text"
                                className="w-280 h-12 px-4 py-2 text-base border-2 border-black rounded-lg outline-none"
                                placeholder="Judul Berita"
                                value={titleText}
                                onChange={handleTitleChange}
                                maxLength={maxChar}/>
                            <p className="text-xs ml-2">{getRemainingCharTitle()} Karakter Tersisa</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Kategori</label>
                            <select
                                className="w-60 h-12 px-4 py-2 text-base border-2 border-black rounded-lg outline-none">
                                <option value="Politik">Politik</option>
                                <option value="Ekonomi">Ekonomi</option>
                                <option value="Sosial">Sosial</option>
                                <option value="Hukum">Hukum</option>
                                <option value="Bisnis">Bisnis</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Gambar Banner</label>
                            <div className="w-135 h-12 px-4 py-2 flex items-center justify-between border-2 rounded-lg">
                                <span className="text-base truncate max-w-[70%]">{bannerName}</span>
                                <label className="w-16 h-6 bg-sheen text-xs text-white font-bold rounded-sm flex items-center justify-center cursor-pointer">
                                    Upload
                                    <input
                                        type="file"
                                        onChange={changeBannerName}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Gambar Berita</label>
                            <div className="w-135 h-12 px-4 py-2 flex items-center justify-between border-2 rounded-lg">
                                <span className="text-base truncate max-w-[70%]">{imageName}</span>
                                <label className="w-16 h-6 bg-sheen text-xs text-white font-bold rounded-sm flex items-center justify-center cursor-pointer">
                                    Upload
                                    <input
                                        type="file"
                                        onChange={changeImageName}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Isi Berita</label>
                            <textarea
                                className="w-280 h-250 p-4 text-base border-2 border-black rounded-lg outline-none resize-none"
                                placeholder="Isi Berita"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Rangkuman Berita</label>
                            <textarea
                                className="w-280 h-24 p-4 text-base border-2 border-black rounded-lg outline-none resize-none"
                                placeholder="Rangkuman Berita"
                                value={summaryText}
                                onChange={handleSummaryChange}
                                maxLength={maxChar}/>
                            <p className="text-xs ml-2">{getRemainingCharSummary()} Karakter Tersisa</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className="w-280 h-16 rounded-xl bg-sheen text-white text-5xl font-bold cursor-pointer">
                            Tambah Berita
                        </button>
                    </div>
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

export default CreateNews;