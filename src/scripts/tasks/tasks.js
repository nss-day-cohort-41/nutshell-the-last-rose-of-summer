// Task Function Calls for List et al
// John Hester

import API from "../data.js"
import taskDom from "./taskDOM.js"
import taskForm from "./taskForm.js"



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
            .then(this.taskListGenerator)

    },

    taskListGenerator () {
        
        document.querySelector(".container__main__right--tasks").innerHTML = ""
        API.getAllUserTasks(sessionStorage.activeUser)
            .then(user => user.tasks.forEach(task => {
                if (task.complete === false) {
                    document.querySelector(".container__main__right--tasks").innerHTML += taskDom.generateTaskCard(task)
                }
                
            }))
        
    },

    renderTaskComplete (taskId) {
        API.getSingleTask(taskId)
            .then(task => {
                task.complete = true
                return task
            }).then(task => API.completeUserTask(task))
            .then(this.taskListGenerator)
    },

    editTask (taskId) {
      
        API.getSingleTask(taskId)
            .then(task => taskForm.insertEditForm(task))

    }

}