// Task Form DOM
// John Hester

import listeners from "../eventListeners.js"
import shared from "../miscSharedFunctions.js"


export default {
    insertTaskForm () {

        shared.clearDataField()

        const taskSelect = `
        <section id="section__itemCard" >
            <input type="hidden" id="field__task__userId" value="${sessionStorage.activeUser}"/>
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

    },
    insertEditForm (taskObj) {

        shared.clearDataField()

        const formHTML = `
        <section id="section__itemCard" >
        <input type="hidden" id="field__task__userId" value="${sessionStorage.activeUser}"/>
        <input type="hidden" id="field__task__taskId" value="${taskObj.id}"/>
        <fieldset class="fieldset__task__title">
            <label for="task__title">Task: </label>
            <input type="text" class="field__text" id="task__title" name="task__title" value="${taskObj.task}">
        </fieldset>
        <fieldset class="fieldset__task__title">
            <label for="task__date">Task Deadline:</label>
            <input type="date" class="field__text" id="task__date" name="task__date" value="${taskObj.completionDate}">
        </fieldset>
        <div id="save_discard">
            <input type="button" value="Edit Task" id="button__edit--task"></input>
            <input type="button" value="Discard" id="button__discard--task"></input>
        </div>

    </section>
        `

        document.querySelector(".container__main__left--messages").innerHTML += formHTML

        listeners.updateTaskInDatabase()
        listeners.discardNewTask()
    }
}