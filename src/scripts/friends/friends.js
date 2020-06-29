//Author => Patrick Murphy
//This module handles the primary data flow for the friends section//

import API from "../data.js"
import friendsDOM from "./friendsDOM.js"

let friendsArray = []
let userArray = []
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
        console.log(friendsArray)
        friendsDOM.buildFriendList(friendsArray)
    },
    friendRemove(deleteId) {
        console.log(friendsArray)
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
    }
}
//iterate the user data to build the array of active user's friends and their information//

// const findFriend = (friend) => {
//     userArray.forEach(user => {
//         if (user.id === friend.following) {
//             let friendObj = {
//                 "jsonReferenceId": friend.id,
//                 "friendName": user.userName,
//                 "friendEmail": user.email,
//                 "friendId": user.id,
//                 "isFriend": true,
//                 "friendsSince": friend.date
//             }
//             friendsArray.push(friendObj)
//         }
//     })
// }
export default friends