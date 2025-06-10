import React from "react"
import Comment from "./Comment.jsx"

function CommentsSection({ comments, uid, commentLikes, onToggleLike, deleteComment }){
    return(
        <div className="flex flex-col gap-4 overflow-auto no-scrollbar max-[481px]:gap-2">
            {comments.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment}
                    commentLikes={commentLikes}
                    onToggleLike={onToggleLike}
                    deleteComment={deleteComment}
                    uid={uid}/>
            ))}
        </div>
    )
}

export default CommentsSection