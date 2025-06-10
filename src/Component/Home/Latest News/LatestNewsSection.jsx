import React from "react"
import LatestNewsCard from "./LatestNewsCard.jsx"

function LatestNewsSection({newsItems, onToggleBookmark, isLiked }){
    if(!newsItems || newsItems.length === 0) return null

    return(
        <div className="my-16 max-[1281px]:my-12 max-[1025px]:my-10 max-[768px]:my-8 max-[481px]:my-6">
            <h2 className="text-5xl font-bold max-[1281px]:text-4xl max-[1025px]:text-3xl max-[768px]:text-2xl max-[481px]:text-xl">Latest News</h2>
            <div className="mt-6 flex flex-row justify-between no-scrollbar
            max-[1025px]:mt-4 max-[769px]:overflow-x-auto max-[769px]:gap-4 max-[769px]:justify-start max-[481px]:mt-2 max-[481px]:gap-2">
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