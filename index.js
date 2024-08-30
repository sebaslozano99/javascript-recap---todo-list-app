//DOM elements

const listContainerEl = document.querySelector(".listContainer");
const formEl = document.querySelector("form");
const selectEl = document.querySelector("#filter");
const inputEl = formEl.firstElementChild;
const listContainerItems = listContainerEl.children;


//Variables
let tracker = []; 
let usersInput;
let isUpdating = false;





// ----------------- EVENT LISTENERS

inputEl.addEventListener("keyup", (e) => {
    usersInput = e.target.value;
})

document.addEventListener("DOMContentLoaded", backgroundImage);
formEl.addEventListener("submit", addOrModify);
listContainerEl.addEventListener("click", markAsCompletedItem);
listContainerEl.addEventListener("click", deleteItem);
listContainerEl.addEventListener("click", setAsUpdatingItem);
selectEl.addEventListener("change", filterItems);





// ----------------- Other functions

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


function filterItems(e){

    const filter = e.target.value;

    for(let i = 0; i < listContainerItems.length; i++){
        const listItem = listContainerItems[i];
        const itemsInsideListItem = listItem.children;
        const checkbox = itemsInsideListItem[0];
        listItem.style.display = "flex"; //once clicked on any of the options in the select btn, we first apply this style, to make all elements visible, then depending condition below, this func will hide or reveal the selected items

        if(filter === "completed" && !checkbox.checked){
            listItem.style.display = "none";
            
        }

        if(filter === "pending" && checkbox.checked){
            listItem.style.display = "none";
        }
    }
}




// ----------------- Helper functions

function addOrModify(e){
    e.preventDefault();

    if(!usersInput) {
        // alert("nothing to add!");
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
    const newLiEl = document.createElement("li");
    const checkBoxEl = document.createElement("input");
    checkBoxEl.setAttribute("type", "checkbox");

    const usersTask = document.createElement("p");
    usersTask.innerText = String(usersInput);

    const buttonsContainer = document.createElement("div");
    const deleteBtnEl = document.createElement("button");
    deleteBtnEl.innerText = "X";
    // deleteBtnEl.addEventListener("click", (e) => {
    //     const targetListItem = e.target.parentElement;
    //     targetListItem.remove();
    // })

    const updateBtlEl = document.createElement("button");
    const iconEl = document.createElement("img");
    iconEl.src = "./images/refresh.png";
    iconEl.alt = "update";
    updateBtlEl.append(iconEl);
    updateBtlEl.classList.add("updateBtn");

    buttonsContainer.append(deleteBtnEl, updateBtlEl);

    newLiEl.append(checkBoxEl);
    newLiEl.append(usersTask);
    newLiEl.append(buttonsContainer);

    
    listContainerEl.append(newLiEl);
    inputEl.value = "";
    backgroundImage(); //After each new item submitted We call the function that checks if list is empty or not to add or remove background
    // syncAddedItemsWithTracker(listContainerItems);

}


// Func -- mark as completed or unmark it -- We add eventListener to the checkboxes using event delegation

function markAsCompletedItem(e){
    const target = e.target;
    
    // if(target.tagName === "BUTTON") we toggle the ".completed" css class on the paragraph element inside the list item
    if(target.matches("input")){
        const updateBtnEl = target.parentElement.children[2].children[1];
        const pEl  = target.parentElement.children[1];
        pEl.classList.toggle("completed");


        if(pEl.classList.contains("completed")){
            updateBtnEl.style.backgroundColor = "#ddd";
            updateBtnEl.disabled = true;
        }
        else{
            updateBtnEl.style.backgroundColor = "#bbb";
            updateBtnEl.disabled = false;
        }

        // syncCompletedItemsWithTracker(tracker, pEl, target);
    }


}


// Function to delete list item -- Event delegation to add the event listener to each of the listItem's buttons that will be generated dynamically

function deleteItem(e){
    const target = e.target;

    if(target.tagName === "BUTTON" && !target.classList.contains("updateBtn")) {
        target.parentElement.parentElement.remove();
        backgroundImage();
        // syncDeletedItemWithTracker(listContainerItems);
        console.log(tracker);
    }else {
        return;
    }
}




//add event listener to the updateBtn - when clicked, we toggle classList to let user know they can update the task in the item, we change the "isUpdating" variable - if "isUpdating" is set to TRUE, we pick the current text from the listItem and put it in the input and we focus it so that user knows He can modify now


function setAsUpdatingItem(e) {
    const target = e.target;
    
    
    if(target.matches(".updateBtn")){
        document.querySelector(".addItem").innerText = "Modify";  
        target.parentElement.parentElement.classList.toggle("updateActive");
        isUpdating = !isUpdating;


        if(isUpdating) {
            inputEl.focus();
            inputEl.value = target.parentElement.parentElement.children[1].textContent;
        }
        else{
            inputEl.value = "";
            document.querySelector(".addItem").innerText = "Add";  

        }
    }
}



// Func -- Update List Item  --- 

function updateListItem(){
    let arrayFromList = Array.from(listContainerEl.children);
    let index;

    for(let i = 0; i < arrayFromList.length; i++) {
        if(arrayFromList[i].classList.contains("updateActive")) {
            index = i;
        }
    }

    let pEl = arrayFromList[index].children[1];
    pEl.innerText = usersInput;
    inputEl.value = "";
    isUpdating = !isUpdating;
    document.querySelector(".addItem").innerText = "Add";  

    for(let i = 0; i < arrayFromList.length; i++){ 
        arrayFromList[i].classList.remove("updateActive");
    }
}




//task persistency --- localStorage
