import listeners from "../eventListeners.js"
import shared from "../miscSharedFunctions.js"


export default {
    insertTaskForm () {

        shared.clearDataField()

        const taskSelect = `
        <section id="section__itemCard" >
            <input type="hidden" id="field__task__userId" value="${sessionStorage.activeUser}"/>
            <p class="header__itemCard">${sessionStorage.activeUserName}</p>
            <fieldset class="fieldset__task__title">
                <label for="task__title">Task: </label>
                <input type="text" class="field__text" id="task__title" name="task__title">
            </fieldset>
            <fieldset class="fieldset__task__title">
                <label for="task__date">Task Deadline:</label>
                <input type="date" class="field__text" id="task__date" name="task__date">
            </fieldset>
            <div id="save_discard">
                <input type="button" value="Save Task" id="button__save--task"></input>
                <input type="button" value="Discard" id="button__discard--task"></input>
            </div>
    
        </section>
        `
        // inserts HTML into DOM and activates listeners
        document.querySelector(".container__main__left--messages").innerHTML += taskSelect

        listeners.discardNewTask()
        listeners.saveNewTask()

    }
}