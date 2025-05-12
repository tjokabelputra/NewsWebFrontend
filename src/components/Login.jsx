import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleHome = () => {
        navigate("/home")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegister = () => {
        navigate("/signup")
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    return(
        <div className="font-inter">
            <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
                <p
                    className="text-4xl text-white font-bold cursor-pointer"
                    onClick={() => handleHome()}>NewsWeb</p>
                <button
                    className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer"
                    onClick={() => handleLogin()}>Log in</button>
            </nav>
            <main className="flex-grow min-h-screen bg-darkgray flex justify-center items-center">
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
                            onClick={() => handleDashboard()}>Masuk</button>
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