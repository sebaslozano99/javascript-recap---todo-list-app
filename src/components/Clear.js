import { listContainerEl, clearBtnEl, tasks, filter, setTasks, renderUIandSetLocalStorage } from "../common.js";



// --- EVENT LISTENER ---
clearBtnEl.addEventListener("click", clearHandler);



// --- HELPER FUNCTION ---

// function clearHandler(){
//     if(!tasks.length) return;

//     const filteredArray = tasks.filter(element => {
//         // if(filter === "all") return tasks.length = 0;

//         if(filter === "pending") return !element.isCompleted && element;

//         if(filter === "completed") return element.isCompleted && element;
//     })

//     console.log(filteredArray);

//     if(!filteredArray.length) {
//         alert("Nothing to clear!");
//         return;
//     }

//     const confirm = window.confirm(`Are you sure you want to delete ${filteredArray.length} ${filter} tasks?`);

//     if(confirm){  
//         setTasks(filteredArray);
//         renderUIandSetLocalStorage();
//         listContainerEl.innerHTML = "";
//     }

// }

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

        setTasks(filteredArray);
        renderUIandSetLocalStorage();
        listContainerEl.innerHTML = "";
    }
}