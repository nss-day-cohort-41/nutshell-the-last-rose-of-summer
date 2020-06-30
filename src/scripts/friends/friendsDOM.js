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
    // console.log(friendsArray)
    
    },
    //***for future functionality*** Friend Request*/
//     buildRequestField(requestTo) {
      
            

//             document.querySelector(".container__main__left--messages").innerHTML = `
//             <section class="section__itemCard">
//             <input type="hidden" id="possibleFriend" value="${requestTo.id}"/>
//             <input type="hidden" id="userId" value="${sessionStorage.activeUser}"/>
//             <p class="header__itemCard">${sessionStorage.activeUserName}</p>
//             <fieldset class="entry-point">
//                 <label for="message">Message to ${requestTo.userName}</label>
//                 <textarea class="field" id="message__Field" name="message" rows="6" cols="30"></textarea>  
//             </fieldset>
//             <div id="save_discard">
//                 <input type="button" value="Send request" id="requestButton"></input>
//                 <input type="button" value="Discard Changes" id="discardButton"></input>
//             </div>
// </section>`

//             listeners.enableDiscardButton()
//             listeners.enableSendFriendRequest()
        
    
//     }

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