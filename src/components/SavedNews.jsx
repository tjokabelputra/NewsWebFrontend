import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {politicsCategorySample, sampleUser} from "../newsData.js";
import { SavedNewsSample } from "../newsData.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkSolid, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const NewsCard = ({ news, unsave, newsDetail }) => {
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
                        <p>| {news.created_at}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => unsave(news.newsid)}>
                        <FontAwesomeIcon
                            icon={faBookmarkSolid}
                            style={{ width: "20px", height: "26px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const SavedNewsSection = ({ news, unsave, maxNews, newsDetail }) => {
    return(
        <div className="my-10 flex flex-col gap-6">
            {news.slice(0, maxNews).map((news, index) => {
                return <NewsCard
                    news={news}
                    key={index}
                    unsave={unsave}
                    newsDetail={newsDetail}/>
            })}
        </div>
    )
}

function SavedNews() {
    const navigate = useNavigate();
    const [savedNews, setSavedNews] = useState(SavedNewsSample)
    const [maxNews, setMaxNews] = useState(10)

    const unsave = (newsid) => {
        setSavedNews(savedNews.filter(news => news.newsid !== newsid));
    }

    const extentPage = () => {
        setMaxNews(maxNews + 10);
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

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    return(
        <div className="font-inter">
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
                    <p onClick={() => handleCategoryClick("All")}>Semua Berita</p>
                </div>
                <img
                    src={sampleUser.user_pp}
                    alt="user_pp"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleDashboard()}/>
            </nav>
            <main className="flex-grow bg-darkgray flex justify-center">
                <div className="w-320 px-20 pt-10 min-h-screen bg-white">
                    <h1 className="text-7xl text-sheen font-bold text-center">Berita Tersimpan</h1>
                    <div className="mt-6 flex justify-center items-center">
                        <div className="relative w-150 h-12">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
                            </div>
                            <textarea
                                className="w-full h-full px-8 text-base rounded-lg border-2 border-black resize-none outline-none flex items-center leading-12 pt-0 pb-0 overflow-hidden"
                                placeholder="Cari Berita"
                                style={{ lineHeight: '48px', paddingTop: '0', paddingBottom: '0' }}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex flex-row justify-center items-center gap-2">
                        <p className="text-2xl">Kategori: </p>
                        <select className="w-60 h-10 p-2 rounded-lg border-2 border-black">
                            <option>Semua</option>
                            <option>Politik</option>
                            <option>Olahraga</option>
                            <option>Teknologi</option>
                            <option>Ekonomi</option>
                            <option>Sains</option>
                        </select>
                    </div>
                    <SavedNewsSection
                        news={savedNews}
                        maxNews={maxNews}
                        unsave={unsave}
                        newsDetail={handleNewsDetail}/>
                    {maxNews < savedNews.length ? (
                        <button
                            className="mb-10 w-280 h-16 rounded-2xl text-4xl font-bold border-black border-2 cursor-pointer"
                            onClick={extentPage}>Tampilkan Lebih Banyak Berita</button>
                    ) : (<div className="mb-0"></div>)}
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

export default SavedNews;