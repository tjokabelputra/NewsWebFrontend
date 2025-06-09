import React, { useState } from "react"
import ReactCrop, { makeAspectCrop, centerCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { updateProfilePicture } from "../action/user.action.js"
import { Bounce, toast } from "react-toastify"
import LoadingSpinner from "./LoadingSpinner.jsx"

const ASPECT_RATIO = 1
const MIN_DIM = 150

function ImageCropper({ token, uid, onCropComplete }) {
    const [imgSrc, setImgSrc] = useState("")
    const [crop, setCrop] = useState()
    const [error, setError] = useState("")
    const [completedCrop, setCompletedCrop] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const onSelectFile = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const imageElement = new Image()
            const imageUrl = reader.result?.toString() || ""
            imageElement.src = imageUrl

            imageElement.addEventListener("load", (e) => {
                if (error) setError("")
                const { naturalWidth, naturalHeight } = e.currentTarget
                if (naturalWidth < MIN_DIM || naturalHeight < MIN_DIM) {
                    setError("Gambar Berukuran Minimal 150 x 150 Pixel.")
                    return setImgSrc("")
                }
                setImgSrc(imageUrl)
            })
        })
        reader.readAsDataURL(file)
    }

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget
        const cropWidthInPercent = (MIN_DIM / width) * 100

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)
    }

    const getCroppedImage = async () => {
        if (!completedCrop || !imgSrc) {
            return null
        }

        const image = new Image()
        image.src = imgSrc
        await new Promise(resolve => image.onload = resolve)

        const canvas = document.createElement('canvas')
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = completedCrop.width * scaleX
        canvas.height = completedCrop.height * scaleY
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        )

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
            }, 'image/png')
        })
    }

    const handleProfilePictureChange = async() => {
        try {
            const croppedBlob = await getCroppedImage()
            if (!croppedBlob) {
                toast.error("Please crop an image first.", {
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
                return
            }

            const croppedFile = new File([croppedBlob], "profile.png", { type: croppedBlob.type })
            setIsLoading(true)
            updateProfilePicture(token, uid, croppedFile)
                .then((result) => {
                    localStorage.setItem("jwt", result.newToken)
                    setIsLoading(false)
                    toast.success("Profile Berhasil Diupdate", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        onClose: () => {
                            if (onCropComplete) {
                                onCropComplete(result.profilePictureUrl)
                            }
                        }
                    })
                })
                .catch(error => {
                    console.error("Error updating profile picture:", error)
                    toast.error(error.message || "Failed to update profile picture", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce
                    })
                    setIsLoading(false)
                })
        }
        catch (error) {
            console.error("Error getting cropped image:", error)
            toast.error("Error processing image.", {
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
        }
    }

    return (
        <div className="p-6 w-240 h-162 bg-darkgray-2 rounded-2xl flex flex-col gap-6 max-[1281px]:w-200 max-[1281px]:h-150 max-[769px]:w-180">
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
            <div className="flex flex-row">
                <label className="w-30 h-10 bg-sheen text-2xl text-white font-bold rounded-lg flex items-center justify-center cursor-pointer">
                    Upload
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="hidden"
                    />
                </label>
            </div>
            {error && <p className="text-red text-xs">{error}</p>}
            {imgSrc && (
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="flex-grow overflow-auto flex justify-center items-center no-scrollbar">
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)} // Add this to capture the completed crop
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIM}
                        >
                            <img
                                src={imgSrc}
                                alt="upload"
                                className="max-h-full object-contain"
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            className="w-40 h-10 bg-sheen text-white text-xl font-bold rounded-lg"
                            onClick={handleProfilePictureChange}
                            disabled={!imgSrc || !crop || !completedCrop}
                        >
                            Crop Image
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageCropper