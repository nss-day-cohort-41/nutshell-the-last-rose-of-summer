import login from "./login.js"
import { updatePortalLoggedIn } from './events.js'

const listeners = {

    // event listener object

    login () {
        document.querySelector("#logInButton").addEventListener("click", event => {

            const userName = document.querySelector("#userName").value 
            const password = document.querySelector("#password").value
            login.login(userName, password)
            


        })
    },

    register () {
        document.querySelector("#registerButton").addEventListener("click", event => {

            const newUserObj = {}

            newUserObj.email = document.querySelector("#email").value
            newUserObj.userName = document.querySelector("#userName").value
            newUserObj.password = document.querySelector("#password").value
            const password2 = document.querySelector("#password2").value

            if(newUserObj.password !== password2) {
                alert("Your password fields do not match.")
            } else {
                login.signUp(newUserObj)
                
            }
        })
    }
}

export default listeners