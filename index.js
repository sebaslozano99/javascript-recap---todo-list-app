import { listContainerEl, tasks, filter } from "./src/common.js";
import { emptyOrFilledClassList, displayFooterProgress } from "./src/otherFunctions.js";



import "./src/components/Clear.js";
import "./src/components/Filter.js";
import "./src/components/Form.js";
import "./src/components/ListContainer.js";



// Event Listeners -----------------------

window.addEventListener("DOMContentLoaded", renderUI(tasks));




// Helper Functions -----------------------

export function renderUI(array){

    if(!array.length) {
        // remove the class on the 1st argument from listContainerEl and add class on the 2nd argument to it
        emptyOrFilledClassList("listContainer", "emptyList");
    }
    else {
        emptyOrFilledClassList("emptyList", "listContainer");

        const filteredArray = array.filter((task) => {
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

        if(!filteredArray.length) emptyOrFilledClassList("listContainer", "emptyList"); // if user filters only the "pending" tasks, but if there are not pending tasks, we'll display an image ("emptyList" class) or the pending tasks if there are some left ("2listContainer" class).

        let html = "";
        filteredArray.forEach((task) => {
            let segment = `
            <li class=${task.isUpdating ? "updateActive":  ""}  >
                <input type="checkbox" ${task.isCompleted && "checked"} ${task.isUpdating && "disabled"}  />
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
}

