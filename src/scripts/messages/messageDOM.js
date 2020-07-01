/*Author => Patrick Murphy
    This module's purpose is to build the DOM elements for the message section of Nutshell*/
import listeners from "../eventListeners.js"
import messaging from "./messages.js"
import shared from "../miscSharedFunctions.js"
// import API from "../data.js"
let messages;
const messageDOM = {
    //Iterates through the message array to find Active User, Friends of user, and strangers
    messageHTMLBuilder(messageArray)  {
        messages = messageArray
        messageDOM.clearMessageSection()
        let messageSectionHTML = ``
        let highestMsgID = 0;
        messageArray.forEach(message => {
            if (message.id > highestMsgID) { highestMsgID = message.id}
            //build Active user messages//
            if (message.userId == sessionStorage.activeUser) {
               let userHTML = messageDOM.buildCurrentUserMessage(message)
               messageSectionHTML += userHTML           
            }
            //build Active user's friend's messages//
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
    },
    //Section for providing the message HTML//
    //User message HTML//
    buildCurrentUserMessage(message) {
        let date = shared.dateConverter(message.date)
        return `<section class="section__itemCard section__message__${message.id}">
                    <p class="header__itemCard">${message.user.userName} <button class="fas fa-user" id="buttonMsg--${message.id}">Edit</i></button></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
        
    },
    //Friend message HTML//
    buildCurrentUserFriendMessage(message) {
        let date = shared.dateConverter(message.date)
        return `<section class="section__itemCard section__message__${message.id}">
                    <p class="header__itemCard">${message.user.userName} <i class="fas fa-user-friends"></i></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
    },
    //Stranger message HTML//
    buildStrangerMessage(message) {
        let date = shared.dateConverter(message.date)
        return `<section class="section__itemCard section__message__${message.id}">
                    <p class="header__itemCard">${message.user.userName} <button class="fas fa-user-plus" id="buttonAddMsg--${message.user.id}" value="${message.user.userName}"></button></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
    },
    clearMessageSection () {
        document.querySelector(".container__messages--saved").innerHTML = ``
    },
    //Builds the HTML for the fields to allow user to create a new public message//
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
        //find the message to be edited//      
            let idSelected = event.target.id.split("--")[1]
            let editArray = messages.find(array => {
                if (array.id == idSelected) {
                    return array
                }
            })
            //build the HTML to display the message in the entry field section//
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
    
    }

   
   
}

export default messageDOM
