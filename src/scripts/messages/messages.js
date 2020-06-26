import API from "../data.js"
let friendMessage;
let userMessageArray = [];
const messaging = {
    userMessageAquire (userId) {
       API.getUserMessages(userId)
        .then((userData => {
            console.log(`This is user #${userId} data`, userData)
        messaging.buildMessages(userData)  
        }))
        // let messagesToDisplay = currentUserAndMessages.messages
        let friendsMessages = {
            
        }
    },
    buildMessages (userData) {
        userMessageArray.push(userData.messages)
        let friends = userData.friends
        console.log(`These are the user messages`, userMessageArray)
        console.log(`These are the user friends`, friends)
        friends.forEach(friend => {
            API.getFriendMessages (friend.following)
            .then((userObj => {
                friendMessage = userObj.messages
                console.log("These are a users messages", friendMessage)
                userMessageArray.push(friendMessage)
                console.log("These are all the messages", userMessageArray)
            }))
        });
        messageDOM.messageHTMLBuilder (userMessageArray, userId)
    },
 
}

export default messaging