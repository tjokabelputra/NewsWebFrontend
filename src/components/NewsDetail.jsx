import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleDetailNews, sampleComment } from "../newsData.js";
import { faThumbsUp as faThumbsUpRegular, faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid, faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ comment, commentLikes, onToggleLike }) => {

    const likeStatus = commentLikes.find(item => item.commentid === comment.commentid)?.like_status || null;

    const isCommentRated = (status) => {
        return status !== null;
    };

    return(
        <div className="p-4 flex flex-col gap-2 bg-white rounded-2xl border-1 border-solid border-black">
            <div className="flex flex-row gap-2">
                <img src={comment.commentator_pp} alt="profile picture" className="w-10 h-10 rounded-[50%] border-1 border-solid border-black" />
                <div className="flex flex-col justify-end">
                    <p className="text-base">{comment.commentator}</p>
                    <p className="text-base">{comment.createdat}</p>
                </div>
            </div>
            <p className="text-lg">{comment.comment}</p>
            <div className="flex flex-row justify-start gap-4 items-center">
                <FontAwesomeIcon
                    icon={isCommentRated(likeStatus) ? (likeStatus === "Like" ? faThumbsUpSolid : faThumbsUpRegular) : faThumbsUpRegular}
                    style={{
                        width: "24px",
                        height: "24px",
                        color: likeStatus === "Like" ? "#76ABAE" : "#000000",
                        cursor: "pointer"
                    }}
                    onClick={() => onToggleLike(comment.commentid, "Like")}
                />
                <p className="text-base">{comment.votes}</p>
                <FontAwesomeIcon
                    icon={isCommentRated(likeStatus) ? (likeStatus === "Dislike" ? faThumbsDownSolid : faThumbsDownRegular) : faThumbsDownRegular}
                    style={{
                        width: "24px",
                        height: "24px",
                        color: likeStatus === "Dislike" ? "#E53935" : "#000000",
                        cursor: "pointer"
                    }}
                    onClick={() => onToggleLike(comment.commentid, "Dislike")}
                />
            </div>
        </div>
    )
}

const CommentsSection = ({ comments, commentLikes, onToggleLike }) => {
    return(
        <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment}
                    commentLikes={commentLikes}
                    onToggleLike={onToggleLike}/>
            ))}
        </div>
    )
}

function NewsDetail(){
    const navigate = useNavigate()
    const shareUrl = window.location.href;
    const [likeStatus, setLikeStatus] = useState(sampleDetailNews.like_status)
    const [tempLike, setTempLike] = useState(sampleDetailNews.likes)
    const [commentLikes, setCommentLikes] = useState(sampleComment.like_status || [])
    const [commentText, setCommentText] = useState("")
    const [comments, setComments] = useState(sampleComment.comment || [])
    const [commentSort, setCommentSort] = useState("Newest")
    const maxCharacters = 1000

    const isNewsRate = (like_status) => {
        return like_status != null;
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
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
                break;
            case "X":
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, "_blank");
                break;
            case "WhatsApp":
                window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank");
                break;
            case "Link":
                navigator.clipboard.writeText(shareUrl);
                alert("Link berhasil disalin ke clipboard");
                break;
            default:
                break;
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

    const toggleCommentLike = (commentId, pressed) => {
        const existingLikeIndex = commentLikes.findIndex(item => item.commentid === commentId);
        const existingLike = existingLikeIndex !== -1 ? commentLikes[existingLikeIndex] : null;

        const commentIndex = comments.findIndex(comment => comment.commentid === commentId);
        if (commentIndex === -1) return;

        const updatedComments = [...comments];
        const currentVotes = updatedComments[commentIndex].votes;

        const newCommentLikes = [...commentLikes];

        if (existingLike) {
            if (existingLike.like_status === pressed) {
                newCommentLikes.splice(existingLikeIndex, 1);

                if (pressed === "Like") {
                    updatedComments[commentIndex].votes = currentVotes - 1;
                } else if (pressed === "Dislike") {
                    updatedComments[commentIndex].votes = currentVotes + 1;
                }
            } else {
                newCommentLikes[existingLikeIndex] = {
                    ...existingLike,
                    like_status: pressed
                };

                if (pressed === "Like") {
                    updatedComments[commentIndex].votes = currentVotes + 2;
                } else if (pressed === "Dislike") {
                    updatedComments[commentIndex].votes = currentVotes - 2;
                }
            }
        } else {
            newCommentLikes.push({
                commentid: commentId,
                like_status: pressed
            });

            if (pressed === "Like") {
                updatedComments[commentIndex].votes = currentVotes + 1;
            } else if (pressed === "Dislike") {
                updatedComments[commentIndex].votes = currentVotes - 1;
            }
        }

        setCommentLikes(newCommentLikes);
        setComments(updatedComments);
    };

    const sortComments = (commentsToSort, sortMethod) => {
        const sortedComments = [...commentsToSort];

        if (sortMethod === "Newest") {
            return sortedComments.sort((a, b) => {
                const dateA = new Date(a.createdat.split(" ")[0].split(" ").reverse().join("-")
                    + " " + a.createdat.split(" ")[1]);
                const dateB = new Date(b.createdat.split(" ")[0].split(" ").reverse().join("-")
                    + " " + b.createdat.split(" ")[1]);
                return dateB - dateA;
            });
        } else if (sortMethod === "MostLiked") {
            return sortedComments.sort((a, b) => b.votes - a.votes);
        }

        return sortedComments;
    };


    const handleHome = () => {
        navigate("/home")
    }

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`)
    }

    const handleLogin = () => {
        navigate("/login")
    }

    return(
        <div className="font-inter">
            <nav className="h-18 px-10 bg-darkgray flex flex-row justify-between items-center">
                <p
                    className="text-4xl text-white font-bold cursor-pointer"
                    onClick={() => handleHome()}>NewsWeb</p>
                <div className="flex flex-row justify-center p-2 text-2xl gap-4 text-white font-bold cursor-pointer">
                    <p onClick={() => handleCategoryClick("Politik")}>Politik</p>
                    <p onClick={() => handleCategoryClick("Olahraga")}>Olahraga</p>
                    <p onClick={() => handleCategoryClick("Teknologi")}>Teknologi</p>
                    <p onClick={() => handleCategoryClick("Ekonomi")}>Ekonomi</p>
                    <p onClick={() => handleCategoryClick("Sains")}>Sains</p>
                    <p onClick={() => handleCategoryClick("All")}>Semua Berita</p>
                </div>
                <button
                    className="w-33 h-11 rounded-lg bg-sheen text-2xl text-white font-bold cursor-pointer"
                    onClick={() => handleLogin()}>Log in</button>
            </nav>
            <main className="flex-grow bg-darkgray flex justify-center">
                <div className="w-320 px-10 pt-10 min-h-screen bg-white">
                    <div className=" gap-4 flex flex-col">
                        <h3 className="text-2xl font-bold text-sheen">{sampleDetailNews.category}</h3>
                        <h1 className="text-5xl font-bold">{sampleDetailNews.title}</h1>
                        <div className="flex flex-row items-center gap-2">
                            <img src={sampleDetailNews.auth_pp} alt="profile picture" className="w-10 h-10 rounded-[50%] border-1 border-solid border-black" />
                            <div className="flex flex-col justify-end">
                                <p className="text-{18px}">{sampleDetailNews.author}</p>
                                <p className="text-{18px}">{sampleDetailNews.created_date}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FontAwesomeIcon
                                icon={isNewsRate(likeStatus) ? (likeStatus === "Like" ? faThumbsUpSolid : faThumbsUpRegular) : (faThumbsUpRegular)}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    color: likeStatus === "Like" ? "#76ABAE" : "#000000",
                                    cursor: "pointer"}}
                                onClick={() => toggleLike("Like")}/>
                            <p className="text-base">{tempLike}</p>
                            <FontAwesomeIcon
                                icon={isNewsRate(likeStatus) ? (likeStatus === "Dislike") ? faThumbsDownSolid : faThumbsDownRegular : (faThumbsDownRegular)}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    color: likeStatus === "Dislike" ? "#E53935" : "#000000",
                                    cursor: "pointer"}}
                                onClick={() => toggleLike("Dislike")}/>
                        </div>
                    </div>
                    <div className="flex justify-center my-6">
                        <img
                            src={sampleDetailNews.image_url}
                            alt="image"
                            className="w-240 h-135"
                        />
                    </div>
                    <div className="flex flex-row gap-4">
                        <p className="text-2xl font-bold">Bagikan:</p>
                        <img src="/img/fb.webp" alt="facebook" className="w-9 h-9 rounded-[50%] cursor-pointer" onClick={() => share("Facebook")} />
                        <img src="/img/x.png" alt="x" className="w-9 h-9 rounded-[50%] cursor-pointer" onClick={() => share("X")} />
                        <img src="/img/wa.png" alt="whatsapp" className="w-9 h-9 rounded-[50%] cursor-pointer" onClick={() => share("WhatsApp")}/>
                        <img src="/img/link.png" alt="link" className="w-9 h-9 rounded-[50%] cursor-pointer" onClick={() => share("Link")}/>
                    </div>
                    <div className="mb-6 text-xl flex flex-col gap-4 mt-6">
                        {sampleDetailNews.content.split("\\n\\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
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
                            <button className="w-28 h-9 rounded-lg bg-sheen text-xl text-white font-bold cursor-pointer">Kirim</button>
                        </div>
                    </div>
                    <div className="h-250 mb-10 px-4 py-6 gap-4 flex flex-col rounded-2xl border-black border-1 bg-gray">
                        <div className="flex flex-row gap-4">
                            <button
                                className={`w-26 h-10 rounded-lg ${commentSort === "Newest" ? 'bg-sheen text-white' : 'bg-white text-sheen'} border-1 border-sheen font-bold cursor-pointer`}
                                onClick={() => setCommentSort("Newest")}
                            >
                                Terbaru
                            </button>
                            <button
                                className={`w-46 h-10 rounded-lg ${commentSort === "MostLiked" ? 'bg-sheen text-white' : 'bg-white text-sheen'} border-1 border-sheen font-bold cursor-pointer`}
                                onClick={() => setCommentSort("MostLiked")}
                            >
                                Paling Banyak Disukai
                            </button>
                        </div>
                        <CommentsSection
                            comments={sortComments(comments, commentSort)}
                            commentLikes={commentLikes}
                            onToggleLike={toggleCommentLike}
                        />
                    </div>
                </div>
            </main>
            <footer className="p-12 gap-4 bg-darkgray text-white flex flex-col">
                <p className="text-5xl font-bold">News Web</p>
                <p className="text-2xl">Cepat, Akurat, dan Terpercaya</p>
                <p className="text-xs">©2025 News Web</p>
            </footer>
        </div>
    )
}

export default NewsDetail