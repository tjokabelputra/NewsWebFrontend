import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast, Bounce} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {jwtDecode} from "jwt-decode";

const LoadingSpinner = () => {
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <FontAwesomeIcon
                icon={faSpinner}
                className="text-sheen text-6xl animate-spin mb-4"
            />
            <p className="text-3xl font-bold text-gray-700">Loading Details...</p>
        </div>
    )
}

function LogoutConfirmation({ closeToast }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("jwt")
        closeToast("confirmed")
        navigate("/login")
    }

    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">Keluar Akun</p>
                    <p className="text-sm">Apakah Anda Ingin Keluar dari akun</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                <button
                    className="text-red-600 font-bold cursor-pointer"
                    onClick={handleLogout}>Keluar</button>
                <button
                    className="cursor-pointer text-black font-bold "
                    onClick={() => closeToast("cancelled")}>Batal</button>
            </div>
        </div>
    )
}

function Dashboard() {
    const navigate = useNavigate();
    const [accountDetail, setAccountDetail] = useState({profile_pic:"", username: "", email: "", role: ""})
    const [isLoading, setIsLoading] = useState(true)
    const [logoutToastId, setLogoutToastId] = useState(null)

    const showLogoutConfirmation = () => {
        if(logoutToastId !== null) {
            return
        }

        const toastId = toast(LogoutConfirmation, {
            closeButton: false,
            className: 'w-100 border border-red',
            ariaLabel: 'Logout Confirmation',
            onClose: () => {
                setLogoutToastId(null)
            }
        })

        setLogoutToastId(toastId)
    }

    const getUserInfo = () => {
        setIsLoading(true)
        const token = localStorage.getItem("jwt")
        if(!token){
            navigate("/home")
        }

        try{
            const decode = jwtDecode(token)
            const currentTime = Date.now() / 1000
            if(decode.exp < currentTime){
                toast.error("Session Expired", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        localStorage.removeItem("jwt")
                        navigate("/login")
                    }
                })
                return false
            }
            setAccountDetail({
                profile_pic: decode.profile_pic,
                username: decode.username,
                email: decode.email,
                role: decode.role
            })
            setIsLoading(false)
        }
        catch (error) {
            toast.error("Invalid Token", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            localStorage.removeItem("jwt")
            navigate("/home")
        }
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    const handleHome = () => {
        navigate("/home")
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    const handleLogoutClick = () => {
        showLogoutConfirmation()
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
                    src={accountDetail.profile_pic}
                    alt="user_pp"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => handleDashboard()}/>
            </nav>
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
                { isLoading ? (
                    <LoadingSpinner />
                ) : (
                <div className="w-120 h-135 px-10 flex flex-col justify-center gap-6 bg-white rounded-2xl shadow-lg">
                    <div className="flex flex-col gap-8 text-center">
                        <div className="flex flex-col gap-4">
                            <img
                                src={accountDetail.profile_pic}
                                alt="user_pp"
                                className="w-30 h-30 rounded-full border-black border-2 mx-auto"/>
                            <div className="flex flex-col gap-2">
                                <p className="text-2xl font-bold">{accountDetail.username}</p>
                                <p className="text-2xl">{accountDetail.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                className="w-100 h-12 bg-sheen text-white text-2xl font-bold rounded-2xl cursor-pointer"
                                onClick={() => handleSavedNews()}>Berita Tersimpan</button>
                            {accountDetail.role === "Admin" ? (
                                <button
                                    className="w-100 h-12 bg-sheen text-white text-2xl font-bold rounded-2xl cursor-pointer"
                                    onClick={() => handleNewsManagement()}>Manajemen Berita</button>
                            ) : null}
                            <button
                                className="w-100 h-12 bg-red text-white text-2xl font-bold rounded-2xl cursor-pointer"
                                onClick={handleLogoutClick}>Keluar Akun</button>
                        </div>
                    </div>
                </div>
                    )}
            </main>
            <ToastContainer autoClose={false} position="top-center"/>
        </div>
    )
}

export default Dashboard;