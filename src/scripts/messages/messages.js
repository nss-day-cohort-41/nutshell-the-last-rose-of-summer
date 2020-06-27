import API from "../data.js"
import messageDOM from "../messages/messageDOM.js"

let friendMessage;
let messageArray = [];
const messaging = {
    getAllMessages () {
        API.getAllUsersAndMessages()
        .then((response => {
            messaging.buildMessageArray(response)
        }))
    },
    buildMessageArray(allUserMessages) {

        console.log(allUserMessages)
        allUserMessages.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
                if (friend.following === 2) {
                    friendOfUser = true
                }

            })
            user.messages.forEach(message => {
                message.userName = user.userName
                message.friendOfUser = friendOfUser
                messageArray.push(message)
            })

        });

        messageArray.sort((a, b) => {return a.timeStamp-b.timeStamp})

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