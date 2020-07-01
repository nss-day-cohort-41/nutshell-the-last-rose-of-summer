import API from "./data.js"
import friends from "./friends/friends.js"
import messaging from "./messages/messages.js";
import articleList from './articles/articleList.js';
import eventList from './events/eventList.js';
import { updateAllScrolls, userWelcome } from './events.js';
import listeners from "./eventListeners.js";
import taskItem from "./tasks/tasks.js"


listeners.login()
listeners.logout()
listeners.register()

const populateComponents = () => {

    userWelcome();
    listeners.enableAddItemListener ()
    listeners.generateUserTasks()
    listeners.enableEditButton()
    listeners.enableFriendDelete()
    document.querySelector("#button__footer__logout").classList.toggle("hidden");
    messaging.getAllMessages();
    friends.getAllFriends()
    articleList.getAllArticles();
    eventList.getAllEvents();
    taskItem.taskListGenerator()
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
    //initial task generation
    console.log(`Active ID ${activeUserId}`)
    populateComponents();
    
}


//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")




// pass divContainer, htmlpage or var, type ("file", or "variable")
// updateForm()
export { populateComponents };

//task delete and complete listeners
listeners.deleteUserTask()
listeners.isTaskComplete()


