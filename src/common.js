import { renderUI } from "../index.js";
import { setLocalStorage } from "./otherFunctions.js";




//DOM ELEMENTS --------------------------

export const listContainerEl = document.querySelector(".listContainer");
export const formEl = document.querySelector("form");
export const inputEl = document.querySelector("input");
export const filterEl = document.querySelector("#filter");
export const tasksTrackerEl = document.querySelector(".tasks-tracker");
export const clearBtnEl = document.querySelector(".clearBtn");
export const addBtnEl = document.querySelector(".addItem");


// State Variables -----------------------

export let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
export let usersInput = null;
export let filter = "all";



// Functions to change variables in a different module
export function setUsersInput(newValue){
    usersInput = newValue;
}

export function setTasks(newValue){
    tasks = newValue;
}

export function setFilter(newValue){
    filter = newValue;
}

export function renderUIandSetLocalStorage(){
    renderUI(tasks);
    setLocalStorage();
}