import API from "./data.js"
import messaging from "./messages/messages.js"

import includeHTML from './portal.js'
import { updateAllScrolls } from './events.js'
import updateForm from './forms.js'



//pass html page, type to insert into main element 
// type is either "file" or "variable" containing htmlstring
let activeUser = true
if (!activeUser) {
    const main = document.querySelector(".container__main")
    main.innerHTML=""
    includeHTML(main,"login.html","file");

}


//call to update scroll when message is added or edited
const messageContainer = document.querySelector(".container__messages--saved")
updateAllScrolls();

messaging.userMessageAquire(1)

// pass divContainer, htmlpage or var, type ("file", or "variable")
updateForm()
