import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAccount } from "../action/user.action.js"
import { ToastContainer, toast, Bounce } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import Navbar from "../Component/Navbar.jsx"

function Login() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLoginAccount = () => {
        if (!userEmail || !userPassword) {
            toast.warning("Masukan Email dan Password Anda!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                rtl: false,
            })
            return
        }

        if(userPassword.length < 8){
            toast.warning("Password minimal 8 karakter!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }

        setIsLoading(true)
        loginAccount(userEmail, userPassword)
            .then(data => {
                localStorage.setItem("jwt", data.token)
                console.log(data.token)
                navigate("/dashboard")
                setIsLoading(false)
            })
            .catch(error => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    rtl: false,
                })
                setIsLoading(false)
            })
    }

    const handleRegister = () => {
        navigate("/signup")
    }

    return(
        <div className="font-inter flex flex-col h-screen">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            {isLoading && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex opacity-80 items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg">
                            <LoadingSpinner
                                message={"Loading..."}/>
                        </div>
                    </div>
                </>
            )}
            <Navbar
                uid={""}
                profile_pic={""}
                useCategory={false} />
            <main className="flex-1 bg-darkgray flex justify-center items-center overflow-auto">

                <div className="w-120 h-135 px-10 flex flex-col justify-center gap-6 bg-white rounded-2xl shadow-lg">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold text-center">Masuk</h1>
                        <p className="text-base text-center">Silakan masukkan email dan password Anda untuk melanjutkan.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Email</label>
                            <div className="flex items-center w-full h-12 px-2 rounded-lg border-2 border-black">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <input
                                    type="email"
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    value={userEmail}
                                    className="w-full h-full ml-2 outline-none border-none"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold">Password</label>
                            <div className="flex items-center w-full h-12 px-2 rounded-lg border-2 border-black">
                                <FontAwesomeIcon icon={faKey} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full h-full ml-2 outline-none border-none"
                                    placeholder="Password"
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    value={userPassword}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="cursor-pointer ml-2"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4">
                        <button
                            className="w-100 h-12 bg-sheen rounded-2xl text-white text-2xl font-bold cursor-pointer"
                            onClick={() => handleLoginAccount()}>Masuk</button>
                        <div className="flex flex-row gap-1 justify-center">
                            <p className="text-base">Belum Memiliki Akun?</p>
                            <p
                                className="text-base text-sheen font-bold cursor-pointer"
                                onClick={() => handleRegister()}>Klik Disini</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;