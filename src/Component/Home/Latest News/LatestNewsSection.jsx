import React from "react"
import LatestNewsCard from "./LatestNewsCard.jsx"

function LatestNewsSection({newsItems, onToggleBookmark, isLiked }){
    if(!newsItems || newsItems.length === 0) return null

    return(
        <div className="mt-16 mb-16">
            <h2 className="text-5xl font-bold">Latest News</h2>
            <div className="mt-6 flex flex-row justify-between">
                {newsItems.map((news) => {
                    return <LatestNewsCard
                        key={news.newsid}
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}/>
                })}
            </div>
        </div>
    )
}

export default LatestNewsSection