// Main JavaScript Parent Module for index.html 
// David Bruce, John Hester, Patrick Murphy

import friends from "./friends/friends.js"
import messaging from "./messages/messages.js";
import articleList from './articles/articleList.js';
import eventList from './events/eventList.js';
import { updateAllScrolls, userWelcome } from './events.js';
import listeners from "./eventListeners.js";


// Login and Registration Listeners
listeners.login()
listeners.logout()
listeners.register()

// Function for refreshing and populating all list components
const populateComponents = () => {
    document.querySelector("#button__footer__logout").classList=("button__footer__logout");
    
    userWelcome();
    document.querySelector(".select__box").value = 0
    // listeners.enableAddItemListener ()
    // listeners.generateUserTasks()
    // listeners.enableEditButton()
    // listeners.enableFriendDelete()

    messaging.getAllMessages();
    articleList.getAllArticles();
    eventList.getAllEvents();
    friends.getPrimaryUserAndFriends()
    updateAllScrolls()
    
    
}



// if active user item not in session storage, set login form to show and hide components
// David Bruce
const activeUserId = sessionStorage.getItem("activeUser")
if (activeUserId !== null) {
    document.querySelector(".container__main").classList.toggle("hidden")
    const main = document.querySelector(".container__form__login").classList.toggle("hidden")
    populateComponents();
    
} 


//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")


// listeners.enableAddItemListener ()
// listeners.enableEditButton()
// listeners.enableFriendDelete()



export { populateComponents };

//task delete and complete listeners
listeners.deleteUserTask()
listeners.isTaskComplete()
listeners.editTaskListener()
listeners.enableAddItemListener ()
listeners.generateUserTasks()
listeners.enableEditButton()
listeners.enableFriendDelete()

