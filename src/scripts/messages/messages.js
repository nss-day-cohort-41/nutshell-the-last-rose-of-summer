//Author => Patrick Murphy
//This module handles the primary data flow for the messages section//

import API from "../data.js"
import messageDOM from "./messageDOM.js"
import shared from "../miscSharedFunctions.js"
let messageArray = [];
let friendsArray = []
let primaryUser = []

const messaging = {
//Get all user data including messages and friends//
    getAllMessages () {
        API.getAllMessages()
        .then((response => {
            let messages = response
            //Gets user friend data and stores it for use//
            API.getFriendData(sessionStorage.activeUser)
            .then((friendResponse) => {
                messaging.buildMessageArray(messages, friendResponse)
            }) 
        }))
    },
    //Build the array of all messages//
    buildMessageArray(allUserMessages, friends) {
        messageArray = []

    //searches messages for all friends of Active User//
        allUserMessages.forEach(message => {
            let userFollowing = false           
            friends.forEach(friend => {
                if (friend.userId == message.user.id) {
                    userFollowing = true
                }
    //builds the message array, adding user name and friend status to the array//
            })
                message.friendOfUser = userFollowing
                messageArray.push(message)
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
        //POSTs a new message to JSON
        if (document.querySelector("#entryId").value === "") {
            API.PostNewMessage(messageObject)
            .then(() => {
                messaging.getAllMessages()
                shared.clearDataField()
                document.querySelector(".select__box").value = 0
            })
        }
        //PUT, updates an existing message in JSON
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

export default messaging