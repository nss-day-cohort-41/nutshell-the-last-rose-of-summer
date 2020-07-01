// JSON Data Exchange
// John Hester, Patrick Murphy, David Bruce

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
    getAllMessages() {
        
        return fetch(`${jsonUrl}messages?_expand=user`)
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
//**All friend field related FETCH calls**// 
    
    //get user data for a single friend of Primary
    getFriendData(id) {
        return fetch(`${jsonUrl}friends?activeUserId=${id}&_expand=user`)
        .then(response => response.json())
    },
    unfollow(id) {
        return fetch(`${jsonUrl}friends/${id}`, {
            method: "DELETE"
        })
    },
    follow (followObj) {
        return fetch(`${jsonUrl}friends`, {
           method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followObj)
        }).then(response => response.json())
    },
    searchForUser(search){
        return fetch(`${jsonUrl}users?q=${search}`)
        .then(response => response.json())
    },

        //Article API Calls
        addArticleEntry (articleObject) {
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
            .then(response => {if (response.status === 500) {
                return response.json() // return the result of the inner promise, which is an error
                .then((json) => {
                  const { message, stackTrace } = json;
                  throw new ServerException(message, stackTrace);
                });
              } else {
                return response.json();
              }})
    },


    // all task related fetch calls 
    getAllUserTasks (userId) {
        return fetch(`${jsonUrl}users/${userId}?_embed=tasks`)
            .then(response => response.json())
    },

    saveNewTask (taskObj) {
        return fetch(`${jsonUrl}tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObj)
        }).then(response => response.json())
    },
    deleteTask (taskId) {
        return fetch(`${jsonUrl}tasks/${taskId}`, {
            method: "DELETE"
        }).then(response => response.json())

    },
    getSingleTask (taskId) {
        return fetch(`${jsonUrl}tasks/${taskId}`)
            .then(response => response.json())
    },
    completeUserTask (completedTaskObj) {
        return fetch(`${jsonUrl}tasks/${completedTaskObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completedTaskObj)
        }).then(response => response.json())
    },
    editUserTask (taskId, updatedTaskObj) {
        return fetch(`${jsonUrl}tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTaskObj)
        }).then(response => response.json())
    },


   //Event API Calls
   addEventEntry (eventObject) {
    return fetch(`${jsonUrl}events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObject)
    }).then(response =>{
        if (response.ok ) {
            return response.json();
        } else {
            return Promise.reject({ status: response.status, statusText: response.statusText})
        }
    })
 
    },
    deleteEvent(eventId) {
        return fetch(`${jsonUrl}events/${eventId}`, {
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
    getAllUsersAndEvents () {
        return fetch(`${jsonUrl}users?_embed=events&_embed=friends`)
            .then(response => {if (response.status === 500) {
                return response.json() // return the result of the inner promise, which is an error
                .then((json) => {
                const { message, stackTrace } = json;
                throw new ServerException(message, stackTrace);
                });
            } else {
                return response.json();
            }})
}


}

export default API