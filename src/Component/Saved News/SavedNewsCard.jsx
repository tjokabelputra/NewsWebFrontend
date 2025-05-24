import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"

function SavedNewsCard({ news, unsave }){
    if(!news) return null
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    const bookmarkIconStyle = {
        width: windowWidth < 1281 ? '18px' : '20px',
        height: windowWidth < 1281 ? '24px' : '26px',
    }

    return(
        <div className="flex flex-row gap-6 items-center">
            <div className="w-60 h-36 flex-shrink-0 overflow-hidden border-2 border-black rounded-lg bg-gray-200 max-[1281px]:w-55 max-[1281px]:h-32">
                <img
                    src={news.banner_url}
                    alt="banner"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleNewsDetail(news.newsid)}
                />
            </div>
            <div className="flex flex-col justify-between">
                <p
                    className="text-2xl font-bold cursor-pointer max-[1281px]:text-lg"
                    onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
                <p
                    className="text-xl cursor-pointer max-[1281px]:text-base"
                    onClick={() => handleNewsDetail(news.newsid)}>{news.summary}</p>
                <div className="flex flex-row justify-between">
                    <div
                        className="flex flex-row text-2xl gap-2 cursor-pointer max-[1281px]:text-lg"
                        onClick={() => handleNewsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => unsave(news.newsid)}>
                        <FontAwesomeIcon
                            icon={faBookmarkSolid}
                            style={bookmarkIconStyle}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedNewsCard