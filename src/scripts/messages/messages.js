//Author => Patrick Murphy
//This module handles the primary data flow for the messages section//

import API from "../data.js"
import messageDOM from "./messageDOM.js"
import shared from "../miscSharedFunctions.js"
import friends from "../friends/friends.js"
let messageArray = [];
let friendsArray = []
let primaryUser = []

const messaging = {
//Get all user data including messages and friends//
    getAllMessages () {
        // primaryUser = primary
        API.getAllMessages()
        .then((response => {
            let messages = response
            API.getFriendData(sessionStorage.activeUser)
            .then((friendResponse) => {
                messaging.buildMessageArray(messages, friendResponse)
            })
            // friendsArray = friends.handOffFriendsArray()
            // console.log(response)
            
        }))
    },
    // recieveFriends(friendsList) {
    //     friendsArray.push(friendsList)
    // },
//Build the array of all messages//
    buildMessageArray(allUserMessages, friends) {
        console.log(allUserMessages)
        messageArray = []
        // let activeUser = allUserMessages.find(array => {
        //     return (array.userName === sessionStorage.activeUserName)
        // })
        console.log(friends)
    //searches messages for all friends of Current User//
        allUserMessages.forEach(message => {
            let userFollowing = false
            
            friends.forEach(friend => {
                // console.log("This is a friend", friend)
                if (friend.userId == message.user.id) {
                    // console.log("This is a friend", friend)
                    userFollowing = true
                }
    //builds the message array, adding user name and friend status to the array//
            })
                // user.messages.forEach(message => {
                // message.userName = user.userName
                message.friendOfUser = userFollowing
                messageArray.push(message)
            // })
        });
    //Sort the array to show newest on the bottom of the list//
        messageArray.sort((a, b) => {return new Date(a.date) - new Date(b.date)})
    //off to HTML DOMland
        messageDOM.messageHTMLBuilder(messageArray)
    },
    //Builds message to send off to the API module for POST/PUT//
    buildMessageObject() {
        let id = document.querySelector("#entryId").value
        let userId = document.querySelector("#userMessageId").value
        userId = parseInt(userId)
        let messageObject = {
            "userId": userId,
            "message": document.querySelector("#message__Field").value,
            "date": new Date()
        }
        if (document.querySelector("#entryId").value === "") {
            API.PostNewMessage(messageObject)
            .then(() => {
                messaging.getAllMessages()
                shared.clearDataField()
                document.querySelector(".select__box").value = 0
            })
        }
        else if (document.querySelector("#entryId").value !== "") {
            API.editExistingMessage (messageObject, id)
            .then(() => {
                messaging.getAllMessages()
                shared.clearDataField()
                document.querySelector(".select__box").value = 0
            })
        }
    },
    createNewMessage () {
        messageDOM.createNewMessageFields ()

    }
}



    // userMessageAquire (userId) {
    //    API.getUserMessages(userId)
    //     .then((userData => {
    //         // console.log(`This is user #${userId} data`, userData)
    //     messaging.buildMessages(userData)  
    //     }))

    // },
    // buildMessages (userData) {
    //     userData.messages.userName = userData.userName
    //     userMessageArray.push(userData.messages)
    //     let friends = userData.friends
    //     // console.log(`These are the user messages`, userMessageArray)
    //     // console.log(`These are the user friends`, friends)
    //     friends.forEach(friend => {
    //         API.getFriendMessages (friend.following)
    //         .then((userObj => {   
    //             userObj.messages.userName = userObj.userName
    //             friendMessage = userObj.messages
    //             // console.log("These are a users messages", friendMessage)
    //             userMessageArray.push(friendMessage)
    //             console.log("These are all the messages", userMessageArray)
    //         }))
    //     });
    //     messageDOM.messageHTMLBuilder (userMessageArray)
    // },
 


export default messaging