import React from "react"
import { getRecentTime } from "../../Utils.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsDown as faThumbsDownSolid, faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons"
import { faThumbsDown as faThumbsDownRegular, faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons"

function Comment({ comment, uid, commentLikes, onToggleLike, deleteComment }){
    const likeStatus = commentLikes.find(item => item.commentid === comment.commentid)?.like_status || null

    const isCommentRated = (status) => {
        return status !== null;
    }

    return(
        <div className="p-4 flex flex-col gap-2 bg-white rounded-2xl border-1 border-solid border-black">
            <div className="flex flex-row gap-2 items-center">
                <img src={comment.commentator_pp} alt="profile picture" className="w-10 h-10 rounded-[50%] border-1 border-solid border-black" />
                <div className="flex flex-col justify-between">
                    <p className="text-base">{comment.username}</p>
                    <p className="text-base">{getRecentTime(comment.createdat)}</p>
                </div>
            </div>
            <p className="text-lg">{comment.comment}</p>
            <div className="flex flex-row justify-between items-center">
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
                {comment.uid === uid ? (
                    <button
                        className="w-28 h-9 rounded-lg bg-red text-xl text-white font-bold cursor-pointer"
                        onClick={() => deleteComment(comment.commentid)}>Hapus</button>
                ) : null}
            </div>
        </div>
    )
}

export default Comment