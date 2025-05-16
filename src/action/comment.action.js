export const postComment = async (token, uid, newsid, comment) => {
    return fetch('http://localhost:3000/comment/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
            uid: uid,
            newsid: newsid,
            comment: comment
        })
    })
        .then(response => {
            if(!response.ok){
                return response.json().then(error => {
                    throw new Error(error.message)
                })
            }
            return response.json()
        })
        .catch(error => {
            throw new Error(error.message)
        })
}

export const getNewsComment = (uid, newsid) => {
    return fetch(`http://localhost:3000/comment/newsComment?uid=${uid}&newsid=${newsid}`, {
        method: 'GET',
    })
        .then(response => {
            if(!response.ok){
                return response.json().then(error => {
                    throw new Error(error.message)
                })
            }
            return response.json()
        })
        .catch(error => {
            throw new Error(error.message)
        })
}

export const updateCommentLike = async (token, uid, commentid, pressed) => {
    return fetch('http://localhost:3000/comment/like', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
            uid: uid,
            commentid: commentid,
            pressed: pressed
        })
    })
        .then(response => {
            if(!response.ok){
                return response.json().then(error => {
                    throw new Error(error.message)
                })
            }
            return response.json()
        })
        .catch(error => {
            throw new Error(error.message)
        })
}

export const deleteComment = async (token, commentid) => {
    return fetch(`http://localhost:3000/comment/delete/${commentid}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`},
    })
        .then(response => {
            if(!response.ok){
                return response.json().then(error => {
                    throw new Error(error.message)
                })
            }
            return response.json()
        })
        .catch(error => {
            throw new Error(error.message)
        })
}