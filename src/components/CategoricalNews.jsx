import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { politicsCategorySample, politicsCategorySaved } from "../newsData.js";

const NewsCard = ({ news, isNewsSaved, toggleBookmark }) => {
    return(
        <div className="flex flex-row gap-[24px]">
            <div className="w-60 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                <img
                    src={news.banner_url}
                    alt="banner"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-between">
                <p className="text-[24px] font-bold">{news.title}</p>
                <p className="text-[16px]">{news.summary}</p>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2 cursor-pointer">
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {news.created_at}</p>
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

const CategoryNews = ({ news, isNewsSaved, toggleBookmark, maxNews }) => {
    return(
        <div className="my-[40px] flex flex-col gap-6">
            {news.slice(0, maxNews).map((news, index) => {
                return <NewsCard
                    news={news}
                    key={index}
                    isNewsSaved = {isNewsSaved}
                    toggleBookmark = {toggleBookmark}/>
            })}
        </div>
    )
}

function CategoricalNews() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [savedCategorical, setSavedCategories] = useState(politicsCategorySaved);
    const [maxNews, setMaxNews] = useState(10)

    const isNewsSaved = (newsid) => {
        return savedCategorical.includes(newsid)
    }

    const toggleBookmark = (newsid) => {
        if(isNewsSaved(newsid)){
            setSavedCategories(savedCategorical.filter(id => id !== newsid));
        }
        else{
            setSavedCategories([...savedCategorical, newsid]);
        }
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
                <button className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer">Log in</button>
            </nav>
            <main className="flex-grow bg-darkgray flex justify-center">
                <div className="w-320 px-20 pt-10 min-h-screen bg-white">
                    <h1 className="text-[72px] text-sheen font-bold text-center">{category}</h1>
                    <div className="mt-6 flex justify-center items-center">
                        <div className="relative w-[800px] h-[48px]">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
                            </div>
                            <textarea
                                className="w-full h-full px-8 text-[16px] rounded-[8px] border border-black resize-none outline-none flex items-center leading-[48px] pt-0 pb-0 overflow-hidden"
                                placeholder="Cari Berita"
                                style={{ lineHeight: '48px', paddingTop: '0', paddingBottom: '0' }}
                            />
                        </div>
                    </div>
                    <CategoryNews
                        news={politicsCategorySample}
                        isNewsSaved={isNewsSaved}
                        toggleBookmark={toggleBookmark}
                        maxNews={maxNews}/>
                    {maxNews < politicsCategorySample.length ? (
                        <button
                            className="mb-[40px] w-[1120px] h-[64px] rounded-[16px] text-[36px] font-bold border-black border-2 cursor-pointer"
                            onClick={extentPage}>Tampilkan Lebih Banyak Berita</button>
                    ) : (<div className="mb-[0px]"></div>)}
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