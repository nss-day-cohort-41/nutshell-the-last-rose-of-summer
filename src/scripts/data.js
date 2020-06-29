
const jsonUrl = 'http://localhost:8088/'

const API = {
    getSingleUser (userId) {
        return fetch(`${jsonUrl}users/${userId}`)
                .then(response => response.json())
    },
    getAllUsers () {
        return fetch(`${jsonUrl}users`)
                .then(response => response.json())
    },
    saveUser (newUserObj) {
        return fetch(`${jsonUrl}users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserObj)
        }).then(response => response.json())
    },
    getUserData (userId) {
        return fetch(`${jsonUrl}users/${userId}?_embed=friends&_embed=messages&_embed=articles&_embed=events&_embed=tasks`)
                .then(response => response.json())
    },




//**All message field related FETCH calls**//   
    // get all messages //
    getAllUsersAndMessages () {
        return fetch(`${jsonUrl}users?_embed=messages&_embed=friends`)
            .then(response => response.json())
    },
    // POST a new message//
    PostNewMessage (newMessageObj) {
        return fetch(`${jsonUrl}messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessageObj)
        }).then(response => response.json())
    },
    //Update an existing message//
    editExistingMessage (newMessageObj, id) {
        return fetch(`${jsonUrl}messages/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessageObj)
        });
    },


    //Article API Calls
    addArticleEntry(articleObject) {
        return fetch(`${jsonUrl}articles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(articleObject)
        }).then(response =>{
            if (response.ok ) {
                return response.json();
            } else {
                return Promise.reject({ status: response.status, statusText: response.statusText})
            }
        })
     
    },
    deleteArticle(articleId) {
        return fetch(`${jsonUrl}articles/${articleId}`, {
            method: "DELETE" })
                .then(response => {
                    if (response.status === 500) {
                        return response.json() // return the result of the inner promise, which is an error
                        .then((json) => {
                          const { message, stackTrace } = json;
                          throw new ServerException(message, stackTrace);
                        });
                      } else {
                        return response.json();
                      }
                })
    },
    getAllUsersAndArticles () {
        return fetch(`${jsonUrl}users?_embed=articles&_embed=friends`)
            .then(response => response.json())
    }
}

export default API