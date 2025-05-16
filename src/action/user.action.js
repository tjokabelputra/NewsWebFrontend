export const createAccount = (username, email, password) => {
    fetch('http://localhost:3000/user/signup', {
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
    fetch('http://localhost:3000/user/login', {
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

export const updateProfilePicture = (uid, profilePicture) => {
    const formData = new FormData()
    formData.append('profilePicture', profilePicture)

    fetch(`https://localhost:3000/user/changeProfilePicture/${uid}`, {
        method: 'PUT',
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