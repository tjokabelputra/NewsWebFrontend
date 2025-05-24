import React from "react"
import LatestNewsCard from "./LatestNewsCard.jsx"

function LatestNewsSection({newsItems, onToggleBookmark, isLiked }){
    if(!newsItems || newsItems.length === 0) return null

    return(
        <div className="my-16 max-[1281px]:my-12 ">
            <h2 className="text-5xl font-bold max-[1281px]:text-4xl">Latest News</h2>
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