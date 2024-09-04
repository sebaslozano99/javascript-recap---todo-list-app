//DOM ELEMENTS --------------------------

const listContainerEl = document.querySelector(".listContainer");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const filterEl = document.querySelector("#filter");
const tasksTrackerEl = document.querySelector(".tasks-tracker");
const clearBtnEl = document.querySelector(".clearBtn");


// State Variables -----------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
let usersInput;
let filter = "all";
let isUpdating = false;



// Event Listeners -----------------------

window.addEventListener("DOMContentLoaded", renderUI(tasks));
formEl.addEventListener("submit", addOrModify);
listContainerEl.addEventListener("click", markAsCompletedItem);
listContainerEl.addEventListener("click", deleteTask);
listContainerEl.addEventListener("click", setAsUpdatingItem);
filterEl.addEventListener("change", filterTasks);
clearBtnEl.addEventListener("click", clearHandler);


// Other Functions ------------------------

function addOrModify(e){
    e.preventDefault();

    if(!inputEl.value) {
        return;
    }

    if(!isUpdating) {
        addNewListItem();
    }
    else{
        updateListItem();
    }
}


function emptyOrFilledClassList(classToRemove, classToAdd){
    listContainerEl.classList.remove(classToRemove);
    listContainerEl.classList.add(classToAdd);
}



function displayFooterProgress(){
    if(!tasks.length) tasksTrackerEl.innerText = "Start Adding Tasks to your List!";
    else {
        const numberOFtasks = tasks.length;
        const tasksCompleted = tasks.filter((task) => {
            return task.isCompleted && task;
        });
        const numberOfTasksCompleted = tasksCompleted.length;
        const percentage = (numberOfTasksCompleted / numberOFtasks) * 100;
        tasksTrackerEl.innerText = numberOfTasksCompleted > 0 ? `You have ${numberOFtasks} tasks in your list! You've completed ${numberOfTasksCompleted} out of ${numberOFtasks} (${percentage.toFixed(0)}%)` : "Start working on your tasks!";
    }
}


// Helper Functions -----------------------

function renderUI(array){
    let filteredArray;

    if(!array.length) {
        // remove "listContainer" class from listContainerEl and add "emptyList" class to it
        emptyOrFilledClassList("listContainer", "emptyList");
    }
    else {
        emptyOrFilledClassList("emptyList", "listContainer");
        let html = "";

        filteredArray = array.filter((task) => {
        if(filter === "pending") {
            return !task.isCompleted && task;
        }
        if(filter === "completed") {
            return task.isCompleted && task;
        }
        if(filter === "all") {
            return task;
        }

    }) 
        if(!filteredArray.length) emptyOrFilledClassList("listContainer", "emptyList");

        filteredArray.forEach((task) => {
            let segment = `
            <li >
                <input type="checkbox" ${task.isCompleted && "checked"}  />
                <p class="${task.isCompleted && "completed"}" >${task.usersInput}</p>
                <div>
                        <button>X</button>
                        <button class="updateBtn" ${task.isCompleted && "disabled"} style="${task.isCompleted && "background-color: #ddd;"}" >
                            <img src="/images/refresh.png" alt="refresh" />
                        </button>
                </div> 
            </li>
            `
            html += segment;
            segment = "";
        
        })
        listContainerEl.innerHTML = html;
        html = ""
    }
    displayFooterProgress();
    console.log(tasks);
}



function addNewListItem(){

    usersInput = inputEl.value.trim();
    tasks.push({
        usersInput,
        isCompleted: false,
        isUpdating: false,
    });
    setLocalStorage();
    inputEl.value = "";
    renderUI(tasks);
}


function setLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function markAsCompletedItem(e){
    const target = e.target;


    if(target.matches("input")){
        const updateBtnEl = target.parentElement.children[2].children[1];
        const pEl  = target.parentElement.children[1];
        pEl.classList.toggle("completed");

        // search array for object that user clicked, and update "isCompleted" variable
        tasks.forEach((element) => {
            if(element.usersInput === pEl.innerText) {
                element.isCompleted = !element.isCompleted;
                setLocalStorage(tasks);
            }
        })

        if(pEl.classList.contains("completed")){
            updateBtnEl.style.backgroundColor = "#ddd";
            updateBtnEl.disabled = true;

        }
        else{
            updateBtnEl.style.backgroundColor = "#bbb";
            updateBtnEl.disabled = false;
        }
    }

    renderUI(tasks);

}


function deleteTask(e){
    const target = e.target;

    if(target.tagName === "BUTTON" && !target.classList.contains("updateBtn")){
        const pEl = target.parentElement.parentElement.children[1];
        const filteredTasks = tasks.filter(task => task.usersInput !== pEl.innerText ? task : null);
        tasks = [...filteredTasks];
        listContainerEl.innerHTML = "";
        renderUI(tasks);
        setLocalStorage();
    }
}



function setAsUpdatingItem(e) {
    const target = e.target;

    if(target.matches(".updateBtn")) {
        const pElValueReference = target.parentElement.parentElement.children[1].textContent;
        target.parentElement.parentElement.classList.toggle("updateActive");
        isUpdating = !isUpdating;

        tasks.forEach((task) => {
            if(task.usersInput === pElValueReference) {
                task.isUpdating = !task.isUpdating;
            }
        })
        
        if(isUpdating){
            document.querySelector(".addItem").innerText = "Modify";  
            const filteredItem = tasks.filter((task) => {
                return task.usersInput === pElValueReference;
            });
            inputEl.value = filteredItem[0].usersInput;
            inputEl.focus();
        }else {
            inputEl.value = "";
            document.querySelector(".addItem").innerText = "Add";  
        }

        renderUI(tasks);
        
    }

}



function updateListItem(){
    const updatedTask = inputEl.value.trim();
    tasks.forEach((task) => {
        if(task.isUpdating){
            task.usersInput = updatedTask;
            task.isUpdating = !task.isUpdating;
        }
    })
    setLocalStorage();
    inputEl.value = "";
    renderUI(tasks);
    isUpdating = !isUpdating;

}



function filterTasks(e){
    const target = e.target;
    filter = target.value;
    renderUI(tasks);
}


function clearHandler(){
    if(!tasks.length) return;

    const confirm = window.confirm(`Are you sure you want to delete ${filter} tasks?`);


    if(confirm){

        if(filter === "all"){
            tasks.length = 0;
        }   

        const filteredArray = tasks.filter(element => {
            if(filter === "pending"){
                return element.isCompleted && element;
            }
    
            if(filter === "completed"){
                return !element.isCompleted && element;
            }
        })

        tasks = [...filteredArray];
        setLocalStorage();
        listContainerEl.innerHTML = "";
        console.log(tasks);
        renderUI(tasks);
    }

}