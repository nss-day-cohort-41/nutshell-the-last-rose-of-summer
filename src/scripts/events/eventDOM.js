//HTML DOM building for News Events 
//David Bruce

//Adds html to DOM
const renderEvents = (event) => {
    const eventSection = document.querySelector(".container__main__right--events").innerHTML += 
    `<section class="section__itemCard event--${event.id}">
    <p class="header__itemCard header__itemCard--${event.id}">Name:  ${event.name}<button class=="button__event__delete--${event.id}" id="button__event__delete--${event.id}">Delete</button></p>
    <p><strong>Date:</strong>  ${event.date}</p>
    <p><strong>Location:</strong>  ${event.location}</p>
</section>`
}

export default renderEvents;
