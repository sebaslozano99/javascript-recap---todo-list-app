//DOM ELEMENTS --------------------------

const listContainerEl = document.querySelector(".listContainer");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const filterEl = document.querySelector("#filter");



// State Variables -----------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
let usersInput;
let filter = "all";
let isUpdating = false;



// Event Listeners -----------------------

window.addEventListener("DOMContentLoaded", renderUI);
formEl.addEventListener("submit", addOrModify);
listContainerEl.addEventListener("click", markAsCompletedItem);
listContainerEl.addEventListener("click", deleteTask);
listContainerEl.addEventListener("click", setAsUpdatingItem);
filterEl.addEventListener("change", filterItems);



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






// Helper Functions -----------------------

function renderUI(){
    if(!tasks.length) {
        listContainerEl.classList.remove("listContainer");
        listContainerEl.classList.add("emptyList");
    }
    else {
        listContainerEl.classList.remove("emptyList");
        listContainerEl.classList.add("listContainer");
        let html = "";
        tasks.forEach((task) => {
            let segment = `
            <li>
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

}



function addNewListItem(){

    usersInput = inputEl.value.trim();
    tasks.push({
        usersInput,
        isCompleted: false,
        isUpdating: false,
    });
    console.log(tasks);
    setLocalStorage();
    inputEl.value = "";
    renderUI();
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


}


function deleteTask(e){
    const target = e.target;

    if(target.tagName === "BUTTON" && !target.classList.contains("updateBtn")){
        const pEl = target.parentElement.parentElement.children[1];
        const filteredTasks = tasks.filter(task => task.usersInput !== pEl.innerText ? task : null);
        tasks = [...filteredTasks];
        listContainerEl.innerHTML = "";
        renderUI();
        setLocalStorage();
    }
}



function setAsUpdatingItem(e) {
    const target = e.target;

    if(target.matches(".updateBtn")) {
        const pElValueReference = target.parentElement.parentElement.children[1].textContent;
        isUpdating = !isUpdating;
        target.parentElement.parentElement.classList.toggle("updateActive");

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
    renderUI();
    isUpdating = !isUpdating;

}


function filterItems(e){
    console.log(e);
    const target = e.target;
    const targetValue = target.value;
    console.log(targetValue);

    
}