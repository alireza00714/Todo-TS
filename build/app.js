"use strict";
const loginBtn = document.getElementById("login");
const addToListBtn = document.getElementById("adduser");
let addToListInput = document.getElementById("adduserinput");
let userLoggedIn = false;
let todoList = {
    todo: [],
    addToList(text) {
        this.todo.push(text);
    },
    editItem(id, text) {
        this.todo.map((item, index) => (id == index ? text : item));
    },
    deleteItem(id) {
        this.todo = this.todo.filter((_item, index) => id != index);
    },
};
function renderList(todoList) {
    const renderedtodo = todoList.map((item, index) => {
        return `<div id="${index}" class="todo">
        <p id=${index}text>${item}</p>
        <div>
          <button id="${index}done">Done</button>
          <button id="${index}edit">Edit</button>
          <button onclick="deleteEvent(this);">Delete</button>
        </div>
      </div>`;
    });
    document.getElementById("list").innerHTML = renderedtodo.join(" ");
}
const deleteEvent = (button) => {
    const id = +button.parentElement.parentElement.id;
    todoList.deleteItem(id);
    renderList(todoList.todo);
};
const addEvent = () => {
    if (addToListInput.value == "")
        return;
    else {
        todoList.addToList(addToListInput.value);
        renderList(todoList.todo);
        addToListInput.value = "";
    }
};
//# sourceMappingURL=app.js.map