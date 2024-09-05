import { inputEl, addBtnEl, listContainerEl, tasks, tasksTrackerEl } from "./common.js";



// Other Functions ------------------------


export function emptyOrFilledClassList(classToRemove, classToAdd){
    listContainerEl.classList.remove(classToRemove);
    listContainerEl.classList.add(classToAdd);
}



export function displayFooterProgress(){
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


export function setLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function resetUIofInputElAndAddBtnEl(inputValue, addBtnValue){
    inputEl.value = inputValue;
    addBtnEl.innerText = addBtnValue;
}
