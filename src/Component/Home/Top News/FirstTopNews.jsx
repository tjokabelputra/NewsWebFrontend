import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"

function FirstTopNews ({ news, onToggleBookmark, isLiked }) {
    if(!news) return null
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    const bookmarkIconStyle = {
        width: windowWidth < 1281 ? '18px' : '20px',
        height: windowWidth < 1281 ? '24px' : '26px',
    }

    return(
        <div className="flex flex-col max-w-160 cursor-pointer max-[1281px]:max-w-90">
            <img src={news.banner_url} alt="banner"
                 className="w-160 h-[345px] rounded-xl cursor-pointer border-black border-2 max-[1281px]:w-90 max-[1281px]:h-[194px]"
                 onClick={() => handleNewsDetail(news.newsid)}/>
            <div className="flex flex-col gap-2 mt-6">
                <div className="mr-4 flex flex-row justify-between max-[1281px]:mr-2">
                    <div className="flex flex-row text-2xl gap-2 cursor-pointer max-[1281px]:text-lg"
                         onClick={() => handleNewsDetail(news.newsid)}>
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={bookmarkIconStyle}
                        />
                    </div>
                </div>
                <p className="text-2xl font-bold cursor-pointer max-[1281px]:text-lg"
                   onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
                <p className="text-xl cursor-pointer max-[1281px]:text-base"
                   onClick={() => handleNewsDetail(news.newsid)}>{news.summary}</p>
            </div>
        </div>
    )
}

export default FirstTopNews