/*Author => Patrick Murphy
    This module's purpose is to build the DOM elements for the message section of Nutshell*/
import listeners from "../eventListeners.js"
import messaging from "./messages.js"
import shared from "../miscSharedFunctions.js"
// import API from "../data.js"
let messages;
const messageDOM = {

    messageHTMLBuilder(messageArray)  {
        messages = messageArray
        messageDOM.clearMessageSection()
        let messageSectionHTML = ``
        messageArray.forEach(message => {

            //build current user message//
            if (message.userId == sessionStorage.activeUser) {
               let userHTML = messageDOM.buildCurrentUserMessage(message)
               messageSectionHTML += userHTML           
            }
            //build current user's friends messages//
            else if (message.friendOfUser === true ) {
               let friendHTML = messageDOM.buildCurrentUserFriendMessage(message)
               messageSectionHTML += friendHTML
            }                
            //build stranger's messages//
            else {
                let strangerHTML = messageDOM.buildStrangerMessage(message)
                messageSectionHTML += strangerHTML
            }
        }
        )
        
        document.querySelector(".container__messages--saved").innerHTML = messageSectionHTML;
        // listeners.enableEditButton(messageArray)
    },
    //User message HTML//
    buildCurrentUserMessage(message) {
        let date = shared.dateConverter(message.date)
        return `<section class="section__itemCard">
                    <p class="header__itemCard">${message.userName} <button class="fas fa-user" id="buttonMsg--${message.id}">Edit</i></button></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
        
    },
    //Friend message HTML//
    buildCurrentUserFriendMessage(message) {
        let date = shared.dateConverter(message.date)
        return `<section class="section__itemCard">
                    <p class="header__itemCard">${message.userName} <i class="fas fa-user-friends"></i></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
    },
    //Stranger message HTML//
    buildStrangerMessage(message) {
        let date = shared.dateConverter(message.date)
        return `<section class="section__itemCard">
                    <p class="header__itemCard">${message.userName} <button class="fas fa-user-plus" id="buttonAddMsg--${message.id}"></button></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
    },
    clearMessageSection () {
        document.querySelector(".container__messages--saved").innerHTML = ``
    },
    //Allow user to create a new public message//
    createNewMessageFields () {
        document.querySelector(".container__main__left--messages").innerHTML = `
        <section class="section__itemCard">
        <input type="hidden" id="entryId" value=""/>
        <input type="hidden" id="userMessageId" value="${sessionStorage.activeUser}"/>
        <p class="header__itemCard">${sessionStorage.activeUserName} </p>
        <fieldset class="entry-point">
            <label for="message">Message</label>
            <textarea class="field" id="message__Field" name="message" rows="6" cols="30"></textarea>  
        </fieldset>
        <div id="save_discard">
            <input type="button" value="Save Message" id="saveButton"></input>
            <input type="button" value="Discard Changes" id="discardButton"></input>
        </div>
</section>`
    listeners.enableDiscardButton()
    listeners.enableMessageSave()
    },
    //Allow user to edit own message. Builds pre-populated fieldset in entry area//
    
    messageEdit() {
       
            let idSelected = event.target.id.split("--")[1]
            let editArray = messages.find(array => {
                if (array.id == idSelected) {
                    return array
                }
            })
            let date = shared.dateConverter(editArray.date)
            document.querySelector(".container__main__left--messages").innerHTML = `
            <section class="section__itemCard">
            <input type="hidden" id="entryId" value="${editArray.id}"/>
            <input type="hidden" id="userMessageId" value="${editArray.userId}"/>
            <p class="header__itemCard">${editArray.userName} </p>
            <fieldset class="entry-point">
                <label for="message">Message</label>
                <textarea class="field" id="message__Field" name="message" rows="6" cols="30"></textarea>  
            </fieldset>
            <p><strong>${date}</strong> </p>
            <div id="save_discard">
                <input type="button" value="Update Message" id="updateButton"></input>
                <input type="button" value="Discard Changes" id="discardButton"></input>
            </div>
</section>`
            document.querySelector(`#message__Field`).value = editArray.message
            listeners.enableDiscardButton()
            listeners.enableMessageUpdate()
        
    },
    //just a handoff to prevent linking to additional modules//
    buildMessageObject() {
        messaging.buildMessageObject()
    
    },

    //Discard changes to message button listener
    clearDataField() {
        document.querySelector(".container__main__left--messages").innerHTML = ``
        document.querySelector(".select__box").value = 0
    },
    

}

export default messageDOM
