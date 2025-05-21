export const createNews = async (token, uid, title, content, category, summary, banner, image) => {
    const formData = new FormData()
    formData.append('banner', banner)
    formData.append('image', image)
    formData.append('createdby', uid)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('content', content)
    formData.append('summary', summary)

    return fetch('http://localhost:3000/news/create', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`},
        body: formData
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

export const saveNews = async (token, uid, newsid) => {
    return fetch('http://localhost:3000/news/save', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
            uid: uid,
            newsid: newsid
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

export const getHomeNews = async (uid) => {
    return fetch(`http://localhost:3000/news/home?uid=${uid}`, {
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

export const getDetailNews = async (uid, newsid) => {
    return fetch(`http://localhost:3000/news/detail/${newsid}?uid=${uid}`, {
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

export const getAllNews = async (category, uid, search) => {
    return fetch(`http://localhost:3000/news/all/${category}?uid=${uid}&search=${search}`, {
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

export const getSavedNews = async (token, uid) => {
    return fetch(`http://localhost:3000/news/saved/${uid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
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

export const getCreatedNews = async (token, uid) => {
    return fetch(`http://localhost:3000/news/created/${uid}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error(error.message)
        }
        return response.json()
    })
        .catch(error => {
            throw new Error(error.message)
        })
}

export const updateNewsLike = async (token, uid, newsid, pressed) => {
    return fetch('http://localhost:3000/news/like', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
            uid: uid,
            newsid: newsid,
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

export const updateNewsViews = async (newsid) => {
    return fetch(`http://localhost:3000/news/views/${newsid}`, {
        method: 'PUT',
    })
        .then(response => {
            if(!response.ok){
                return response.json().then(error => {
                    throw new Error(error.message)
                })
            }
        })
    .catch(error => {
        throw new Error(error.message)
    })
}

export const deleteNews = async (token, newsid) => {
    return fetch(`http://localhost:3000/news/delete/${newsid}`, {
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

export const unsaveNews = async (token, uid, newsid) => {
    return fetch('http://localhost:3000/news/unsave', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`},
        body: JSON.stringify({
            uid: uid,
            newsid: newsid
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