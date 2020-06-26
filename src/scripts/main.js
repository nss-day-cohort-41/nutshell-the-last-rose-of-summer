import session from "./sessionStorage.js"
import API from "./data.js"
import listeners from "./eventListeners.js"

listeners.login()
listeners.register()

import includeHTML from './portal.js'
import { updateAllScrolls } from './events.js'



//pass html page to insert into main element 
let activeUser = true
if (!activeUser) {
    const main = document.querySelector(".container__main")
    main.innerHTML=""
    includeHTML("login.html");

}

//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")
updateAllScrolls();
