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
        <div className="flex flex-col max-w-60 max-[481px]:max-w-45">
            <img
                src={news.banner_url}
                alt="banner"
                className="w-60 h-[126px] rounded-lg cursor-pointer border-1 border-black max-[481px]:w-45 max-[481px]:h-24"
                onClick={() => handleNewsDetail(news.newsid)}/>
            <div className="mt-4 flex flex-col">
                <div className="mr-2 flex flex-row justify-between items-center">
                    <div className="flex flex-row text-base max-[481px]:text-xs"
                         onClick={() => handleNewsDetail(news.newsid)}>
                        <p className="mr-2 text-sheen font-bold max-[481px]:mr-1">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => onToggleBookmark(news.newsid)}>
                        <FontAwesomeIcon
                            icon={isLiked(news.newsid) ? faBookmarkSolid : faBookmarkRegular}
                            style={{width: "12px", height: "16px"}}
                        />
                    </div>
                </div>
            </div>
            <p className="mt-2 text-base font-bold cursor-pointer max-[481px]:text-xs"
               onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
            <p className="mt-2 text-sm cursor-pointer max-[481px]:text-xs"
               onClick={() => handleNewsDetail(news.newsid)}>{news.summary}</p>
        </div>
    )
}

export default TopNewsCardAlternative