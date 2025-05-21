import React from "react"
import { useNavigate } from "react-router-dom"

function Navbar({ uid, profile_pic, useCategory, onProfileClick }){
    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/home")
    }

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`)
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

    return(
        <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
            <p
                className="text-4xl text-white font-bold cursor-pointer"
                onClick={() => handleHome()}>NewsWeb</p>
            { useCategory && (
                <div className="flex flex-row justify-center p-2 text-2xl gap-4 text-white font-bold cursor-pointer">
                    <p onClick={() => handleCategoryClick("Politik")}>Politik</p>
                    <p onClick={() => handleCategoryClick("Olahraga")}>Olahraga</p>
                    <p onClick={() => handleCategoryClick("Teknologi")}>Teknologi</p>
                    <p onClick={() => handleCategoryClick("Ekonomi")}>Ekonomi</p>
                    <p onClick={() => handleCategoryClick("Sains")}>Sains</p>
                    <p onClick={() => handleCategoryClick("Semua Berita")}>Semua Berita</p>
                </div>
            )}
            {uid === "" ? (
                <button
                    className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer"
                    onClick={() => handleLogin()}>Log in</button>
            ) : (
                <img
                    src={profile_pic}
                    alt="user_pp"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleDashboard()}/>
            )}
        </nav>
    )
}

export default Navbar

