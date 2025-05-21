export const createAccount = (username, email, password) => {
    return fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(
            response => {
                if(!response.ok){
                    return response.json().then(error => {
                        throw new Error(error.message)
                    })
                }
                return response.json()
            }
        )
}

export const loginAccount = (email, password) => {
    return fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
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
}

export const updateProfilePicture = (token, uid, profilePicture) => {
    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    return fetch(`http://localhost:3000/user/changeprofpic/${uid}`, {
        method: 'POST',
        headers: {
            "Authorization" : `Bearer ${token}`
        },
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
}