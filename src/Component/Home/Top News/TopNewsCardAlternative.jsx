import React from "react"
import {formatDate} from "../../../Utils.js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBookmark as faBookmarkSolid} from "@fortawesome/free-solid-svg-icons"
import {faBookmark as faBookmarkRegular} from "@fortawesome/free-regular-svg-icons"
import {useNavigate} from "react-router-dom"

function TopNewsCardAlternative({ news, onToggleBookmark, isLiked }) {
    const navigate = useNavigate()

    const handleNewsDetail = (newsid) => {
        navigate(`/news/${newsid}`)
    }

    return(
        <div className="flex flex-col max-w-60">
            <img
                src={news.banner_url}
                alt="banner"
                className="w-60 h-[126px] rounded-lg cursor-pointer border-1 border-black"
                onClick={() => handleNewsDetail(news.newsid)}/>
            <div className="mt-4 flex flex-col">
                <div className="mr-2 flex flex-row justify-between">
                    <div className="flex flex-row text-base"
                         onClick={() => handleNewsDetail(news.newsid)}>
                        <p className="mr-2 text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center h-[26px] cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{width: "12px", height: "16px"}}
                        />
                    </div>
                </div>
            </div>
            <p className="mt-2 text-base font-bold cursor-pointer"
               onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
            <p className="mt-2 text-sm cursor-pointer"
               onClick={() => handleNewsDetail(news.newsid)}>{news.summary}</p>
        </div>
    )
}

export default TopNewsCardAlternative