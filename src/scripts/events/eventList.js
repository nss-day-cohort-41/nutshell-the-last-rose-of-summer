// List Build Functions
// David Bruce

import API from './../data.js';
import renderEvents from './eventDOM.js';
import listeners from './../eventListeners.js';

const eventSection = document.querySelector(".container__main__right--events");
let eventArray = [];
let nextEvent = {};
let activeUserObj = {};
let activeUserId = "";

const eventList = {

    //Get users, friends, and events and build array
    getAllEvents () {
        eventSection.innerHTML="";
        API.getAllUsersAndEvents()
        .then((response => {
            eventList.buildEventArray(response)
        }))
    },
    //Build event array
    buildEventArray(allUserEvents) {
        eventArray = []
        activeUserId = parseInt(sessionStorage.getItem("activeUser"))
        let friendArray = []
        
        activeUserObj = allUserEvents.find(user => user.id === activeUserId)
        activeUserObj.friends.forEach((friend => {
            console.log(friend.following)
            friendArray.push(friend.following)}))

    //Find friends and set object key value
        allUserEvents.forEach(user => {
            let friendOfUser = false
            user.friends.forEach(friend => {
         if (friendArray.includes(friend.userId)) {
                    friendOfUser = true
                }
    // Builds event array with users and friends
            })
            user.events.forEach(event => {
                event.userName = user.userName
                event.friendOfUser = friendOfUser
                if ( event.friendOfUser === true || event.userId === activeUserId) {
                    eventArray.push(event)
                }
            })
        });
    
    // Sorts for newest event to go to top of list
        const thisDate = new Date();
        
        eventArray.sort((a, b) => {

                if (a.date > b.date) return -1;
                if (a.date < b.date) return 1;
                return 0;
        });

        // Find closest event to today
        eventArray.forEach((event => {
            let eventDate = new Date(event.date).getTime();
            let today = thisDate.getTime();
            if (eventDate > today) { nextEvent = event }
            if ( eventDate < nextEvent.date ) { nextEvent = event``}
        }))
        
        
        
    // Add to DOM
        eventList.eventDOMConverter(eventArray)
    }, 

    eventDOMConverter(eventArray)  {
        eventSection.innerHTML = ""  
        eventArray.forEach(event => {
            // Add active user event and adjust class for no italics
            if (event.userId == activeUserId) {
                renderEvents(event)
                document.querySelector(`.event--${event.id}`).classList.remove("section__friend")
            }
            // Add following friends events and adjust class for italics and cornsilk background
            else if (event.friendOfUser === true ) {
                renderEvents(event)
                document.querySelector(`.event--${event.id}`).classList.toggle("section__friend")
                document.querySelector(`#button__event__delete--${event.id}`).classList.toggle("hidden")
            }                
            if ( event.id === nextEvent.id ) {
                document.querySelector(`.event--${event.id}`).classList.toggle("section__nextEvent")
                document.querySelector(`.header__itemCard--${event.id}`).classList.toggle("section__nextEvent")

            }
            listeners.enableEventDeleteButton();
        })
        
    }
}

export default eventList;
