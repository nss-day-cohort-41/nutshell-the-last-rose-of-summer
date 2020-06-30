// Events JS
// David Bruce
import API from './../data.js'
import listeners from './../eventListeners.js'
import shared from './../miscSharedFunctions.js'
import eventList from './eventList.js'


// Event Form
const eventFormHTML = (eventOperation) => {
    let eventDiscard = "New Event"
    if (eventOperation === "edit") { 
        eventDiscard = "Edits" 
    
    }
    const formHTML=
    `
        <section class="section__itemCard">
            <input type="hidden" id="field__eventId" value=""/>
            <input type="hidden" id="field__event__userId" value="${sessionStorage.activeUser}"/>
            <p class="header__itemCard"></p>
            <fieldset class="field__event__name">
                <label for="event__name">Event</label>
                <input type="text" class="field__text" id="field__event__name" name="event__name"></input>  
            </fieldset>
            <fieldset class="fieldset__event__date">
                <label for="event__date">Date</label>
                <input type="date" class="field__date" id="field__event__date" name="event__date"></input>  
            </fieldset>
            <fieldset class="fieldset__event__location">
                <label for="event__url">Location</label>
                <input type="text" class="field__text" id="field__event__location" name="event__location"></input>  
            </fieldset>
            <div id="save_discard">
                <input type="button" value="Save Event" id="button__save__event"></input>
                <input type="button" value="Discard ${eventDiscard}" id="button__discard__event"></input>
            </div>
        </section>`;
        return formHTML;
}


// Event Functions for Adding, Deleting, Creating Object
const eventFunctions = {

    addEventEntry () {
        const eventObject = eventFunctions.saveEvent("save")
        API.addEventEntry(eventObject)
            .then((response) => {
                shared.clearDataField();
                eventList.getAllEvents();
            })
    },
    
    eventDelete (eventId) {
      API.deleteEvent(eventId) 
         .then((eventList.getAllEvents()))
    },

    addNewEventForm () {
        document.querySelector(".container__main__left--messages").innerHTML = eventFormHTML("save")
    listeners.enableEventDiscardButton()
    listeners.enableEventSave()

    },

    // Save form fields to new event object
    saveEvent (eventOperation) {
        const eventId = "";
        if (eventOperation === "edit") { 
            eventId = document.getElementById("field__event__eventId").value;
        }
        const eventUserId = parseInt(sessionStorage.getItem("activeUser")); 
        const eventName = document.getElementById("field__event__name").value;
        const eventDate = document.getElementById("field__event__date").value;
        const eventLocation = document.getElementById("field__event__location").value;

        const eventObject = eventFunctions.createEventObject( eventUserId,eventName, eventDate, eventLocation );
        return eventObject;
    }, 

    // Create new event object and return it
    createEventObject (  eventUserId,eventName, eventDate, eventLocation ) {
        return {
            userId: eventUserId,
            name: eventName,
            date: eventDate,
            location: eventLocation
        }
    }
}

export default eventFunctions;
