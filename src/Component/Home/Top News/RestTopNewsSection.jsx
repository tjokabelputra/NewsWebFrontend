import React from "react"
import RestTopNews from "./RestTopNews.jsx"

function RestTopNewsSection({ secondNews, thirdNews, onToggleBookmarked, isLiked }){
    if(!secondNews || !thirdNews) return null

    return(
        <div className="flex flex-col gap-4">
            < RestTopNews
                news={secondNews}
                onToggleBookmark={onToggleBookmarked}
                isLiked={isLiked}/>
            < RestTopNews
                news={thirdNews}
                onToggleBookmark={onToggleBookmarked}
                isLiked={isLiked}/>
        </div>
    )
}

export default RestTopNewsSection