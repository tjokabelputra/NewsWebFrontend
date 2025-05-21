import React from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"

function FirstTopNews ({ news, onToggleBookmark, isLiked }) {
    if(!news) return null
    const navigate = useNavigate()

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    return(
        <div className="flex flex-col max-w-160 cursor-pointer">
            <img src={news.banner_url} alt="banner"
                 className="w-160 h-[345px] rounded-xl cursor-pointer"
                 onClick={() => handleNewsDetail(news.newsid)}/>
            <div className="flex flex-col gap-4 mt-6">
                <div className="mr-4 flex flex-row justify-between">
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
                <p className="text-2xl font-bold cursor-pointer"
                   onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
                <p className="text-2xl cursor-pointer"
                   onClick={() => handleNewsDetail(news.newsid)}>{news.summary}</p>
            </div>
        </div>
    )
}

export default FirstTopNews