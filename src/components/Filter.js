import { filterEl, tasks, setFilter } from "../common.js";
import { renderUI } from "../../index.js";



filterEl.addEventListener("change", filterTasks);

function filterTasks(e){
    const target = e.target;
    setFilter(target.value);
    renderUI(tasks);
}


export default filterTasks;