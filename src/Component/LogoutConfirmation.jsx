import React from "react"
import { useNavigate } from "react-router-dom"

function LogoutConfirmation({ closeToast }){
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

export default LogoutConfirmation