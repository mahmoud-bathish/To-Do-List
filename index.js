let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksContainer2 = document.querySelector(".tasks-content .task-box ");
let tasksCount = document.querySelector(".task-count span");
let taskscompleted = document.querySelector(".tasks-completed span");
console.log(tasksContainer)

//Focus on input field
window.onload = function () {
    theInput.focus();
}

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocalStorage();

//Adding the task
theAddButton.onclick = function () {
    //if input is empty
    if (theInput.value !== '') {
        let noTasksMsg = document.querySelector(".no-tasks-message");
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            noTasksMsg.remove();
        }

        addTaskToArray(theInput.value);
        theInput.value = "";
        theInput.focus();
    }
}

document.addEventListener('click', function (e) {
    if (e.target.className == 'delete') {
        if (tasksContainer.childElementCount == 0) {
            createNoTasks();
        }
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentNode.remove();
    }
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("tasks-completed");
        toggleStatus(e.target.getAttribute("data-id"));
    }
})

// })
// function createNoTasks() {
//     let msgSpan = document.createElement("span");
//     let msgText = document.createTextNode("No Tasks To show");
//     msgSpan.appendChild(msgText);
//     msgSpan.className = 'no-tasks-message';
//     tasksContainer.appendChild(msgSpan);
// }
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }

    arrayOfTasks.push(task);
    addEleToPageFrom(arrayOfTasks);
    //Local Storage
    addToLocalStorage(arrayOfTasks);
}

function addEleToPageFrom(arrayOfTasks) {
    tasksContainer.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = 'task-box';
        if (task.completed) {
            div.className = "task-box";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let deleteElement = document.createElement("span");
        deleteElement.className = 'delete';
        deleteElement.appendChild(document.createTextNode("Delete"));
        div.appendChild(deleteElement);
        tasksContainer.appendChild(div);
        tasksCount.innerHTML = arrayOfTasks.length;
        let a = arrayOfTasks.filter((task) => task.completed = true);
        // a.forEach(e =>{e.classList.add("tasks-completed")})
        
        taskscompleted.innerHTML = a.length;
    });
}

function addToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addEleToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
        addToLocalStorage(arrayOfTasks);
    }
    tasksCount.innerHTML = arrayOfTasks.length;

}

function toggleStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
           if (arrayOfTasks[i].completed == false){
            arrayOfTasks[i].completed = true ;
            taskscompleted.innerHTML ++;
           } else{
            arrayOfTasks[i].completed = false
           } 
        }
    }
    addToLocalStorage(arrayOfTasks);
}


