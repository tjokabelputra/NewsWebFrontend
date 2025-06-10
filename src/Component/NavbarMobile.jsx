import React from "react"
import { useNavigate } from "react-router-dom"

function NavbarMobile({ uid, profile_pic, useCategory, onProfileClick }){
    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/home")
    }

    const handleCategoryClick = (e) => {
        const category = e.target.value
        navigate(`/category/${category}`)
    }

    const handleAllCategoryClick = () => {
        navigate(`/category/Semua Berita`)
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleDashboard = () => {
        if(onProfileClick){
            onProfileClick()
        }
        navigate("/dashboard")
    }

    return (
        <nav className="h-10 px-2 bg-darkgray flex flex-row justify-between items-center">
            <p
                className="text-lg text-white font-bold cursor-pointer"
                onClick={handleHome}>
                NewsWeb
            </p>
            <p
                className="text-xs text-white font-bold"
                onClick={handleAllCategoryClick}>Semua Berita</p>
            {useCategory && (
                <select
                    className="text-xs text-white font-bold cursor-pointer"
                    onChange={handleCategoryClick}
                    defaultValue=""
                >
                    <option value="" disabled hidden>Kategori</option>
                    <option className="text-black" value="Politik">Politik</option>
                    <option className="text-black" value="Olahraga">Olahraga</option>
                    <option className="text-black" value="Teknologi">Teknologi</option>
                    <option className="text-black" value="Ekonomi">Ekonomi</option>
                    <option className="text-black" value="Sains">Sains</option>
                </select>
            )}

            {uid === "" ? (
                <button
                    className="w-16 h-6 rounded-lg bg-sheen text-xs text-white font-bold cursor-pointer"
                    onClick={handleLogin}
                >
                    Log in
                </button>
            ) : (
                <img
                    src={profile_pic}
                    alt="user_pp"
                    className="w-12 h-12 rounded-full cursor-pointer
                    max-[1281px]:w-10 max-[1281px]:h-10
                    max-[769px]:w-8 max-[769px]:h-8"
                    onClick={handleDashboard}
                />
            )}
        </nav>
    );
}

export default NavbarMobile