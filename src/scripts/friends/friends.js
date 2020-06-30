//Author => Patrick Murphy
//This module handles the primary data flow for the friends section//

import API from "../data.js"
import friendsDOM from "./friendsDOM.js"
import messaging from "../messages/messages.js"

let friendsArray = []
let userArray = []
const friends = {
    
    getAllFriends () {
        API.getAllUsersAndFriends()
        .then((response) => {
            userArray = response
            friends.buildFriendsArray()
        })
    },
    buildFriendsArray() {
        friendsArray = []
        //locate active user in data array
        let activeUser = userArray.find(array => {
            return (array.userName === sessionStorage.activeUserName)
        })
        //find all friends of active user and add them to the friends array
        activeUser.friends.forEach(friend => {
            friends.findFriend(friend)
        });
        friendsDOM.buildFriendList(friendsArray)
    },
    friendRemove(deleteId) {
        let friendToDelete = friendsArray.find(unFriend => {
            return (unFriend.friendId == deleteId)
        })
        let unfollow = confirm(`Are you sure you wish to unfollow ${friendToDelete.friendName}`)
        if (unfollow === true) {
            let id = friendToDelete.jsonReferenceId
            API.unfollow(id)
            .then(() => {
                document.querySelector(".container__main__middle--friends").innerHTML = ``
                friends.getAllFriends()
                messaging.getAllMessages()
            })
        }
    },
    findFriend(friend) {
        userArray.forEach(user => {
            if (user.id === friend.following) {
                let friendObj = {
                    "jsonReferenceId": friend.id,
                    "friendName": user.userName,
                    "friendEmail": user.email,
                    "friendId": user.id,
                    "isFriend": true,
                    "friendsSince": friend.date
                }
                friendsArray.push(friendObj)
            }
        })
    },
    //Search user array for a specific person to follow//
    search() {
        friendsDOM.buildSearchFields()

    },
    searchDatabase() {
        let foundArray = []
        let querry = document.querySelector("#userSearch").value
        document.querySelector("#foundUser").innerHTML = ``
        userArray.forEach(user => {
            if (user.userName.includes(querry)) {
                foundArray.push(user)
            }
            console.log(foundArray)
        })
    },
    buildFriendsObjectFromSearch() {
        let followingId = event.target.id.split("--")[1]
        followingId = parseInt(followingId)
        let user = sessionStorage.activeUser
        user = parseInt(user)
        let friendObj = {
            "userId": user,
            "following": followingId,
            "date": new Date()
        }
        let followNameArray = userArray.find(user => {
            if (followingId === user.id) {
                return user
            }
        })
        let addFriend = confirm(`Are you sure you wish to follow ${followNameArray.userName}`)
        if (addFriend === true) {
            
            API.follow(friendObj)
            .then(() => {
                document.querySelector(".container__main__middle--friends").innerHTML = ``
                friends.getAllFriends()
                messaging.getAllMessages()
            })
        }
    },
    buildFriendsObject() {
        let followingId = event.target.id.split("--")[1]
        followingId = parseInt(followingId)
        let user = sessionStorage.activeUser
        user = parseInt(user)
        let friendObj = {
            "userId": user,
            "following": followingId,
            "date": new Date()
        }
        let followNameArray = userArray.find(user => {
            if (followingId === user.id) {
                return user
            }
        })
        let addFriend = confirm(`Are you sure you wish to follow ${followNameArray.userName}`)
        if (addFriend === true) {
            
            API.follow(friendObj)
            .then(() => {
                document.querySelector(".container__main__middle--friends").innerHTML = ``
                friends.getAllFriends()
                messaging.getAllMessages()
            })
        }
    }


    //Future funtionality//

    // friendRequest() {
    //     let idSelected = event.target.id.split("--")[1]
    //     let requestTo = userArray.find(array => {
    //         if (array.id == idSelected) {
    //             return array
    //         }
    //     })
    //     console.log(requestTo)
    //     friendsDOM.buildRequestField(requestTo)
    // },


    
    // buildRequestObject() {
    //     let id = document.querySelector("#entryId").value
    //     let requestUserId = document.querySelector("#userMessageId").value
    //     requestUserId = parseInt(requestUserId)
    //     let requestObject = {
    //         "requestFromUserId": sessionStorage.activeUser,
    //         "requestFromUserName": sessionStorage.activeUserName,
    //         "requestToUserId": requestUserId,
    //         "message": document.querySelector("#message__Field").value,
    //         "date": new Date()
    //     }
    // }
    
}

export default friends