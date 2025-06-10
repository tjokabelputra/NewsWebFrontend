import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { jwtDecode } from "jwt-decode"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import LogoutConfirmation from "../Component/LogoutConfirmation.jsx"
import ImageCropper from "../Component/ImageCropper.jsx"
import Navbar from "../Component/Navbar.jsx"

function Dashboard() {
    const navigate = useNavigate();
    const [accountDetail, setAccountDetail] = useState({uid:"", profile_pic:"", username: "", email: "", role: ""})
    const [isLoading, setIsLoading] = useState(true)
    const [logoutToastId, setLogoutToastId] = useState(null)
    const [imageCropper, setImageCropper] = useState(false)

    const handleImageCropper = () => {
        setImageCropper(true)
    }

    const handleCropComplete = () => {
        setImageCropper(false)
        getUserInfo()
    }

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
                uid: decode.uid,
                profile_pic: decode.profile_pic,
                username: decode.username,
                email: decode.email,
                role: decode.role,
                token: token
            })
            console.log(decode.username)
            console.log(decode.profile_pic)
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
            <Navbar
                uid={accountDetail.uid}
                profile_pic={accountDetail.profile_pic}
                useCategory={false}
                onProfileClick={() => setImageCropper(false)}/>
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
                {isLoading ? (
                    <LoadingSpinner
                        message={"Loading..."}/>
                ) : imageCropper ? (
                    <ImageCropper
                        token={accountDetail.token}
                        uid={accountDetail.uid}
                        onCropComplete={handleCropComplete}/>
                ) : (
                    <div className="w-120 h-135 px-10 flex flex-col justify-center gap-6 bg-white rounded-2xl shadow-lg
                    max-[769px]:w-115 max-[769px]:h-128 max-[769px]:px-[30px]
                    max-[481px]:w-90 max-[481px]:h-110 max-[481px]:gap-4 max-[481px]:px-4">
                        <div className="flex flex-col gap-8 text-center max-[481px]:gap-4">
                            <div className="flex flex-col gap-4">
                                <img
                                    src={accountDetail.profile_pic}
                                    alt="user_pp"
                                    className="w-30 h-30 rounded-full border-black border-2 mx-auto cursor-pointer max-[481px]:w-25 max-[481px]:h-25"
                                    onClick={handleImageCropper}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="text-2xl font-bold max-[481px]:text-xl">{accountDetail.username}</p>
                                    <p className="text-2xl max-[481px]:text-xl">{accountDetail.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <button
                                    className="w-full h-12 bg-sheen text-white text-2xl font-bold rounded-2xl cursor-pointer max-[481px]:h-10 max-[481px]:rounded-lg max-[481px]:text-xl"
                                    onClick={handleSavedNews}>Berita Tersimpan</button>
                                {accountDetail.role === "Admin" && (
                                    <button
                                        className="w-full h-12 bg-sheen text-white text-2xl font-bold rounded-2xl cursor-pointer max-[481px]:h-10 max-[481px]:rounded-lg max-[481px]:text-xl"
                                        onClick={handleNewsManagement}>Manajemen Berita</button>
                                )}
                                <button
                                    className="w-full h-12 bg-red text-white text-2xl font-bold rounded-2xl cursor-pointer max-[481px]:h-10 max-[481px]:rounded-lg max-[481px]:text-xl"
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