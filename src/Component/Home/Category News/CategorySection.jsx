import React from "react"
import CategoryNewsCard from "./CategoryNewsCard.jsx"

function CategorySection({ title, newsItems, onToggleBookmark, isLiked }){
    if(!newsItems || newsItems.length === 0) return null

    return(
        <div className="mt-6 max-[769px]:mt-4">
            <h2 className="text-5xl font-bold max-[1281px]:text-4xl max-[1025px]:text-3xl max-[769px]:text-2xl">{title}</h2>
            <div className="mt-6 flex flex-row justify-between no-scrollbar max-[1025px]:mt-4 max-[769px]:overflow-x-auto max-[769px]:gap-4 max-[769px]:justify-start">
                {newsItems.map((news) => {
                    return <CategoryNewsCard
                        key={news.newsid}
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}/>
                })}
            </div>
        </div>
    )
}

export default CategorySection