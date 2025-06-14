import React from "react"
import { Bounce, toast } from "react-toastify"
import {postComment} from "../../action/comment.action.js"

function CreateComment({ token, uid, newsid, onCommentAdded }) {
    const [commentText, setCommentText] = React.useState("")
    const maxCharacters = 1000

    const handleCommentChange = (e) => {
        const text = e.target.value
        if (text.length <= maxCharacters) {
            setCommentText(text)
        }
    }

    const getRemainingCharacters = () => {
        return maxCharacters - commentText.length
    }
    const handleCreateComment = () => {
        if(uid === ""){
            toast.warning("Anda harus login terlebih dahulu!", {
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

        postComment(token, uid, newsid, commentText)
            .then(data => {
                toast.success('Komentar berhasil ditambahkan!', {
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
                setCommentText("")
                if(onCommentAdded){
                    onCommentAdded(data.comment)
                }
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
                    transition: Bounce,
                })
            })
    }


    return(
        <div className="mb-6 px-6 py-4 gap-2 flex flex-col rounded-2xl border-black border-1 bg-gray max-[769px]:px-4 max-[481px]:py-2 max-[481px]:mb-4 max-[481px]:rounded-lg">
            <h2 className="text-3xl font-bold max-[1025px]:text-2xl max-[769px]:text-xl max-[481px]:text-base">Komentar</h2>
            <div className="h-24 bg-white rounded-lg border-black border-1 max-[1281px]:h-21 max-[481px]:h-19">
                <textarea
                    className="w-full h-full p-2 resize-none outline-none text-base max-[769px]:text-sm max-[481px]:text-xs"
                    placeholder="Tulis komentar disini..."
                    value={commentText}
                    onChange={handleCommentChange}
                    maxLength={maxCharacters}
                />
            </div>
            <div className="ml-4 flex flex-row justify-between max-[481px]:ml-2">
                <p className="text-base max-[769px]:text-sm max-[481px]:text-xs">{getRemainingCharacters()} Karakter Tersisa</p>
                <button
                    className="w-28 h-9 rounded-lg bg-sheen text-xl text-white font-bold cursor-pointer
                    max-[1025px]:w-20 max-[1025px]:h-7 max-[1025px]:text-base
                    max-[481px]:w-16 max-[481px]:h-6 max-[481px]:text-xs"
                    onClick={() => handleCreateComment()}>
                    Kirim
                </button>
            </div>
        </div>
    )
}

export default CreateComment