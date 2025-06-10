import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createAccount } from "../action/user.action.js"
import { ToastContainer, toast, Bounce } from "react-toastify"
import { faUser ,faEnvelope, faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import Navbar from "../Component/Navbar.jsx"

function Signup() {
    const navigate = useNavigate();
    const [usernames, setUsernames] = React.useState("")
    const [emails, setEmails] = React.useState("")
    const [passwords, setPasswords] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleSignUp = () => {
        if (!usernames || !emails || !passwords) {
            toast.warning("Masukan Username, Email dan Password Anda!", {
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

        if(!isValidEmail(emails)){
            toast.warning("Format Email Salah", {
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

        if(passwords.length < 8){
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
        createAccount(usernames, emails, passwords)
            .then(() => {
                setIsLoading(false)
                toast.success("Akun berhasil dibuat!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => {
                        navigate("/login")
                    }
                })
            })
            .catch(error => {
                toast.error(error, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setIsLoading(false)
            })
    }

    const handleLogin = () => {
        navigate("/login")
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
                useCategory={false}/>
            <main className="flex-1 bg-darkgray flex justify-center items-center overflow-auto">
                <div className="w-120 h-135 px-10 flex flex-col justify-center gap-6 bg-white rounded-2xl shadow-lg
                max-[769px]:w-115 max-[769px]:px-[30px]
                max-[481px]:w-90 max-[481px]:h-110 max-[481px]:gap-4 max-[481px]:px-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold text-center max-[481px]:text-3xl">Daftar</h1>
                        <p className="text-base text-center max-[481px]:text-sm">Buat akun untuk mengakses semua fitur dan layanan kami dengan mudah!</p>
                    </div>
                    <div className="flex flex-col gap-4 max-[481px]:gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold max-[481px]:text-sm">Username</label>
                            <div className="flex items-center w-full h-12 px-2 rounded-lg border-2 border-black max-[481px]:h-10 max-[481px]:text-sm">
                                <FontAwesomeIcon icon={faUser} />
                                <input
                                    type="email"
                                    className="w-full h-full ml-2 outline-none border-none"
                                    placeholder="Nama"
                                    onChange={(e) => setUsernames(e.target.value)}
                                    value={usernames}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold max-[481px]:text-sm">Email</label>
                            <div className="flex items-center w-full h-12 px-2 rounded-lg border-2 border-black max-[481px]:h-10 max-[481px]:text-sm">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <input
                                    type="email"
                                    className="w-full h-full ml-2 outline-none border-none"
                                    placeholder="Email"
                                    onChange={(e) => setEmails(e.target.value)}
                                    value={emails}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base font-bold max-[481px]:text-sm">Password</label>
                            <div className="flex items-center w-full h-12 px-2 rounded-lg border-2 border-black max-[481px]:h-10 max-[481px]:text-sm">
                                <FontAwesomeIcon icon={faKey} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full h-full ml-2 outline-none border-none"
                                    placeholder="Password"
                                    onChange={(e) => setPasswords(e.target.value)}
                                    value={passwords}
                                    minLength={8}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="cursor-pointer ml-2"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4 max-[481px]:gap-2">
                        <button
                            className="w-full h-12 bg-sheen rounded-2xl text-white text-2xl font-bold cursor-pointer max-[481px]:h-10 max-[481px]:rounded-lg max-[481px]:text-xl"
                            onClick={() => handleSignUp()}>Daftar</button>
                        <div className="flex flex-row gap-1 justify-center">
                            <p className="text-base">Sudah Memiliki Akun?</p>
                            <p
                                className="text-base text-sheen font-bold cursor-pointer"
                                onClick={() => handleLogin()}>Klik Disini</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Signup;

