
const jsonUrl = `http://localhost:8088/`

const API = {
    getSingleUser (userId) {
        return fetch(`${jsonUrl}users/${userId}`)
        .then(response => response.json())
    },
    getAllUsers () {
        return fetch(`${jsonUrl}users/`)
        .then(response => response.json())
    },
    saveUser (newUserObj) {
        return(fetch(`${jsonUrl}users/`)), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserObj)
        }
    },
    // get messages for a single user //
    getUserMessages (userId) {
        return fetch(`${jsonUrl}users/${userId}?_embed=messages&_embed=friends`)
        .then(response => response.json())
    },

    getFriendMessages (friendId) {
        return fetch(`${jsonUrl}users/${friendId}?_embed=messages`)
        .then(response => response.json())


    }
 
}

export default API