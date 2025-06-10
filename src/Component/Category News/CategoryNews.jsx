import React from "react"
import CategoryNewsCard from "./CategoryNewsCard.jsx"

function CategoryNews({ news, isNewsSaved, toggleBookmark, maxNews }){
    return(
        <div className="mt-10 flex flex-col gap-6 max-[1025px]:mt-6 max-[481px]:gap-2">
            {news.slice(0, maxNews).map((news, index) => {
                return <CategoryNewsCard
                    news={news}
                    key={index}
                    isNewsSaved = {isNewsSaved}
                    toggleBookmark = {toggleBookmark}/>
            })}
        </div>
    )
}

export default CategoryNews