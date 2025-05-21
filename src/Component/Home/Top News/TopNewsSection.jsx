import React from "react"
import FirstTopNews from "./FirstTopNews.jsx"
import RestTopNewsSection from "./RestTopNewsSection.jsx"

function TopNewsSection({ newsItems, onToggleBookmark, isLiked }){
    if(!newsItems || newsItems.length < 3) return null

    return(
        <div className="flex flex-row justify-between">
            <FirstTopNews
                news={newsItems[0]}
                onToggleBookmark={onToggleBookmark}
                isLiked={isLiked}/>
            <RestTopNewsSection
                secondNews={newsItems[1]}
                thirdNews={newsItems[2]}
                onToggleBookmarked={onToggleBookmark}
                isLiked={isLiked}/>
        </div>
    )
}

export default TopNewsSection