// Authors => John Hester, David Bruce, Patrick Murphy//
//  This module defines all the event listeners and their actions relating to Nutshell//

import login from "./login.js"
import messageDOM from "./messages/messageDOM.js"
import messaging from "./messages/messages.js"
import friends from "./friends/friends.js"
import articleFunctions from './articles/articles.js'
import eventFunctions from './events/events.js'
import shared from './miscSharedFunctions.js'
import { userWelcome } from './events.js'

import taskSelect from './tasks/taskForm.js'
import taskItem from './tasks/tasks.js'
import API from "./data.js"

const listeners = {

    // event listener object

    login () {
        document.querySelector("#logInButton").addEventListener("click", event => {

            const userName = document.querySelector("#userName").value 
            const password = document.querySelector("#password").value
            login.login(userName, password)
            


        })
    },
    
    logout () {
        document.querySelector("#button__footer__logout").addEventListener("click", event => {
            sessionStorage.removeItem("activeUser")
            location.reload();
            document.querySelector("#button__footer__logout").classList.toggle("hidden")

        })
        

    },
    register () {
        document.querySelector("#registerButton").addEventListener("click", event => {

            const newUserObj = {}

            newUserObj.email = document.querySelector("#email").value
            newUserObj.userName = document.querySelector("#userName").value
            newUserObj.password = document.querySelector("#password").value
            const password2 = document.querySelector("#password2").value

            if(newUserObj.password !== password2) {
                alert("Your password fields do not match.")
            } else {
                login.signUp(newUserObj)
                
            }
        })
    },


    //event listener for the 'Add an Item' dropdown selector//

    enableAddItemListener () {
    // Get the value of the option chosen by the user
        document.querySelector(".select__box").addEventListener("change", clickEvent => {
           let userSelect = clickEvent.target.value

           if (userSelect === "0") {
                userWelcome();
            }
            else if (userSelect === "event") {
                    eventFunctions.addNewEventForm()
            }
            else if (userSelect === "friend") {
                //Invoke Add friend functionality here
                friends.search()
            }
            else if (userSelect === "message") {
                messaging.createNewMessage()
            }
            else if (userSelect === "news") {
                //Invoke Add news article functionality here
                articleFunctions.addNewArticleForm()
            }
            else if (userSelect === "task") {
                taskSelect.insertTaskForm()
            }
        } )

    },

    // Articles Listerers
    enableArticleDeleteButton() {
        const newsContainer = document.querySelector(".container__main__middle--news")
        
        newsContainer.addEventListener("click", event => {
                if (event.target.id.startsWith("button__article__delete")) {
                    const articleId = event.target.id.split("--")[1]
                    // console.log(`Delete me ${articleId}`)
                    articleFunctions.articleDelete(articleId)
                }
            }
        )
    },

    enableArticleDiscardButton() {
        document.querySelector("#button__discard__article").addEventListener("click", event => {
            shared.clearDataField()

           }
        )
    },

    enableArticleSave() {
        document.querySelector("#button__save__article").addEventListener("click", event => {
            articleFunctions.addArticleEntry();
        })
    },

    // Events Listeners
    enableEventDeleteButton() {
        const eventsContainer = document.querySelector(".container__main__right--events")
        
        eventsContainer.addEventListener("click", event => {
                if (event.target.id.startsWith("button__event__delete")) {
                    const eventId = event.target.id.split("--")[1]
                    // console.log(`Delete me ${eventId}`)
                    eventFunctions.eventDelete(eventId)
                }
            }
        )
    },

    enableEventDiscardButton() {
        document.querySelector("#button__discard__event").addEventListener("click", event => {
            shared.clearDataField()

            }
        )
    },
    enableEventSave() {
        document.querySelector("#button__save__event").addEventListener("click", event => {
            eventFunctions.addEventEntry();
        })
    },

    //messages section event listeners
    enableDiscardButton() {
        document.querySelector("#discardButton").addEventListener("click", event => {
            shared.clearDataField()

           }
        )
    },
    enableEditButton() {
        document.querySelector(".container__main__left").addEventListener("click", event => {
            if (event.target.id.split("--")[0] === "buttonMsg") {
                messageDOM.messageEdit()
            }
            else if (event.target.id.split("--")[0] === "buttonAddMsg") {
                //Place 'Add a friend' funtionality from message click here//
                friends.buildFriendsObject()
            }
            
            }
        )
    },
    enableMessageSave() {
        document.querySelector("#saveButton").addEventListener("click", event => {
            messageDOM.buildMessageObject()
        })
    },
    enableMessageUpdate() {
        document.querySelector("#updateButton").addEventListener("click", event => {
            messageDOM.buildMessageObject()
        })
    },

    // task section event listeners 
    discardNewTask () {
        document.querySelector("#button__discard--task").addEventListener("click", event => {
            shared.clearDataField()
            userWelcome()
        })

    },
    saveNewTask () {
        document.querySelector("#button__save--task").addEventListener("click", event => {
            taskItem.newTaskGrabber()
            shared.clearDataField()
            userWelcome()
        })
    },
    generateUserTasks () {
        taskItem.taskListGenerator()
    },
    deleteUserTask () {
        document.querySelector(".container__main__right--tasks").addEventListener("click", event => {
            if(event.target.id.startsWith("buttonTask__delete--")) {
                // gets task id from delete button 
                const deleteId = event.target.id.split("--")[1]

                API.deleteTask(deleteId)
                .then(taskItem.taskListGenerator)

            }
        })
    },
    isTaskComplete () {
        document.querySelector(".container__main__right--tasks").addEventListener("change", event => {
            
            // gets task id from checkbox
            if(event.target.id.startsWith("taskComplete--")) {

                const taskId = event.target.id.split("--")[1]

                taskItem.renderTaskComplete(taskId)
            }
        })
    },
    editTaskListener () {
        document.querySelector(".container__main__right--tasks").addEventListener("click", event => {

            if(event.target.id.startsWith("buttonTask__edit--")) {

                const taskId = event.target.id.split("--")[1]

                taskItem.editTask(taskId)
            }

        })
    },
    updateTaskInDatabase () {
        document.querySelector("#button__edit--task").addEventListener("click", event => {

            const editTaskObj = {}
            //grabs data from new task field
            editTaskObj.userId = document.getElementById("field__task__userId").value
            editTaskObj.task = document.getElementById("task__title").value
            editTaskObj.completionDate = document.getElementById("task__date").value
            editTaskObj.complete = false
            editTaskObj.id = document.getElementById("field__task__taskId").value

            editTaskObj.userId = parseInt(editTaskObj.userId, 10)
            editTaskObj.id = parseInt(editTaskObj.id, 10)
            

            API.editUserTask(editTaskObj.id, editTaskObj)
                .then(taskItem.taskListGenerator)
                .then(shared.clearDataField)
                .then(userWelcome)

        })
    },

    //Friends section event listeners
    enableFriendDelete() {
        document.querySelector(".container__main__middle--friends").addEventListener("click", event => {
            if (event.target.id.split("--")[0] === "friendDelete") {
                let friendToRemove = event.target.id.split("--")[1]
                friends.friendRemove(friendToRemove)
            }
        })
    },
    enableFollowUser() {
        document.querySelector("#followButton").addEventListener("click", event => {
                friends.buildFriendsObjectFromSearch()
        })
    },
    enableFriendSearch() {
        document.querySelector("#userSearch").addEventListener("keypress", event => {
            friends.searchDatabase()
        })
    }
    
}

export default listeners