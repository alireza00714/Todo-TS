const loginBtn: HTMLButtonElement = document.getElementById("login")! as HTMLButtonElement;
const addToListBtn: HTMLButtonElement = document.getElementById("adduser")! as HTMLButtonElement;
let addToListInput: HTMLInputElement = document.getElementById("adduserinput")! as HTMLInputElement;
let userLoggedIn: boolean = false;

interface ITodo {
  text: string;
  done: boolean;
}

interface ITodolist {
  todo: ITodo[];
  addToList(text: string): void;
  editItem(id: number, text: string): void;
  deleteItem(id: number): void;
}

let todoList: ITodolist = {
  todo: [],
  addToList(text: string) {
    this.todo.push({ text: text, done: false });
  },
  editItem(id: number, text: string) {
    this.todo = this.todo.map((item: ITodo, index: number) => (id == index ? { text: text, done: false } : item));
  },
  deleteItem(id: number) {
    this.todo = this.todo.filter((_item: ITodo, index: number) => id != index);
  },
};

function renderList(todoList: ITodo[]): void {
  const renderedtodo = todoList.map((item: ITodo, index: number) => {
    return `<div id="${index}" class="todo">
        <p id=${index}text class="todo-text">${item}</p>
        <div>
          <button onclick="doneEvent(this);" id="${index}done">Done</button>
          <button onclick="editHandler(this);" id="${index}edit">Edit</button>
          <button onclick="deleteEvent(this);">Delete</button>
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

const editHandler = (button: HTMLButtonElement) => {
  const twoParentDiv = button.parentElement!.parentElement! as HTMLDivElement;
  for (let i = 0; i < twoParentDiv.children.length; i++) {
    twoParentDiv.children[i].classList.add("hidden");
  }
  twoParentDiv.innerHTML = `
  <input id="edit-input" type="text" value="${todoList.todo[+twoParentDiv.id]}" />
  <button onclick="editEvent(this);">Edit</button>
  `;
};

const editEvent = (button: HTMLButtonElement) => {
  let editInput: HTMLInputElement = document.getElementById("edit-input")! as HTMLInputElement;
  todoList.editItem(+button.parentElement!.id, editInput.value);
  editInput.value = "";
  renderList(todoList.todo);
};

const addEvent = () => {
  if (addToListInput.value == "") return;
  else {
    todoList.addToList(addToListInput.value!);
    renderList(todoList.todo);
    addToListInput.value = "";
  }
};
