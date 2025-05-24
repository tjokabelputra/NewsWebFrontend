import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"

function LatestNewsCard({ news, onToggleBookmark, isLiked }){
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
        <div className="flex flex-col max-w-105 max-[1281px]:max-w-70">
            <img
                src={news.banner_url}
                alt="banner"
                className="w-105 h-60 rounded-2xl cursor-pointer border-2 border-black max-[1281px]:w-70 max-[1281px]:h-40"
                onClick={() => handleNewsDetail(news.newsid)}/>
            <div className="mt-4 gap-2 flex flex-col">
                <div className="mr-2 flex flex-row justify-between">
                    <div className="flex flex-row text-2xl gap-2 cursor-pointer max-[1281px]:text-lg"
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
            </div>
            <p className="mt-2 text-2xl font-bold cursor-pointer max-[1281px]:text-lg"
               onClick={() => handleNewsDetail(news.newsid)}>{news.title}</p>
        </div>
    )
}

export default LatestNewsCard