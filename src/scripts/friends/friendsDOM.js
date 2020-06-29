/*Author => Patrick Murphy
This module's purpose is to build the DOM elements for the friends section of Nutshell*/
import miscSharedFunctions from "../miscSharedFunctions.js"
// import eventListeners from "../eventListeners.js"

let friendsListHTML = ``

const friendsDOM = {

    buildFriendList(friendsArray) {
        let friendsListHTML = ``
        document.querySelector(".container__main__middle--friends").innerHTML = ``
        friendsArray.forEach(friend => {
           let thisFriendHTML = friendElementHTML(friend)
           friendsListHTML += thisFriendHTML           
        });
        document.querySelector(".container__main__middle--friends").innerHTML = friendsListHTML
    console.log(friendsArray)
    
    }

}

const friendElementHTML = (friend) => {
    let date = miscSharedFunctions.dateConverter(friend.friendsSince)
    let elementHTML = `
        <section class="section__itemCard">
            <p class="header__itemCard">${friend.friendName}<button id="friendDelete--${friend.friendId}" class="fas fa-user-minus"></button></p>
            <p><strong>${friend.friendEmail}</strong> </p>
            <p><em>friends since ${date}</em></p>
        </section>
    `
    return elementHTML
}
export default friendsDOM