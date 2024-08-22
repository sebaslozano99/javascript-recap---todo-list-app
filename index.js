const inputEl = document.querySelector(".input");
const formEl = document.querySelector("form");
const listContainerEl = document.querySelector(".listContainer");
let usersInput;

inputEl.addEventListener("keyup", (e) => {
    usersInput = e.target.value;
})

formEl.addEventListener("submit", () => {

    if(!usersInput) {
        alert("Type in the task!");
        return;
    }

    listContainerEl.insertAdjacentHTML("beforeend", `
            <li>
                <input type="checkbox">
                <p>${usersInput}</p>
                <button>X</button>
            </li>
        `)

        inputEl.value = "";
})