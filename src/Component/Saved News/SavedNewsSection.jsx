import React from "react"
import SavedNewsCard from "./SavedNewsCard.jsx"

function SavedNewsSection({ news, unsave, maxNews }){
    return(
        <div className="mt-10 flex flex-col gap-6 max-[1025px]:mt-6">
            {news.slice(0, maxNews).map((news, index) => {
                return <SavedNewsCard
                    news={news}
                    key={index}
                    unsave={unsave}/>
            })}
        </div>
    )
}

export default SavedNewsSection