import messaging from "./messages/messages.js"
import articleFunctions from './articles/articles.js'
import { updateAllScrolls } from './events.js'
import listeners from "./eventListeners.js"



listeners.login()
listeners.register()
const populateComponents = () => {

    messaging.getAllMessages();
    articleFunctions.getAllArticles();
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
    listeners.enableAddItemListener()
    listeners.enableEditButton()
    console.log(`Active ID ${activeUserId}`)
    populateComponents();
}


//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")


export { populateComponents };
