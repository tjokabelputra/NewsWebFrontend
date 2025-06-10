import React from 'react'
import TopNewsCardAlternative from "./TopNewsCardAlternative.jsx"

function TopNewsSectionAlternative({ newsItems, onToggleBookmark, isLiked }) {
    if(!newsItems) return null

    return (
        <div className="flex flex-row justify-start gap-2 no-scrollbar max-[481px]:overflow-x-auto">
            {newsItems.map((news) => {
                return <div key={news.id} className="max-[481px]:flex-shrink-0">
                    <TopNewsCardAlternative
                        news={news}
                        onToggleBookmark={onToggleBookmark}
                        isLiked={isLiked}/>
                </div>
            })}
        </div>
    )
}

export default TopNewsSectionAlternative