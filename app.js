const checkBtn = document.getElementById("check");
const removeBtn = document.getElementById("remove");
const form = document.getElementById("form");
const todos = document.getElementById("todos");

let todosList = [];

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("todos")) return;

  const storageTodos = JSON.parse(localStorage.getItem("todos"));
  todosList = [...storageTodos];
  for (const todo of storageTodos) {
    renderToDOM(todo.text);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //creating the div
  const todoInput = document.querySelector('[name = "inputText"]');
  const todoData = {
    id: generateID(10),
    text: todoInput.value,
    checked: false,
  };

  renderToDOM(todoInput.value);

  todosList.push(todoData);
  localStorage.setItem("todos", JSON.stringify(todosList));
});

function renderToDOM(todoText) {
  const todo = document.createElement("div");
  todo.innerHTML = `<div class="todo">
                      <button id="check" class="left-btn">
                      <i class="fas fa-check"></i>
                      </button>
                      <div class="todo-text">${todoText}</div>
                      <button id="remove" class="right-btn">
                        <i class="fas fa-trash"></i>
                      </button>
                      </div> `;

  //appending the div
  todos.appendChild(todo);
}

function generateID(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
