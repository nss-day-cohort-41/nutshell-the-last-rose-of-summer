// Portal Refresh Events
// David Bruce

import { populateComponents } from './main.js'
import API from './data.js'

// Object of containers and true for scroll to top/false for bottom for Scroll functions
// David Bruce
const scrollContainers = {  newsContainer:[".container__main__middle--news",true] , friendsContainer:[".container__main__middle--friends",true] , eventsContainer:[".container__main__right--events",true] , tasksContainer:[".container__main__right--tasks",true] }

const userWelcome = () => {
    const formContainer = document.querySelector(".container__main__left--messages")
    formContainer.innerHTML = "";
    const activeUserId = parseInt(sessionStorage.getItem("activeUser"))
    API.getSingleUser(activeUserId)
      .then((activeUserObject => {
        formContainer.innerHTML = `
        <div class="div__welcome">
            <div class="div__welcome__inner">
                <h4>Welcome, ${activeUserObject.userName}</h4>
            </div>
        </div>
        `;  
    })) 
}

const updateAllScrolls = () => {
    for (var component in scrollContainers) {
        const divContainer = document.querySelector(scrollContainers[component][0])
        const top = scrollContainers[component][1]
        updateScroll(divContainer,top)
    }
}

const updateScroll = (divContainer,top) => {
    if (top === false) {
        divContainer.scrollTop = divContainer.scrollHeight;
        document.querySelector(".container__messages--saved").scrollTop = document.querySelector(".container__messages--saved").scrollHeight
    } else {
        divContainer.scrollIntoView(top)
    }
    
}

// Sets index state for hiding form and displaying component sections
// David Bruce
const updatePortalLoggedIn = () => {
    document.querySelector(".container__main").classList.toggle("hidden");
    const main = document.querySelector(".container__form__login").classList.toggle("hidden");
    // updates scroll areas to required positions, bottom for msgs, top for all others
    populateComponents();
    updateAllScrolls();

}


export { updateAllScrolls, updatePortalLoggedIn, userWelcome };

