"use strict";
const loginBtn = document.getElementById("login");
const addToListBtn = document.getElementById("adduser");
let addToListInput = document.getElementById("adduserinput");
let todoList = {
    todo: [],
    addToList(text) {
        this.todo.push({ text: text, done: false });
    },
    editItem(id, text, done) {
        this.todo = this.todo.map((item, index) => (id === index ? { text: text, done: done } : item));
    },
    deleteItem(id) {
        this.todo = this.todo.filter((_item, index) => id !== index);
    },
};
function renderList(todoList) {
    const renderedtodo = todoList.map((item, index) => {
        return `<div id="${index}" class="todo">
        <p id=${index}text class="todo-text ${item.done === true ? "done" : null}">${item.text}</p>
        <div>
          <button onclick="doneEvent(this);" id="${index}done">${item.done === true ? "Undone" : "Done"}</button>
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
  <input id="edit-input" type="text" value="${todoList.todo[+twoParentDiv.id].text}" />
  <button onclick="editEvent(this);">Edit</button>
  `;
};
const editEvent = (button) => {
    let editInput = document.getElementById("edit-input");
    todoList.editItem(+button.parentElement.id, editInput.value, false);
    editInput.value = "";
    renderList(todoList.todo);
};
const doneEvent = (button) => {
    const twoParentDiv = button.parentElement.parentElement;
    const todoText = document.getElementById(`${twoParentDiv.id}text`);
    if (button.innerHTML == "Done") {
        todoList.editItem(+twoParentDiv.id, todoText.innerHTML, true);
        renderList(todoList.todo);
    }
    else {
        todoList.editItem(+twoParentDiv.id, todoText.innerHTML, false);
        renderList(todoList.todo);
    }
};
const addEvent = () => {
    if (addToListInput.value === "")
        return;
    else {
        todoList.addToList(addToListInput.value);
        renderList(todoList.todo);
        addToListInput.value = "";
    }
};
addToListInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addEvent();
    }
});
loginBtn.addEventListener("click", () => {
    document.getElementById("loginmsg").remove();
    const userSection = document.getElementById("user-section");
    userSection.classList.remove("hidden");
});
//# sourceMappingURL=app.js.map