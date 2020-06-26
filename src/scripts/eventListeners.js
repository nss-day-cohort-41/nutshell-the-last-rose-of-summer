import login from "./login.js"

const listeners = {

    // event listener object

    login () {
        document.querySelector("#logInButton").addEventListener("click", event => {

            const username = document.querySelector("#username").value 
            const password = document.querySelector("#password").value

            login.login(username, password)

        })
    },

    register () {
        document.querySelector("#registerButton").addEventListener("click", event => {

            const newUserObj = {}

            newUserObj.email = document.querySelector("#email").value
            newUserObj.username = document.querySelector("#username").value
            newUserObj.password1 = document.querySelector("#password1").value
            newUserObj.password2 = document.querySelector("#password2").value

            if(newUserObj.password1 !== newUserObj.password2) {
                alert("Your password fields do not match.")
            } else {
                login.signUp(newUserObj)
            }
        })
    }
}

export default listeners