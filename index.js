let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".task-count span");
let taskscompleted = document.querySelector(".tasks-completed span");

//Focus on input field
window.onload = function(){
    theInput.focus();
}

//Adding the task
theAddButton.onclick = function(){
    //if input is empty
    if (theInput.value == '') {
        console.log("No Value");
    } else {
        let noTasksMsg = document.querySelector(".no-tasks-message");
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            noTasksMsg.remove();
        }
        //create span ele
        let mainSpan = document.createElement("span");
        //create delte button
        let deleteElement = document.createElement("span");
        //create the span text 
        let text = document.createTextNode(theInput.value);
        //Create the Delete button 
        let deleteText = document.createTextNode("Delete");
        //add text to span 
        mainSpan.appendChild(text);
        //add class to span
        mainSpan.className = 'task-box';
        //add text to delete
        deleteElement.appendChild(deleteText);
        //add class to delete button
        deleteElement.className = 'delete';
        //add delete button to main span
        mainSpan.appendChild(deleteElement);
        //add the task to container
        tasksContainer.appendChild(mainSpan);
        theInput.value = '';
        theInput.focus();
    }
}

document.addEventListener('click',function(e){
    if (e.target.className=='delete') {
        e.target.parentNode.remove();
        // calculateTasks()
        if(tasksContainer.childElementCount == 0){
            createNoTasks();
        }
    }
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished");
        // calculateTasks()
    }
    

})

// document.addEventListener('click',function(e){
//     if (e.target.className == 'remove-all') {
//            document.querySelector(".task-box").innerHTML = '';
//     }

// })
function createNoTasks() {
    let msgSpan = document.createElement("span");
    let msgText = document.createTextNode("No Tasks To show");
    msgSpan.appendChild(msgText);
    msgSpan.className = 'no-tasks-message';
    tasksContainer.appendChild(msgSpan);
}

function calculateTasks() {
    tasksContainer.innerHTML = document.querySelectorAll('.tasks-content .tasks-box').length;
    taskscompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}


