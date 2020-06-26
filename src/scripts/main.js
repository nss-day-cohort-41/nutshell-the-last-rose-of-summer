import session from "./sessionStorage.js"
import API from "./data.js"

session.storeUser(1)

API.getUserData(1)       
.then(user => console.log(user))