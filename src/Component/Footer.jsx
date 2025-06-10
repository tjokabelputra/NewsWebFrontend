import React from "react"

function Footer(){
    return(
        <footer className="p-12 gap-4 bg-darkgray text-white flex flex-col
        max-[1281px]:p-10 max-[1281px]:gap-2 max-[1025px]:p-8 max-[769px]:px-4 max-[769px]:py-6 max-[481px]:px-2 max-[481px]:py-4">
            <p className="text-5xl font-bold max-[1281px]:text-3xl max-[481px]:text-2xl">News Web</p>
            <p className="text-2xl max-[1281px]:text-base max-[481px]:text-sm">Cepat, Akurat, dan Terpercaya</p>
            <p className="text-xs">©2025 News Web</p>
        </footer>
    )
}

export default Footer