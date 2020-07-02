//Author => Patrick Murphy
//This module handles the primary data flow for the friends section//

import API from "../data.js"
import friendsDOM from "./friendsDOM.js"
import messaging from "../messages/messages.js"
import shared from "../miscSharedFunctions.js"
import { populateComponents } from "../main.js"

let friendsArray = []
let userArray = []
let foundArray = []
let searchDisplayArray = []
const friends = {
    //Get friend information by expanding on the users friend.json//
    getPrimaryUserAndFriends() {
        API.getFriendData(sessionStorage.activeUser)
        .then((response) => {
            friends.buildFriendsArray(response)
        })        
    },
    buildFriendsArray(friends) {
        friendsArray = []
    //build an easily handled array out of the friend data
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
            //JSON DELETE//
            let id = friendToDelete.jsonReferenceId
            API.unfollow(id)
            .then(() => {
                document.querySelector(".container__main__middle--friends").innerHTML = ``
                // friends.getPrimaryUserAndFriends()
                // messaging.getAllMessages()
                populateComponents();

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
        //waits for 3 letters to be entered before starting querry process//
        if (querry.length > 1) {
            API.searchForUser(querry)
            .then((result) => {
                friends.filterArray(result)
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
    //build the friend object to send to JSON
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

        let addFriend = confirm(`Are you sure you wish to follow ${event.target.value}`)
        if (addFriend === true) {
            //JSON POST FRIEND//
            API.follow(friendObj)
            .then(() => {
                document.querySelector(".container__main__middle--friends").innerHTML = ``
                
                // friends.getPrimaryUserAndFriends()
                // messaging.getAllMessages();
                populateComponents();

                //Check to see if there are addional search results before clearing the fields//
                if (searchDisplayArray.length > 1) {
                  let newsearchDisplayArray = searchDisplayArray.filter(array =>{
                        if (array.id !== friendObj.userId) {
                            return array
                        }

                    })
                    searchDisplayArray = newsearchDisplayArray
                    document.querySelector("#foundUser").innerHTML = ``
                    friendsDOM.insertSearchResult(searchDisplayArray)
                }
                else shared.clearDataField()
            })
        }
    },
}

export default friends