import { formEl, inputEl, usersInput, tasks, setUsersInput, renderUIandSetLocalStorage } from "../common.js";
import { resetUIofInputElAndAddBtnEl } from "../otherFunctions.js";


// --- Event Listener ---
formEl.addEventListener("submit", addOrModify);



export function addOrModify(e){
    e.preventDefault();
    const isUpdating = tasks.some(task => task.isUpdating === true);

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


function addNewListItem(){
    
    setUsersInput(inputEl.value.trim());
    tasks.push({
        usersInput,
        isCompleted: false,
        isUpdating: false,
    });

    renderUIandSetLocalStorage();
    displayIndicator();
    inputEl.value = "";
}


function updateListItem(){
    const updatedTask = inputEl.value.trim();
    tasks.forEach((task) => {
        if(task.isUpdating){
            task.usersInput = updatedTask;
            task.isUpdating = !task.isUpdating;
        }
    })

    resetUIofInputElAndAddBtnEl("", "Add"); //we empty the input field and change to "Add" the submitBtn textContent
    renderUIandSetLocalStorage();
}


// other functions 

function displayIndicator(){
    inputEl.classList.add("newTaskAddedOrModified");

    setTimeout(() => {
        inputEl.classList.remove("newTaskAddedOrModified");
    }, 1000)
}
