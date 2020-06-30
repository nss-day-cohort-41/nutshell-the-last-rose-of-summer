// Authors => John Hester, David Bruce, Patrick Murphy//
//  This module defines all the event listeners and their actions relating to Nutshell//

import login from "./login.js"
import shared from "./miscSharedFunctions.js"
import messageDOM from "./messages/messageDOM.js"
import messaging from "./messages/messages.js"
import friends from "./friends/friends.js"

const listeners = {

    // event listener object

    login () {
        document.querySelector("#logInButton").addEventListener("click", event => {

            const userName = document.querySelector("#userName").value 
            const password = document.querySelector("#password").value
            login.login(userName, password)
            


        })
    },

    register () {
        document.querySelector("#registerButton").addEventListener("click", event => {

            const newUserObj = {}

            newUserObj.email = document.querySelector("#email").value
            newUserObj.userName = document.querySelector("#userName").value
            newUserObj.password = document.querySelector("#password").value
            const password2 = document.querySelector("#password2").value

            if(newUserObj.password !== password2) {
                alert("Your password fields do not match.")
            } else {
                login.signUp(newUserObj)
                
            }
        })
    },


    //event listener for the 'Add an Item' dropdown selector//

    enableAddItemListener () {
    // Get the value of the option chosen by the user
        document.querySelector(".select__box").addEventListener("change", clickEvent => {
           let userSelect = clickEvent.target.value

            if (userSelect === "event") {
                //Invoke Add event functionality here
            }
            else if (userSelect === "friend") {
                //Invoke Add friend functionality here
                friends.search()
            }
            else if (userSelect === "message") {
                messaging.createNewMessage()
            }
            else if (userSelect === "news") {
                //Invoke Add news article functionality here
            }
            else if (userSelect === "task") {
                //Invoke Add task functionality here
            }
        } )

    },



    //messages section event listeners
    enableDiscardButton() {
        document.querySelector("#discardButton").addEventListener("click", event => {
            shared.clearDataField()

           }
        )
    },
    enableEditButton() {
        document.querySelector(".container__messages--saved").addEventListener("click", event => {
            if (event.target.id.split("--")[0] === "buttonMsg") {
                messageDOM.messageEdit()
            }
            else if (event.target.id.split("--")[0] === "buttonAddMsg") {
                //Place 'Add a friend' funtionality from message click here//
                console.log(event)
                friends.buildFriendsObject()
            }
            
            }
        )
    },
    enableMessageSave() {
        document.querySelector("#saveButton").addEventListener("click", event => {
            messageDOM.buildMessageObject()
        })
    },
    enableMessageUpdate() {
        document.querySelector("#updateButton").addEventListener("click", event => {
            messageDOM.buildMessageObject()
        })
    },
    //Friends section event listeners
    enableFriendDelete() {
        document.querySelector(".container__main__middle--friends").addEventListener("click", event => {
            if (event.target.id.split("--")[0] === "friendDelete") {
                let friendToRemove = event.target.id.split("--")[1]
                console.log(friendToRemove)
            friends.friendRemove(friendToRemove)
            }
        })
    },
    enableFollowUser() {
        document.querySelector("#followButton").addEventListener("click", event => {
                friends.buildFriendsObjectFromSearch()
        })
    },
    enableFriendSearch() {
        document.querySelector("#userSearch").addEventListener("keypress", event => {
            friends.searchDatabase()
        })
    }
    // enableSendFriendRequest() {
    //     document.querySelector("#requestButton").addEventListener("click", event => {
    //         friends.buildRequestObject()
    //     })
    // }
    // enableAddFriend() {
    //     document.querySelector("#requestButton").addEventListener("click", event => {
    //                 friends.buildFriendsObject()
    //     })
    // }
}

export default listeners