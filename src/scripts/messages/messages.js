import API from "../data.js"
import messageDOM from "../messages/messageDOM.js"

let friendMessage;
let messageArray = [];


const messaging = {
//Get all user data including messages and friends//
    getAllMessages () {
        API.getAllUsersAndMessages()
        .then((response => {
            messaging.buildMessageArray(response)
        }))
    },
//Build the array of all messages//
    buildMessageArray(allUserMessages) {

    //searches messages for all friends of Current User//
        allUserMessages.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
                if (friend.following === 2) {
                    friendOfUser = true
                }
    //builds the message array, adding user name and friend status to the array//
            })
            user.messages.forEach(message => {
                message.userName = user.userName
                message.friendOfUser = friendOfUser
                messageArray.push(message)
            })

        });
    //Sort the array to show newest on the bottom of the list//
        messageArray.sort((a, b) => {return a.timeStamp-b.timeStamp})
    //off to HTML DOMland
        messageDOM.messageHTMLBuilder(messageArray)
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