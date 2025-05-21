import React from "react"
import { formatDate } from "../../Utils.js"

function NewsManagementCard({ news, deleteNews }){
    return(
        <div className="flex flex-row gap-6 items-center">
            <div className="w-60 h-36 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                    src={news.banner_url}
                    alt="banner"
                    className="w-full h-full object-cover cursor-pointer"
                />
            </div>
            <div className="gap-6 flex flex-row justify-between w-full items-center">
                <div className="flex flex-col justify-between">
                    <p className="text-2xl font-bold">{news.title}</p>
                    <p className="text-base">{news.summary}</p>
                    <div className="flex flex-row text-xl gap-2">
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                </div>
                <div className="w-30 h-10 flex-shrink-0">
                    <button
                        className="w-full h-full bg-red text-white rounded-xl text-xl font-bold cursor-pointer"
                        onClick={() => deleteNews(news.newsid)}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsManagementCard