const loginBtn: Element = document.getElementById("login")!;
const addToListBtn: Element = document.getElementById("adduser")!;
let addToListInput: Element = document.getElementById("adduserinput")!;
const userLoggedIn: boolean = false;
interface ITodolist {
  todo: string[];
  addToList(text: string): void;
  editItem(id: number, text: string): void;
  deleteItem(id: number): void;
}

let todoList: ITodolist = {
  todo: [],
  addToList(text: string) {
    this.todo.push(text);
  },
  editItem(id: number, text: string) {
    this.todo.map((item: string, index: number) => (id == index ? text : item));
  },
  deleteItem(id: number) {
    this.todo = this.todo.filter((_item: string, index: number) => id != index);
  },
};

function renderList(todoList: string[]): void {
  const renderedtodo = todoList.map((item: string, index: number) => {
    return `<div id="${index}" class="todo">
        <p id=${index}text>${item}</p>
        <div>
          <button id="${index}done">Done</button>
          <button id="${index}edit">Edit</button>
          <button onclick="deleteEvent();">Delete</button>
        </div>
      </div>`;
  });
  document.getElementById("list")!.innerHTML = renderedtodo.join(" ");
}

const deleteEvent = (button: HTMLButtonElement) => {
  const id: number = +button.parentElement!.parentElement!.id;
  todoList.deleteItem(id);
  renderList(todoList.todo);
};

const editHandler = (button: HTMLButtonElement) => {};

addToListBtn.addEventListener("click", function () {
  if (addToListInput.nodeValue == "") return;
  else {
    todoList.addToList(addToListInput.nodeValue!);
    renderList(todoList.todo);
    addToListInput.nodeValue = "";
  }
});
