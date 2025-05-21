import React from "react"
import CategoryNewsCard from "./CategoryNewsCard.jsx"

function CategorySection({ title, newsItems, onToggleBookmark, isLiked }){
    if(!newsItems || newsItems.length === 0) return null

    return(
        <div className="mt-6">
            <h2 className="text-5xl font-bold">{title}</h2>
            <div className="mt-6 flex flex-row justify-between">
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