import API from "./data.js"
import friends from "./friends/friends.js"
import messaging from "./messages/messages.js";
import articleList from './articles/articleList.js';
import eventList from './events/eventList.js';
import { updateAllScrolls, userWelcome } from './events.js';
import listeners from "./eventListeners.js";

// listeners.enableAddItemListener ()
// listeners.enableEditButton()

listeners.login()
listeners.logout()
listeners.register()
const populateComponents = () => {

    userWelcome();
    document.querySelector("#button__footer__logout").classList.toggle("hidden");
    messaging.getAllMessages();
    articleList.getAllArticles();
    eventList.getAllEvents();
    updateAllScrolls()
    
}



// if active user item not in session storage, set login form to show and hide components
// David Bruce
const activeUserId = sessionStorage.getItem("activeUser")
if (activeUserId !== null) {
    document.querySelector(".container__main").classList.toggle("hidden")
    const main = document.querySelector(".container__form__login").classList.toggle("hidden")
    
} 


if (activeUserId !== null) {

    console.log(`Active ID ${activeUserId}`)
    populateComponents();
    
}


//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")


listeners.enableAddItemListener ()
listeners.enableEditButton()
listeners.enableFriendDelete()


messaging.getAllMessages()
friends.getAllFriends()
// pass divContainer, htmlpage or var, type ("file", or "variable")
// updateForm()
export { populateComponents };


