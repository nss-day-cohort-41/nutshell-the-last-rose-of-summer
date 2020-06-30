//Author => Patrick Murphy
//This module handles the primary data flow for the friends section//

import API from "../data.js"
import friendsDOM from "./friendsDOM.js"
import messaging from "../messages/messages.js"
import shared from "../miscSharedFunctions.js"

let friendsArray = []
let userArray = []
let foundArray = []
let searchDisplayArray = []
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
        foundArray = []
        let querry = document.querySelector("#userSearch").value
        document.querySelector("#foundUser").innerHTML = ``
        if (querry.length > 0) {
        userArray.forEach(user => {
            if (user.userName.toLowerCase().includes(querry.toLowerCase())) {
                foundArray.push(user)
            } 
            
            
        })
       friends.filterArray(foundArray)
        }
    },
    //filters the search results to remove current friends and primary user//
    filterArray(rawSearchArray) {
        searchDisplayArray = []
        rawSearchArray.forEach(result => {
            //Check to make sure result is not user//
            if (result.id != sessionStorage.activeUser) {
                //Check current friends//
                let friendNow = false
                friendsArray.forEach(friend => {
                    if(result.id === friend.friendId) {
                        friendNow = true
                    }
            }
            )
                        if (friendNow === false) {
                        searchDisplayArray.push(result)
                        }
            }
            
    })
        friendsDOM.insertSearchResult(searchDisplayArray)
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
                messaging.getAllMessages();
                if (searchDisplayArray.length > 1) {
                  let newsearchDisplayArray = searchDisplayArray.filter(array =>{
                        if (array.id !== followNameArray.id) {
                            return array
                        }

                    })
                    searchDisplayArray = newsearchDisplayArray
                    // document.querySelector("#foundUser").innerHTML = ``
                    friendsDOM.insertSearchResult(searchDisplayArray)
                }
                else shared.clearDataField()
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