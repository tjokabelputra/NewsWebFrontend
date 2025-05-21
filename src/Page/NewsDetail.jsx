import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDetailNews, updateNewsLike, updateNewsViews } from "../action/news.action.js"
import { postComment, getNewsComment, updateCommentLike, deleteComment } from "../action/comment.action.js"
import { formatDate } from "../Utils.js"
import { faThumbsUp as faThumbsUpRegular, faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons"
import { faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ToastContainer, toast, Bounce} from "react-toastify"
import { jwtDecode } from "jwt-decode"
import LoadingSpinner from "../Component/LoadingSpinner.jsx"
import CommentsSection from "../Component/News Detail/CommentsSection.jsx"
import Navbar from "../Component/Navbar.jsx"
import Footer from "../Component/Footer.jsx"

function NewsDetail(){
    const navigate = useNavigate()
    const shareUrl = window.location.href
    const [accountDetail, setAccountDetail] = useState({uid: "", token: "", profile_pic: ""})
    const [newsDetail, setNewsDetail] = useState({})
    const [likeStatus, setLikeStatus] = useState(null)
    const [tempLike, setTempLike] = useState(0)
    const [commentText, setCommentText] = useState("")
    const [comments, setComments] = useState([])
    const [commentLikes, setCommentLikes] = useState([])
    const [commentSort, setCommentSort] = useState("Newest")
    const [isLoading, setIsLoading] = useState(false)
    const [viewTimerComplete, setViewTimerComplete] = useState(true)
    const maxCharacters = 1000
    const { newsid: newsid } = useParams()

    const handleNewsViews = () => {
        updateNewsViews(newsid)
            .then(() => {
                console.log("News views updated")
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const isNewsRate = (like_status) => {
        return like_status != null
    }

    const handleNewsLike = (pressed) => {
        if(accountDetail.uid === ""){
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
            return false
        }

        updateNewsLike(accountDetail.token, accountDetail.uid, newsid, pressed)
        .then(() => {
            toggleLike(pressed)
        })
        .catch(error => {
            alert(error.message)
        })
    }

    const toggleLike = (pressed) => {
        if (likeStatus === pressed) {
            setLikeStatus(null)
            if (pressed === "Like") {
                setTempLike(tempLike - 1)
            }
            else if (pressed === "Dislike") {
                setTempLike(tempLike + 1)
            }
        } else {
            if (likeStatus === "Like" && pressed === "Dislike") {
                setTempLike(tempLike - 2)
            }
            else if (likeStatus === "Dislike" && pressed === "Like") {
                setTempLike(tempLike + 2)
            }
            else if (pressed === "Like") {
                setTempLike(tempLike + 1)
            }
            else if (pressed === "Dislike") {
                setTempLike(tempLike - 1)
            }
            setLikeStatus(pressed)
        }
    }

    const share = (platform) => {
        switch (platform) {
            case "Facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
                break
            case "X":
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, "_blank")
                break
            case "WhatsApp":
                window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank")
                break
            case "Link":
                navigator.clipboard.writeText(shareUrl)
                alert("Link berhasil disalin ke clipboard")
                break
            default:
                break
        }
    }

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
        if(accountDetail.uid === ""){
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

        postComment(accountDetail.token, accountDetail.uid, newsid, commentText)
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
                setComments([data.comment, ...comments])
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

    const commentLikeUpdate = (commentId, pressed) => {
        if(accountDetail.uid === ""){
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
            return false
        }

        updateCommentLike(accountDetail.token, accountDetail.uid, commentId, pressed)
            .then(() => {
                toggleCommentLike(commentId, pressed)
            })
            .catch(error => {
                alert(error.message)
            })
    }

    const toggleCommentLike = (commentId, pressed) => {
        const existingLikeIndex = commentLikes.findIndex(item => item.commentid === commentId)
        const existingLike = existingLikeIndex !== -1 ? commentLikes[existingLikeIndex] : null

        const commentIndex = comments.findIndex(comment => comment.commentid === commentId)
        if (commentIndex === -1) return

        const updatedComments = [...comments]
        const currentVotes = updatedComments[commentIndex].votes

        const newCommentLikes = [...commentLikes]

        if (existingLike) {
            if (existingLike.like_status === pressed) {
                newCommentLikes.splice(existingLikeIndex, 1)

                if (pressed === "Like") {
                    updatedComments[commentIndex].votes = currentVotes - 1
                } else if (pressed === "Dislike") {
                    updatedComments[commentIndex].votes = currentVotes + 1
                }
            } else {
                newCommentLikes[existingLikeIndex] = {
                    ...existingLike,
                    like_status: pressed
                }

                if (pressed === "Like") {
                    updatedComments[commentIndex].votes = currentVotes + 2
                } else if (pressed === "Dislike") {
                    updatedComments[commentIndex].votes = currentVotes - 2
                }
            }
        } else {
            newCommentLikes.push({
                commentid: commentId,
                like_status: pressed
            })

            if (pressed === "Like") {
                updatedComments[commentIndex].votes = currentVotes + 1
            } else if (pressed === "Dislike") {
                updatedComments[commentIndex].votes = currentVotes - 1
            }
        }

        setCommentLikes(newCommentLikes)
        setComments(updatedComments)
    }

    const sortComments = (commentsToSort, sortMethod) => {
        const sortedComments = [...commentsToSort]

        if (sortMethod === "Newest") {
            return sortedComments.sort((a, b) => {
                const dateA = new Date(a.createdat.split(" ")[0].split(" ").reverse().join("-")
                    + " " + a.createdat.split(" ")[1])
                const dateB = new Date(b.createdat.split(" ")[0].split(" ").reverse().join("-")
                    + " " + b.createdat.split(" ")[1])
                return dateB - dateA
            })
        } else if (sortMethod === "MostLiked") {
            return sortedComments.sort((a, b) => b.votes - a.votes)
        }

        return sortedComments
    }

    const handleDeleteComment = (commentId) => {
        deleteComment(accountDetail.token, commentId)
            .then(() => {
                toast.success('Komentar berhasil dihapus!', {
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
                const filteredComments = comments.filter(comment => comment.commentid !== commentId)
                setComments(filteredComments)
            })
            .catch(error => {
                toast(error.message, {
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

    useEffect(() => {
        if(!isLoading && !viewTimerComplete){
            setTimeout(() => {
                handleNewsViews()
                setViewTimerComplete(true)
            }, 30000)
        }
    }, [isLoading, viewTimerComplete])

    useEffect(() => {
        validateToken()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const validateToken = () => {
        setIsLoading(true)
        const token = localStorage.getItem("jwt")
        if(!token){
            setAccountDetail({uid: "", token: "", profile_pic: ""})
            fetchNewsDetail("")
            return false
        }

        try {
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
                    theme: "dark",
                    transition: Bounce,
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
                token: token
            })
            fetchNewsDetail(decode.uid)
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
            return false
        }
    }

    const fetchNewsDetail = (uid) => {
        getDetailNews(uid, newsid)
            .then(data => {
                setNewsDetail(data.detail)
                setLikeStatus(data.like_status)
                setTempLike(data.detail.likes)
                fetchNewsComment(uid)
            })
            .catch(error => {
                alert(error.message)
                setIsLoading(false)
            })
    }

    const fetchNewsComment = (uid) => {
        getNewsComment(uid, newsid)
            .then(data => {
                setComments(data.comments)
                setCommentLikes(data.likeStatus)
                setIsLoading(false)
            })
            .catch(error => {
                alert(error.message)
                setIsLoading(false)
            })
    }

    return (
        <div className="font-inter">
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
            />
            {isLoading && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    <div className="fixed inset-0 flex opacity-80 items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg">
                            <LoadingSpinner
                                message={"Loading News..."}/>
                        </div>
                    </div>
                </>
            )}
            <Navbar
                uid={accountDetail.uid}
                profile_pic={accountDetail.profile_pic}
                useCategory={true}/>
            <main className="flex-grow bg-darkgray flex justify-center">
                <div className="w-320 px-10 pt-10 min-h-screen bg-white">
                    <div className="gap-4 flex flex-col">
                        <h3 className="text-2xl font-bold text-sheen">
                            {newsDetail.category}
                        </h3>
                        <h1 className="text-5xl font-bold">{newsDetail.title}</h1>
                        <div className="flex flex-row items-center gap-2">
                            <img
                                src={newsDetail.auth_pp}
                                alt="profile picture"
                                className="w-10 h-10 rounded-[50%] border-1 border-solid border-black"
                            />
                            <div className="flex flex-col justify-end">
                                <p className="text-[18px]">{newsDetail.author}</p>
                                <p className="text-[18px]">{formatDate(newsDetail.created_date)}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FontAwesomeIcon
                                icon={
                                isNewsRate(likeStatus)
                                    ? likeStatus === "Like"
                                        ? faThumbsUpSolid
                                        : faThumbsUpRegular
                                    : faThumbsUpRegular
                            }
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    color: likeStatus === "Like" ? "#76ABAE" : "#000000",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleNewsLike("Like")}
                            />
                            <p className="text-base">{tempLike}</p>
                            <FontAwesomeIcon
                                icon={
                                isNewsRate(likeStatus)
                                    ? likeStatus === "Dislike"
                                        ? faThumbsDownSolid
                                        : faThumbsDownRegular
                                    : faThumbsDownRegular
                            }
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    color: likeStatus === "Dislike" ? "#E53935" : "#000000",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleNewsLike("Dislike")}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center my-6">
                        <img
                            src={newsDetail.image_url}
                            alt="image"
                            className="w-240 h-135"
                        />
                    </div>
                    <div className="flex flex-row gap-4">
                        <p className="text-2xl font-bold">Bagikan:</p>
                        <img
                            src="/img/fb.webp"
                            alt="facebook"
                            className="w-9 h-9 rounded-[50%] cursor-pointer"
                            onClick={() => share("Facebook")}
                        />
                        <img
                            src="/img/x.png"
                            alt="x"
                            className="w-9 h-9 rounded-[50%] cursor-pointer"
                            onClick={() => share("X")}
                        />
                        <img
                            src="/img/wa.png"
                            alt="whatsapp"
                            className="w-9 h-9 rounded-[50%] cursor-pointer"
                            onClick={() => share("WhatsApp")}
                        />
                        <img
                            src="/img/link.png"
                            alt="link"
                            className="w-9 h-9 rounded-[50%] cursor-pointer"
                            onClick={() => share("Link")}
                        />
                    </div>

                    <div className="my-6 text-xl flex flex-col gap-4">
                        {newsDetail.content
                            ? newsDetail.content
                                .split("\n\n")
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            : <p>Loading content...</p>
                        }
                    </div>
                    <div className="mb-6 px-6 py-4 gap-2 flex flex-col rounded-2xl border-black border-1 bg-gray">
                        <h2 className="text-3xl font-bold">Komentar</h2>
                        <div className="h-24 bg-white rounded-lg border-black border-1">
                            <textarea
                                className="w-full h-full p-2 resize-none outline-none"
                                placeholder="Tulis komentar disini..."
                                value={commentText}
                                onChange={handleCommentChange}
                                maxLength={maxCharacters}
                            />
                        </div>
                        <div className="flex flex-row justify-between">
                            <p>{getRemainingCharacters()} Karakter Tersisa</p>
                            <button
                                className="w-28 h-9 rounded-lg bg-sheen text-xl text-white font-bold cursor-pointer"
                                onClick={() => handleCreateComment()}>
                                Kirim
                            </button>
                        </div>
                    </div>

                    <div className="h-250 mb-10 px-4 py-6 gap-4 flex flex-col rounded-2xl border-black border-1 bg-gray">
                        <div className="flex flex-row gap-4">
                            <button
                                className={`w-26 h-10 rounded-lg ${
                                    commentSort === "Newest"
                                        ? "bg-sheen text-white"
                                        : "bg-white text-sheen"
                                } border-1 border-sheen font-bold cursor-pointer`}
                                onClick={() => setCommentSort("Newest")}
                            >
                                Terbaru
                            </button>
                            <button
                                className={`w-46 h-10 rounded-lg ${
                                    commentSort === "MostLiked"
                                        ? "bg-sheen text-white"
                                        : "bg-white text-sheen"
                                } border-1 border-sheen font-bold cursor-pointer`}
                                onClick={() => setCommentSort("MostLiked")}
                            >
                                Paling Banyak Disukai
                            </button>
                        </div>
                        <CommentsSection
                            comments={sortComments(comments, commentSort)}
                            commentLikes={commentLikes}
                            onToggleLike={commentLikeUpdate}
                            deleteComment={handleDeleteComment}
                            uid={accountDetail.uid}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default NewsDetail