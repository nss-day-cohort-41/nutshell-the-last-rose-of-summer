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
    //Get friend information by expanding on the users friend json//
    getPrimaryUserAndFriends() {
        API.getFriendData(sessionStorage.activeUser)
        .then((response) => {
            friends.buildFriendsArray(response)

        })        
    },
    
    buildFriendsArray(friends) {
        friendsArray = []
    //build an array out of the friend data
        friends.forEach(friend => {
                let friendObj = {
                    "jsonReferenceId": friend.id,
                    "friendName": friend.user.userName,
                    "friendEmail": friend.user.email,
                    "friendId": friend.user.id,
                    "isFriend": true,
                    "friendsSince": friend.date
                }
                friendsArray.push(friendObj)
            }
        )
        friendsDOM.buildFriendList(friendsArray)
    },
    //Delete a friend//
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
                friends.getPrimaryUserAndFriends()
                messaging.getAllMessages()
            })
        }
    },
    //Search user array for a specific person to follow//
    search() {
        friendsDOM.buildSearchFields()

    },
    searchDatabase() {
        foundArray = []
        let querry = document.querySelector("#userSearch").value
        document.querySelector("#foundUser").innerHTML = ``
        console.log(querry)
        if (querry.length > 1) {
            API.searchForUser(querry)
            .then((result) => {
                console.log(result)
            // result.forEach(user => {
                friends.filterArray(result)
                // })        
            })     
        }
    },
    //filters the search results to remove current friends and primary user//
    filterArray(rawSearchArray) {
        searchDisplayArray = []
        rawSearchArray.forEach(result => {
            //Check to make sure result is not user//
            if (result.id != sessionStorage.activeUser) {
                //Check for current friends//
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
            "activeUserId": user,
            "userId": followingId,
            "date": new Date()
        }
        // let followNameArray = userArray.find(user => {
        //     if (followingId === user.id) {
        //         return user
        //     }
        // })
        let addFriend = confirm(`Are you sure you wish to follow ${event.target.value}`)
        if (addFriend === true) {
            
            API.follow(friendObj)
            .then(() => {
                document.querySelector(".container__main__middle--friends").innerHTML = ``
                
                friends.getPrimaryUserAndFriends()
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