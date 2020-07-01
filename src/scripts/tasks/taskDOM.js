// Task DOM HTML
// John Hester

export default {

    generateTaskCard (taskObj) {
        const taskHtml = `
        <section class="section__itemCard">
                <p class="header__itemCard">Stay productive!  <button id="buttonTask__edit--${taskObj.id}">Edit</button><button id="buttonTask__delete--${taskObj.id}">Delete</button></p>
                <p><strong>Task: ${taskObj.task}</strong>  </p>
                <p><strong>Estimated Completion Date: ${taskObj.completionDate}</strong>  </p>
                <p><strong>Complete? </strong><input type="checkbox" id="taskComplete--${taskObj.id}" name="complete"></p>
            </section>
        `

        return taskHtml
    }
}