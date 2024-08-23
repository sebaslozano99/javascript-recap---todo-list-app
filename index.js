const listContainerEl = document.querySelector(".listContainer");
const formEl = document.querySelector("form");
const inputEl = formEl.firstElementChild;
let usersInput;


function updateListStyle() {
    // Remove existing classes
    listContainerEl.classList.remove('empty-list', 'has-items');
    
    // Check if the ul has any li elements
    if (listContainerEl.getElementsByTagName('li').length > 0) {
        listContainerEl.classList.remove("empty-list");
        listContainerEl.classList.add('has-items');
    } else {
        listContainerEl.classList.add('empty-list');
        const image = document.createElement("img");
        image.src = "./images/empty-box.png";
        listContainerEl.append(image);
    }
  }

  // Initial check on page load
  updateListStyle();


inputEl.addEventListener("keyup", (e) => {
    usersInput = e.target.value;
})


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

})





// We add eventListener to the checkboxes using event delegation - 

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
    }
})


