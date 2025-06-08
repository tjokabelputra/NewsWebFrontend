import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"

function RestTopNews({ news, onToggleBookmark, isLiked }){
    if(!news) return null
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    const bookmarkIconStyle = {
        width:
            windowWidth < 1025
                ? "15px"
                : windowWidth < 1281
                    ? "18px"
                    : "20px",
        height:
            windowWidth < 1025
                ? "20px"
                : windowWidth < 1281
                    ? "24px"
                    : "26px",
    }

    return(
        <div className="flex flex-row items-center justify-between cursor-pointer">
            <div className="w-140 h-70 flex flex-col justify-around mr-4 max-[1281px]:w-95 max-[1281px]:h-[194px] max-[1025px]:mr-2 max-[1025px]:w-74 max-[1025px]:h-43">
                <div className="mr-4 flex flex-row justify-between max-[1281px]:mr-2">
                    <div className="flex flex-row text-2xl gap-2 cursor-pointer max-[1281px]:text-lg max-[1025px]:text-base"
                         onClick={() => handleNewsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={bookmarkIconStyle}
                        />
                    </div>
                </div>
                <p className="text-2xl font-bold cursor-pointer max-[1281px]:text-lg max-[1025px]:text-base"
                   onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
                <p className="text-2xl cursor-pointer max-[1281px]:text-base max-[1025px]:text-sm"
                   onClick={() => handleNewsDetail(news.newsid)}>{news.summary}</p>
            </div>
            <img src={news.banner_url} alt="banner"
                 className="w-130 h-70 rounded-2xl cursor-pointer border-2 border-black max-[1281px]:w-90 max-[1281px]:h-[194px] max-[1025px]:w-80 max-[1025px]:h-43"
                 onClick={() => handleNewsDetail(news.newsid)}/>
        </div>
    )
}

export default RestTopNews