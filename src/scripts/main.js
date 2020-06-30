import API from "./data.js"
import messaging from "./messages/messages.js"
import friends from "./friends/friends.js"

import { updateAllScrolls } from './events.js'
// import updateForm from './forms.js'
import listeners from "./eventListeners.js"
import { updatePortalLoggedIn, updateComponents } from "./events.js"


listeners.login()
listeners.register()

// if active user item not in session storage, set login form to show and hide components
// David Bruce
if (sessionStorage.getItem("activeUser") === null ) {
    document.querySelector(".container__main").classList.toggle("hidden")
    const main = document.querySelector(".container__form__login").classList.toggle("hidden")
} 

const activeUserId = sessionStorage.getItem("activeUser")
if (activeUserId !== null) {
    console.log(`Active ID ${activeUserId}`)
    updateComponents(activeUserId)
}


//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")
updateAllScrolls();


listeners.enableAddItemListener ()
listeners.enableEditButton()
listeners.enableFriendDelete()


messaging.getAllMessages()
friends.getAllFriends()
// pass divContainer, htmlpage or var, type ("file", or "variable")
// updateForm()
