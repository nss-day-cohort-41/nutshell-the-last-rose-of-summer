
import listeners from "./eventListeners.js"


listeners.login()
listeners.register()

if (sessionStorage.getItem("activeUser") === null ) {
    document.querySelector(".container__main").classList.toggle("hidden")
    const main = document.querySelector(".container__form__login").classList.toggle("hidden")
}

