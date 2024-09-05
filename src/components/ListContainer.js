import { listContainerEl, inputEl, addBtnEl, isUpdating, tasks, setIsUpdating, setTasks, renderUIandSetLocalStorage } from "../common.js";
import { resetUIofInputElAndAddBtnEl } from "../otherFunctions.js";
import { renderUI } from "../../index.js";

// --- EVENT LISTENERS ---
listContainerEl.addEventListener("click", markAsCompletedItem);
listContainerEl.addEventListener("click", deleteTask);
listContainerEl.addEventListener("click", setAsUpdatingItem);



// --- HELPER FUNCTIONS ---

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


        renderUIandSetLocalStorage();
    }


}


function deleteTask(e){
    const target = e.target;

    if(target.tagName === "BUTTON" && !target.classList.contains("updateBtn")){
        const pEl = target.parentElement.parentElement.children[1];
        const filteredTasks = tasks.filter(task => task.usersInput !== pEl.innerText ? task : null);

        if(isUpdating) setIsUpdating(); //if user was modifying a task, but deletes the task before completing the modification, we change the "isUpdating" status.

        listContainerEl.innerHTML = "";
        resetUIofInputElAndAddBtnEl("", "Add"); //in case user was about to modify a task, but deletes it without modifying it, we remove the text from the input and change the text in the submit btn to "Add".

        setTasks(filteredTasks);
        renderUIandSetLocalStorage();

    }
}



function setAsUpdatingItem(e) {

    const target = e.target;

    if(target.matches(".updateBtn")) {
        const pElValueReference = target.parentElement.parentElement.children[1].textContent;
        target.parentElement.parentElement.classList.toggle("updateActive");
        setIsUpdating(); //change "isUpdating" boolena variable from false to true or vicesersa

        //The specific task clicked by user, we'll find it looping through "tasks" array and change it's value in "isUpdating" key
        tasks.forEach((task) => {
            if(task.usersInput === pElValueReference) {
                task.isUpdating = !task.isUpdating;
            }
        })
        
        if(isUpdating){
            addBtnEl.innerText = "Modify";  

            //find the object in the "tasks" array that matches the task's paragraph/text.
            const filteredItem = tasks.filter((task) => {
                return task.usersInput === pElValueReference;
            });

            //We display in the input the text of the task the user wants to modify
            inputEl.value = filteredItem[0].usersInput;
            inputEl.focus();
        }else {
            resetUIofInputElAndAddBtnEl("", "Add"); //in case user was about to modify a task, but deletes it without modifying it, we remove the text from the input and change the text in the submit btn to "Add".
        }

        renderUI(tasks);
    }

}



// BUG FOUND ---

//  when a task is set to be modified, and user deletes it without firstly completing the modification, if the user then tries to add a new task, the first time user does it after having deleted task before compleing the modification, it will not work -- fixed already