import includeHTML from './portal.js'

const messageForm = `
 <form action="" class="message__form" id="formMessage">
 <fieldset class="field__input">
     <label for="inputMessage">Message</label>
     <input class="input__text" type="text" name="inputMessage" id="MessageText">
 </fieldset>
 <fieldset class="field__input">
     <input id="saveMessage" type="button" value="saveMessage">
     <input id="updateMessage" type="button" value="Save Edited Message">
 </fieldset>
</form>`

let editMessage = true
const updateForm = (type,operation) => {
    if (type === "message") {
        const formContainer = document.querySelector(".container__main__left--messages")
        includeHTML(formContainer,messageForm, "variable")
        if (operation === "save") { document.getElementById("updateMessage").classList.add("hidden")}
        if (operation === "edit") { document.getElementById("saveMessage").classList.add("hidden")}
    }

}



export default updateForm;