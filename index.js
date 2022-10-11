let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksContainer2 = document.querySelector(".tasks-content .task-box ");
let tasksCount = document.querySelector(".task-count span");
let taskscompleted = document.querySelector(".tasks-completed span");

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

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }

    arrayOfTasks.push(task);
    addEleToPageFrom(arrayOfTasks);
    addToLocalStorage(arrayOfTasks);
}

function addEleToPageFrom(arrayOfTasks) {
    tasksContainer.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = 'task-box';
        if (task.completed) {
            div.classList.add("tasks-completed") ;
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let deleteElement = document.createElement("span");
        deleteElement.className = 'delete';
        deleteElement.appendChild(document.createTextNode("Delete"));
        div.appendChild(deleteElement);
        tasksContainer.appendChild(div);
        tasksCount.innerHTML = arrayOfTasks.length;
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
    if (arrayOfTasks.length == 0) {
        let mySpan = document.createElement("span");
        let spanText = document.createTextNode('No Tasks To Show');
        mySpan.className = "no-tasks-message";
        mySpan.appendChild(spanText);
        tasksContainer.appendChild(mySpan);
    }
}

function toggleStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            if (arrayOfTasks[i].completed == false) {
                arrayOfTasks[i].completed = true;
            } else {
                arrayOfTasks[i].completed = false
            }
        }
    }
    let a = arrayOfTasks.filter(tass =>tass.completed ==true
        )
        taskscompleted.innerHTML = a.length;
    tasksCount.innerHTML = arrayOfTasks.length;

    addToLocalStorage(arrayOfTasks);
}