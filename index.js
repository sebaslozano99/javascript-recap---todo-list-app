const listContainerEl = document.querySelector(".listContainer");
const formEl = document.querySelector("form");
const inputEl = formEl.firstElementChild;
let usersInput;

inputEl.addEventListener("keyup", (e) => {
    usersInput = e.target.value;
})



//funcs that adds a background image when there are not any items yet
function backgroundImage() {
    if(!listContainerEl.children.length) {
        // listContainerEl.style.backgroundImage = "url(./images/empty-box.png)";
        listContainerEl.classList.remove("listContainer");
        listContainerEl.classList.add("emptyList");
    }

    if(listContainerEl.children.length){
        listContainerEl.classList.remove("emptyList");
        listContainerEl.classList.add("listContainer");

    }
}

backgroundImage();




// Add new Task function
formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    if(!usersInput) {
        // alert("nothing to add!");
        return;
    }

    
    const newLiEl = document.createElement("li");
    const checkBoxEl = document.createElement("input");
    checkBoxEl.setAttribute("type", "checkbox");

    const usersTask = document.createElement("p");
    usersTask.innerText = String(usersInput);

    const deleteBtnEl = document.createElement("button");
    deleteBtnEl.innerText = "X";
    // deleteBtnEl.addEventListener("click", (e) => {
    //     const targetListItem = e.target.parentElement;
    //     targetListItem.remove();
    // })

    newLiEl.append(checkBoxEl);
    newLiEl.append(usersTask);
    newLiEl.append(deleteBtnEl);
    
    listContainerEl.append(newLiEl);
    inputEl.value = "";
    backgroundImage(); //After each new item submitted We call the function that checks if list is empty or not to add or remove background


})





// We add eventListener to the checkboxes using event delegation - mark as completed or unmark it

listContainerEl.addEventListener("click", (e) => {
    const target = e.target;

    // if(target.tagName === "BUTTON") we toggle the ".completed" css class on the paragraph element inside the list item
    if(target.matches("input")){
        const pEl  = target.parentElement.children[1];
        pEl.classList.toggle("completed");
    }

})


// Function to delete list item -- Event delegation to add the event listener to each of the listItem's buttons that will be generated dynamically

listContainerEl.addEventListener("click", (e) => {
    const target = e.target;

    if(target.tagName === "BUTTON") {
        console.log("button clicked!");
        target.parentElement.remove();
        backgroundImage();
    }
})


