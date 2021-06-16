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
        this.todo = this.todo.map((item, index) => (id == index ? text : item));
    },
    deleteItem(id) {
        this.todo = this.todo.filter((_item, index) => id != index);
    },
};
function renderList(todoList) {
    const renderedtodo = todoList.map((item, index) => {
        return `<div id="${index}" class="todo">
        <p id=${index}text class="todo-text">${item}</p>
        <div>
          <button id="${index}done">Done</button>
          <button onclick="editHandler(this);" id="${index}edit">Edit</button>
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
const editHandler = (button) => {
    const twoParentDiv = button.parentElement.parentElement;
    for (let i = 0; i < twoParentDiv.children.length; i++) {
        twoParentDiv.children[i].classList.add("hidden");
    }
    twoParentDiv.innerHTML = `
  <input id="edit-input" type="text" value="${todoList.todo[+twoParentDiv.id]}" />
  <button onclick="editEvent(this);">Edit</button>
  `;
};
const editEvent = (button) => {
    let editInput = document.getElementById("edit-input");
    todoList.editItem(+button.parentElement.id, editInput.value);
    editInput.value = "";
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