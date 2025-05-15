import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { sampleUser, managedNewsSample } from "../newsData.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const NewsCard = ({ news, deleteNews }) => {
    return(
        <div className="flex flex-row gap-6">
            <div className="w-60 h-36 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                    src={news.banner_url}
                    alt="banner"
                    className="w-full h-full object-cover cursor-pointer"
                />
            </div>
            <div className="flex flex-row justify-between w-full items-center">
                <div className="flex flex-col justify-between">
                    <p className="text-2xl font-bold">{news.title}</p>
                    <p className="text-base">{news.summary}</p>
                    <div className="flex flex-row text-xl gap-2">
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {news.created_at}</p>
                    </div>
                </div>
                <div className="w-30 h-10 flex-shrink-0">
                    <button
                        className="w-full h-full bg-red text-white rounded-xl text-xl font-bold cursor-pointer"
                        onClick={() => deleteNews(news.newsid)}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    )
}

const NewsManagementSection = ({ news, maxNews, deleteNews }) => {
    return(
        <div className="my-10 flex flex-col gap-6">
            {news.slice(0, maxNews).map((news, index) => {
                return <NewsCard
                    news={news}
                    key={index}
                    deleteNews={deleteNews}
                />
            })}
        </div>
    )
}

function NewsManagement() {
    const navigate = useNavigate();
    const [managedNews, setManagedNews] = useState(managedNewsSample)
    const [filteredNews, setFilteredNews] = useState(managedNews)
    const [searchKeyword, setSearchKeyword] = useState("");
    const [maxNews, setMaxNews] = useState(10)

    const deleteNews = (newsid) => {
        setManagedNews(managedNews.filter(news => news.newsid !== newsid));
        setFilteredNews(filteredNews.filter(news => news.newsid !== newsid));
    }

    const filter = (category) => {
        if (category === "Semua") {
            setFilteredNews(managedNews);
        } else {
            setFilteredNews(managedNews.filter(news => news.category === category));
        }
    }

    const search = () => {
        if (searchKeyword === "") {
            setFilteredNews(managedNews);
        } else {
            setFilteredNews(managedNews.filter(news => news.title.includes(searchKeyword) || news.summary.includes(searchKeyword)));
        }
    }

    const extentPage = () => {
        setMaxNews(maxNews + 10);
    }

    const handleHome = () => {
        navigate("/home")
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    const handleCreateNews = () => {
        navigate("/create")
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
                <div className="w-320 px-20 pt-10 min-h-screen bg-white">
                    <h1 className="text-7xl text-sheen font-bold text-center">Manajemen Berita</h1>
                    <div className="mt-6 flex justify-center items-center">
                        <div className="relative w-150 h-12">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black" />
                            </div>
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        search(searchKeyword);
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
                            className="w-60 h-10 p-2 rounded-lg border-2 border-black"
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
                        deleteNews={deleteNews}/>
                    {maxNews < managedNews.length ? (
                        <button
                            className="mb-10 w-280 h-16 rounded-2xl text-4xl font-bold border-black border-2 cursor-pointer"
                            onClick={extentPage}>Tampilkan Lebih Banyak Berita</button>
                    ) : null}
                    <button
                        className="mb-10 w-280 h-16 rounded-xl bg-sheen text-white text-5xl font-bold cursor-pointer"
                        onClick={() => handleCreateNews()}>Tambah Berita</button>
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

export default NewsManagement;