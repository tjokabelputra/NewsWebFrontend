import React from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"

function LatestNewsCard({ news, onToggleBookmark, isLiked }){
    if(!news) return null
    const navigate = useNavigate()

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    return(
        <div className="flex flex-col max-w-105 gap-4">
            <img
                src={news.banner_url}
                alt="banner"
                className="w-105 h-60 rounded-xl cursor-pointer"
                onClick={() => handleNewsDetail(news.newsid)}/>
            <div className="mt-4 gap-4 flex flex-col">
                <div className="mr-r flex flex-row justify-between">
                    <div className="flex flex-row text-xl gap-2 cursor-pointer"
                         onClick={() => handleNewsDetail(news.newsid)}>
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
               onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
        </div>
    )
}

export default LatestNewsCard