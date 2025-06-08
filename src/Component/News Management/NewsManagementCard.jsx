import React from "react"
import { formatDate } from "../../Utils.js"

function NewsManagementCard({ news, deleteNews }){
    return(
        <div className="flex flex-row gap-6 items-center max-[1025px]:gap-4">
            <div className="w-60 h-35 flex-shrink-0 overflow-hidden border-2 border-black rounded-lg max-[1281px]:w-55 max-[1281px]:h-32 max-[1025px]:w-50 max-[1025px]:h-29">
                <img
                    src={news.banner_url}
                    alt="banner"
                    className="w-full h-full object-cover cursor-pointer"
                />
            </div>
            <div className="gap-6 flex flex-row justify-between w-full items-center max-[1281px]:gap-4">
                <div className="flex flex-col justify-between">
                    <p className="text-2xl font-bold max-[1281px]:text-lg max-[1025px]:text-base">{news.title}</p>
                    <p className="text-xl max-[1281px]:text-base max-[1025px]:text-sm">{news.summary}</p>
                    <div className="flex flex-row text-2xl gap-2 max-[1281px]:text-lg max-[1025px]:text-base">
                        <p className="text-sheen font-bold">{news.category}</p>
                        <p>| {formatDate(news.created_date)}</p>
                    </div>
                </div>
                <div className="w-30 h-10 flex-shrink-0 max-[1025px]:w-25 max-[1025px]:h-8">
                    <button
                        className="w-full h-full bg-red text-white rounded-xl text-xl font-bold cursor-pointer max-[1025px]:rounded-lg"
                        onClick={() => deleteNews(news.newsid)}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsManagementCard