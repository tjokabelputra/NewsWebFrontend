import React, {useState} from "react"
import { getRecentTime } from "../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsDown as faThumbsDownSolid, faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons"
import { faThumbsDown as faThumbsDownRegular, faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons"

function Comment({ comment, uid, commentLikes, onToggleLike, deleteComment }){
    const likeStatus = commentLikes.find(item => item.commentid === comment.commentid)?.like_status || null
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const isCommentRated = (status) => {
        return status !== null;
    }

    const likeIconStyle = {
        width: windowWidth < 481 ? "16px" : windowWidth < 769 ? "20px" : "24px",
        height: windowWidth < 481 ? "16px" : windowWidth < 769 ? "20px" : "24px",
        color: likeStatus === "Like" ? "#76ABAE" : "#000000",
        cursor: "pointer"
    }

    const dislikeIconStyle = {
        width: windowWidth < 481 ? "16px" : windowWidth < 769 ? "20px" : "24px",
        height: windowWidth < 481 ? "16px" : windowWidth < 769 ? "20px" : "24px",
        color: likeStatus === "Dislike" ? "#E53935" : "#000000",
        cursor: "pointer"
    }

    return(
        <div className="p-4 flex flex-col gap-2 bg-white rounded-2xl border-1 border-solid border-black max-[481px]:gap-1 max-[481px]:p-2 max-[481px]:rounded-lg">
            <div className="flex flex-row gap-2 items-center">
                <img src={comment.commentator_pp} alt="profile picture" className="w-12 h-12 rounded-[50%] border-1 border-solid border-black
                max-[1025px]:w-9 max-[1025px]:h-9 max-[481px]:w-8 max-[481px]:h-8" />
                <div className="flex flex-col justify-between">
                    <p className="text-base max-[1025px]:text-sm max-[481px]:text-xs">{comment.username}</p>
                    <p className="text-base max-[1025px]:text-sm max-[481px]:text-xs">{getRecentTime(comment.createdat)}</p>
                </div>
            </div>
            <p className="text-lg max-[1281px]:text-base max-[1025px]:text-sm max-[481px]:text-xs">{comment.comment}</p>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-start gap-4 items-center max-[481px]:gap-2">
                    <FontAwesomeIcon
                        icon={isCommentRated(likeStatus) ? (likeStatus === "Like" ? faThumbsUpSolid : faThumbsUpRegular) : faThumbsUpRegular}
                        style={likeIconStyle}
                        onClick={() => onToggleLike(comment.commentid, "Like")}
                    />
                    <p className="text-lg max-[481px]:text-sm">{comment.votes}</p>
                    <FontAwesomeIcon
                        icon={isCommentRated(likeStatus) ? (likeStatus === "Dislike" ? faThumbsDownSolid : faThumbsDownRegular) : faThumbsDownRegular}
                        style={dislikeIconStyle}
                        onClick={() => onToggleLike(comment.commentid, "Dislike")}
                    />
                </div>
                {comment.uid === uid ? (
                    <button
                        className="w-28 h-9 rounded-lg bg-red text-xl text-white font-bold cursor-pointer
                        max-[769px]:w-24 max-[769px]:h-8
                        max-[481px]:w-20 max-[481px]:h-7 max-[481px]:text-sm"
                        onClick={() => deleteComment(comment.commentid)}>Hapus</button>
                ) : null}
            </div>
        </div>
    )
}

export default Comment