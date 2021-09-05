const checkBtn = document.getElementById("check");
const removeBtn = document.getElementById("remove");
const form = document.getElementById("form");
const todos = document.getElementById("todos");
const clearBtn = document.getElementById("clear");

let todosList = [];

//Load event
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("todos")) return;

  const storageTodos = JSON.parse(localStorage.getItem("todos"));
  todosList = [...storageTodos];
  for (const todo of storageTodos) {
    renderToDOM(todo);
  }
});

//Form event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //creating the div
  const todoInput = document.querySelector('[name = "inputText"]');
  const todoData = {
    id: generateID(10),
    text: todoInput.value,
    checked: false,
  };

  renderToDOM(todoData);

  todosList.push(todoData);
  localStorage.setItem("todos", JSON.stringify(todosList));

  todoInput.value = "";
});

function renderToDOM(todoObject) {
  const todo = document.createElement("div");
  todo.innerHTML = `<div id='${todoObject.id}' class="todo ${
    todoObject.checked ? "checked" : ""
  }">
                      <button id="check" onclick="checkTodo('${
                        todoObject.id
                      }')" class="left-btn">
                      <i class="fas fa-check"></i>
                      </button>
                      <div class="todo-text">${todoObject.text}</div>
                      <button id="remove" onclick="removeTodo('${
                        todoObject.id
                      }')" class="right-btn">
                        <i class="fas fa-trash"></i>
                      </button>
                      </div> `;

  //appending the div
  todos.appendChild(todo);
}

//removeTodo
function removeTodo(id) {
  const index = todosList.findIndex((item) => item.id == id);
  todosList.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosList));

  const div = document.getElementById(id);
  div.classList.add("slideRight");
  setTimeout(() => {
    div.style.display = "none";
  }, 400);
}

//checkTodo
function checkTodo(id) {
  const index = todosList.findIndex((item) => item.id == id);
  todosList[index].checked = true;
  localStorage.setItem("todos", JSON.stringify(todosList));

  const div = document.getElementById(id);
  div.classList.add("checked");
}

//clear Button
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("todos");
  todos.innerHTML = "";
});

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
