import React from 'react'
import TopNewsCardAlternative from "./TopNewsCardAlternative.jsx"

function TopNewsSectionAlternative({ newsItems, onToggleBookmark, isLiked }) {
    if(!newsItems) return null

    return (
        <div className="flex flex-row justify-between">
            {newsItems.map((news) => {
                return <TopNewsCardAlternative
                    key={news.id}
                    news={news}
                    onToggleBookmark={onToggleBookmark}
                    isLiked={isLiked}/>
            })}
        </div>
    )
}

export default TopNewsSectionAlternative