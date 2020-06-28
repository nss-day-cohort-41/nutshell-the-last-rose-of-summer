/*Author => Patrick Murphy
    This module's purpose is to build the DOM elements for the message section of Nutshell*/
import listeners from "../eventListeners.js"
import API from "../data.js"
const messageDOM = {

    messageHTMLBuilder(userMessageArray)  {
        messageDOM.clearMessageSection()
        let messageSectionHTML = ``
        userMessageArray.forEach(message => {

            //build current user message//
            if (message.userId === 2) {
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
        listeners.enableEditButton(userMessageArray)
    },
    //User message HTML//
    buildCurrentUserMessage(message) {
        let date = message.date
                date = date.toString()
                date = date.slice(0,15)
        return `<section class="section__itemCard">
                    <p class="header__itemCard">${message.userName} <button id="buttonMsg--${message.id}">Edit</button></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
        
    },
    //Friend message HTML//
    buildCurrentUserFriendMessage(message) {
        let date = message.date
                date = date.toString()
                date = date.slice(0,15)
        return `<section class="section__itemCard">
                    <p class="header__itemCard">${message.userName}</p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
    },
    //Stranger message HTML//
    buildStrangerMessage(message) {
        let date = message.date
                date = date.toString()
                date = date.slice(0,15)
        return `<section class="section__itemCard">
                    <p class="header__itemCard">${message.userName} <button id="buttonAddMsg--${message.id}">Add Friend</button></p>
                    <p><strong>${message.message}</strong> </p>
                    <p><strong>${date}</strong> </p>
        </section>
        `
    },
    clearMessageSection () {
        document.querySelector(".container__messages--saved").innerHTML = ``
    },
    messageEdit(userMessageArray) {
       
            let idSelected = event.target.id.split("--")[1]
            let editArray = userMessageArray.find(array => {
                    console.log(array.id)
                if (array.id == idSelected) {
                    return array
                }
            })
            let date = editArray.date
                date = date.toString()
                date = date.slice(0,15)
            document.querySelector(".container__main__left--messages").innerHTML = `
            <section class="section__itemCard">
            <input type="hidden" id="entryId" value="${editArray.id}"/>
            <input type="hidden" id="userMessageId" value="${editArray.userId}"/>
            <p class="header__itemCard">${editArray.userName} </p>
            <fieldset class="entry-point">
                <label for="message">Message</label>
                <textarea class="field" id="message__Field" name="message" rows="4" cols="35"></textarea>  
            </fieldset>
            <p><strong>${date}</strong> </p>
            <div id="save_discard">
                <input type="button" value="Update Message" id="saveButton"></input>
                <input type="button" value="Discard Changes" id="discardButton"></input>
            </div>
</section>`
            document.querySelector(`#message__Field`).value = editArray.message
            listeners.enableDiscardButton()
            listeners.enableMessageUpdate()
        
    },
    buildMessageObject() {
        let date = new Date()
           date = date.toString()
           date = date.slice(0,15)
        let id = document.querySelector("#entryId").value
        let messageObject = {
            "userId": document.querySelector("#userMessageId").value,
            "message": document.querySelector("#message__Field").value,
            "date": new Date()
        }
        // console.log(messageObject)
        if (document.querySelector("#entryId").value === "") {
            API.PostNewMessage(messageObject)
            .then(this.clearDataField())
        }
        else if (document.querySelector("#entryId").value !== "") {
            API.editExistingMessage (messageObject, id)
            .then(this.clearDataField())
        }
    },

    //Discard changes to message button listener
    clearDataField() {
        document.querySelector(".container__main__left--messages").innerHTML = ``
    }

}

export default messageDOM


// messageDOM.enableEditButtonListener(message.id)