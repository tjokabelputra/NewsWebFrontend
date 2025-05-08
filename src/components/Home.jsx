import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { topNews, latestNews, newsByCategory, likedNewsSample as initialLikedNews } from "../newsData.js";

const LatestNewsCard = ({ news, onToggleBookmark, isLiked }) => {
    return(
        <div className="flex flex-col max-w-105 gap-4">
            <img src={news.banner_url} alt="banner" className="w-105 h-60 rounded-xl"/>
            <div className="mt-4 gap-4 flex flex-col">
                <div className="mr-r flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2">
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {news.created_date}</p>
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
            <p className="text-xl font-bold">{news.title}</p>
        </div>
    )
}

const LatestNewsSection = ({ newsItems, onToggleBookmark, isLiked }) => {
    return(
        <div className="mt-16 mb-16">
            <h2 className="text-5xl font-bold">Latest News</h2>
            <div className="mt-6 flex flex-row justify-between">
                {newsItems.map((news, index) => {
                    return <LatestNewsCard
                        key={index}
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}/>
                })}
            </div>
        </div>
    )
}

const CategoryNewsCard = ({ news, onToggleBookmark, isLiked }) => {
    return (
        <div className="flex flex-col max-w-105 gap-2">
            <img src={news.banner_url} alt="banner" className="w-105 h-60 rounded-xl"/>
            <div className="mt-4 gap-2 flex flex-col">
                <div className="gap-4 flex flex-row items-center">
                    <img src={news.auth_pp} className="w-10 h-10 rounded-[50%] border-[1px] border-solid border-black" alt="profile picture"/>
                    <p className="text-xl">{news.author}</p>
                </div>
                <div className="mr-2 flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2">
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {news.created_date}</p>
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
            <p className="text-xl font-bold">{news.title}</p>
        </div>
    )
}

const CategorySection = ({ title, newsItems, onToggleBookmark, isLiked }) => {
    return(
        <div className="mt-6">
            <h2 className="text-5xl font-bold">{title}</h2>
            <div className="mt-6 flex flex-row justify-between">
                {newsItems.map((news, index) => {
                    return <CategoryNewsCard
                        key={index}
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}/>
                })}
            </div>
        </div>
    )
}

function Home() {

    const [likedNews, setLikedNews] = useState(initialLikedNews)

    const isNewsLiked = (newsid) => {
        return likedNews.includes(newsid)
    }

    const toggleBookmark = (newsid) => {
        if(isNewsLiked(newsid)){
            setLikedNews(likedNews.filter(id => id !== newsid))
        }
        else {
            setLikedNews([...likedNews, newsid])
        }
    }

    return(
        <div className="font-inter">
            <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
                <p className="text-4xl text-white font-bold">NewsWeb</p>
                <div className="flex flex-row justify-center p-2 text-2xl gap-4 text-white font-bold cursor-pointer">
                    <p>Politik</p>
                    <p>Olahraga</p>
                    <p>Teknologi</p>
                    <p>Ekonomi</p>
                    <p>Sains</p>
                    <p>Semua Berita</p>
                </div>
                <button className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer">Log in</button>
            </nav>
            <main className="mt-16 px-12">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col max-w-160">
                        <img src={topNews[0].banner_url} alt="banner" className="w-160 h-[345px] rounded-xl"/>
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="mr-4 flex flex-row justify-between">
                                <div className="flex flex-row text-xl gap-2">
                                    <p className="text-sheen font-bold">{topNews[0].category}</p>
                                    <p>| {topNews[0].created_date}</p>
                                </div>
                                <div
                                    className="flex items-center justify-center h-[26px] cursor-pointer"
                                    onClick={() => toggleBookmark(topNews[0].newsid)}>
                                    <FontAwesomeIcon
                                        icon={isNewsLiked(topNews[0].newsid) ? faBookmarkSolid : faBookmarkRegular}
                                        style={{ width: "20px", height: "26px" }}
                                    />
                                </div>
                            </div>
                            <p className="text-2xl font-bold">{topNews[0].title}</p>
                            <p className="text-2xl">{topNews[0].summary}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center justify-between">
                            <div className="w-140 flex flex-col gap-4 mr-4">
                                <div className="mr-2 flex flex-row justify-between">
                                    <div className="flex flex-row text-xl gap-2">
                                        <p className="text-sheen font-bold">{topNews[1].category}</p>
                                        <p>| {topNews[1].created_date}</p>
                                    </div>
                                    <div
                                        className="flex items-center justify-center h-[26px] cursor-pointer"
                                        onClick={() => toggleBookmark(topNews[1].newsid)}>
                                        <FontAwesomeIcon
                                            icon={isNewsLiked(topNews[1].newsid) ? faBookmarkSolid : faBookmarkRegular}
                                            style={{ width: "20px", height: "26px" }}
                                        />
                                    </div>
                                </div>
                                <p className="text-xl font-bold">{topNews[1].title}</p>
                                <p className="text-xl">{topNews[1].summary}</p>
                            </div>
                            <img src={topNews[1].banner_url} alt="banner" className="w-130 h-70 rounded-xl"/>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div className="w-140 flex flex-col gap-4 mr-4">
                                <div className="mr-2 flex flex-row justify-between">
                                    <div className="flex flex-row text-xl gap-2">
                                        <p className="text-sheen font-bold">{topNews[2].category}</p>
                                        <p>| {topNews[2].created_date}</p>
                                    </div>
                                    <div
                                        className="flex items-center justify-center h-[26px] cursor-pointer"
                                        onClick={() => toggleBookmark(topNews[2].newsid)}>
                                        <FontAwesomeIcon
                                            icon={isNewsLiked(topNews[2].newsid) ? faBookmarkSolid : faBookmarkRegular}
                                            style={{ width: "20px", height: "26px" }}
                                        />
                                    </div>
                                </div>
                                <p className="text-xl font-bold">{topNews[2].title}</p>
                                <p className="text-xl">{topNews[2].summary}</p>
                            </div>
                            <img src={topNews[2].banner_url} alt="banner" className="w-130 h-70 rounded-xl"/>
                        </div>
                    </div>
                </div>
                <LatestNewsSection
                    newsItems={latestNews}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <CategorySection
                    title="Politik"
                    newsItems={newsByCategory.politik}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <CategorySection
                    title="Olahraga"
                    newsItems={newsByCategory.olahraga}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <CategorySection
                    title="Teknologi"
                    newsItems={newsByCategory.teknologi}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <CategorySection
                    title="Ekonomi"
                    newsItems={newsByCategory.ekonomi}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
                <CategorySection
                    title="Sains"
                    newsItems={newsByCategory.sains}
                    onToggleBookmark={toggleBookmark}
                    isLiked={isNewsLiked}/>
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