

const messageDOM = {

    messageHTMLBuilder(userMessageArray)  {
        document.querySelector(".container__messages--saved").innerHTML = ''
        userMessageArray.forEach(message => {
            // console.log(message)
            //build current user message//
            // if (message.userId === sessionStorage.userId) {
            if (message.userId === 2) {
                messageDOM.buildCurrentUserMessage(message)
            }
            //build current user's friends messages//

            else if (message.friendOfUser === true ) {
                messageDOM.buildCurrentUserFriendMessage(message)
            }
            // else if (message.authorFriends.forEach(friend => {
                // console.log("this is friend #",friend)
                // if (friend.following === 2) {
                // if (friend.following === sessionStorage.userId) {
                    // messageDOM.buildCurrentUserFriendMessage(message)
                        // }
                // else console.log("not that friend")
            //         }
            //     )
            // )
            
            else messageDOM.buildVanillaMessage(message)
            // console.log("do i even get here?")
            // messageDOM.buildVanillaMessage(message)
        }
        );
    },
    buildCurrentUserMessage(message) {
        console.log("This is a current user message", message.message)
    },
    buildCurrentUserFriendMessage(message) {
        console.log("This friend's message", message.message)
    },
    buildVanillaMessage(message) {
        console.log("This stranger's message", message.message)
    }
}

export default messageDOM