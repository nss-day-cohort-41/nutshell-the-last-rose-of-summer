import API from "../data.js"
import listeners from "../eventListeners.js"



export default {

    newTaskGrabber () {
        const newTaskObj = {}
        //grabs data from new task field
        newTaskObj.userId = document.getElementById("field__task__userId").value
        newTaskObj.task = document.getElementById("task__title").value
        newTaskObj.completionDate = document.getElementById("task__date").value
        newTaskObj.complete = false

        newTaskObj.userId = parseInt(newTaskObj.userId, 10)

        API.saveNewTask(newTaskObj)
            .then(this.taskListGenerator())


    },

    taskListGenerator () {
        
        // document.querySelector("container__main__right--tasks").innerHTML = ""
        API.getAllUserTasks(sessionStorage.activeUser)
            .then(user => user.tasks.forEach(task => console.log(task)))
        
    }

}