import React from 'react';
import { useNavigate } from "react-router-dom";
import { sampleUser } from "../newsData.js";

function Dashboard() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/home")
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSavedNews = () => {
        navigate("/saved")
    }

    const handleNewsManagement = () => {
        navigate("/manage")
    }

    return(
        <div className="font-inter">
            <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
                <p
                    className="text-4xl text-white font-bold cursor-pointer"
                    onClick={() => handleHome()}>NewsWeb</p>
                <img
                    src={sampleUser.user_pp}
                    alt="user_pp"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleDashboard()}/>
            </nav>
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
                <div className="w-120 h-135 px-10 flex flex-col justify-center gap-6 bg-white rounded-2xl shadow-lg">
                    <div className="flex flex-col gap-8 text-center">
                        <div className="flex flex-col gap-4">
                            <img
                                src={sampleUser.user_pp}
                                alt="user_pp"
                                className="w-30 h-30 rounded-full border-black border-2 mx-auto"/>
                            <div className="flex flex-col gap-2">
                                <p className="text-2xl font-bold">{sampleUser.username}</p>
                                <p className="text-2xl">{sampleUser.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                className="w-100 h-12 bg-sheen text-white text-2xl font-bold rounded-2xl cursor-pointer"
                                onClick={() => handleSavedNews()}>Berita Tersimpan</button>
                            {sampleUser.role === "Admin" ? (
                                <button
                                    className="w-100 h-12 bg-sheen text-white text-2xl font-bold rounded-2xl cursor-pointer"
                                    onClick={() => handleNewsManagement()}>Manajemen Berita</button>
                            ) : null}
                            <button
                                className="w-100 h-12 bg-red text-white text-2xl font-bold rounded-2xl cursor-pointer"
                                onClick={() => handleLogin()}>Keluar Akun</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;