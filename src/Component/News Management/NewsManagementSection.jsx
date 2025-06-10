import React from 'react'
import NewsManagementCard from "./NewsManagementCard.jsx"

function NewsManagementSection({ news, maxNews, deleteNews }) {
    return(
        <div className="my-10 flex flex-col gap-6 max-[1025px]:my-6 max-[481px]:gap-2">
            {news.slice(0, maxNews).map((news, index) => {
                return <NewsManagementCard
                    news={news}
                    key={index}
                    deleteNews={deleteNews}
                />
            })}
        </div>
    )
}

export default NewsManagementSection