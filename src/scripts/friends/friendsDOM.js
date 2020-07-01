/*Author => Patrick Murphy
This module's purpose is to build the DOM elements for the friends section of Nutshell*/
import miscSharedFunctions from "../miscSharedFunctions.js"
import listeners from "../eventListeners.js"


const friendsDOM = {
    //Assembles to HTML for the Friends list//
    buildFriendList(friendsArray) {
        let friendsListHTML = ``
        document.querySelector(".container__main__middle--friends").innerHTML = ``
        //Iterates through the friends array, sending each array to the DOM builder//
        friendsArray.forEach(friend => {
           let thisFriendHTML = friendElementHTML(friend)
           friendsListHTML += thisFriendHTML           
        });
        //Places the HTML in the DOM//
        document.querySelector(".container__main__middle--friends").innerHTML = friendsListHTML
    },
    //Builds the HTML for the 'search users for new friend opportunities' fields// 
    buildSearchFields() {
        document.querySelector(".container__main__left--messages").innerHTML = `
            <section class="section__itemCard">
                <p class="header__itemCard">${sessionStorage.activeUserName}</p>
                <fieldset class="entry-point">
                    <label for="userSearch">Search for users:</label>
                    <input type="search" id="userSearch" name="userSearch">
                </fieldset>
                <section class="section__itemCard" id="foundUser">
                    
                </section>
                <div id="save_discard">
                    <input type="button" value="Discard Changes" id="discardButton"></input>
                </div>
            </section>`
            listeners.enableDiscardButton()
            listeners.enableFriendSearch()
    },
    //Builds the HTML for search results and inserts them into the DOM below the search field//
    insertSearchResult(searchDisplayArray) {
        let searchFoundHTML = ``
        document.querySelector("#foundUser").innerHTML = ``
        searchDisplayArray.forEach(toDisplay => {
            let displayHTML = `
            <p class="header__itemCard">${toDisplay.userName} <button class="fas fa-user-plus" id="buttonAddMsg--${toDisplay.id}" value="${toDisplay.userName}"></button></p>
            `
            searchFoundHTML += displayHTML
        })
        document.querySelector("#foundUser").innerHTML = searchFoundHTML
    }

}
    //Provides the HTML for the Build Friend list function
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

