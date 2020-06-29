
import listeners from "./eventListeners.js"
import { updatePortalLoggedIn, updateComponents } from "./events.js"


listeners.login()
listeners.register()

// if active user item not in session storage, set login form to show and hide components
if (sessionStorage.getItem("activeUser") === null ) {
    document.querySelector(".container__main").classList.toggle("hidden")
    const main = document.querySelector(".container__form__login").classList.toggle("hidden")
} 

const activeUserId = sessionStorage.getItem("activeUser")
if (activeUserId !== null) {
    console.log(`Active ID ${activeUserId}`)
    updateComponents(activeUserId)
}
