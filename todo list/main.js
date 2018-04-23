
let newTodo = document.getElementById("newTodo");
let allTodos = [];

// click on the "add" button
document.getElementById("add").addEventListener("click", addNewTodo);
document.getElementById("add").removeEventListener("click", addNewTodo);
function addNewTodo() {

  // if input field is not empty, add the new todo to the list
  if (newTodo.value && newTodo.value.length) {
    let list = document.getElementsByClassName("todoList")[0];

    // add a new todo to the list
    let item = document.createElement("li");
    list.appendChild(item);
    item.innerText = newTodo.value;

    // const buttons = document.createElement("buttons");
    // item.add(buttons);

    // edit a todo
    document.getElementsByTagName("p").contentEditable = "true";

    allTodos.push("li");

    // place a new todo on the top of the list
    list.insertBefore(item, list.childNodes[0]);
  }

  document.getElementById("newTodo").value = "";
}

// function removeItem() {
//   const item = document.getElementsByTagName("li");
//   let list = document.getElementsByClassName("todoList");
//
//   list.removeChild(item);
// }
//
//
// document.getElementById("remove").addEventListener("click", function() {
//   removeItem();
// });

//   // edit a todo
// function editable() {
//   document.getElementsByTagName("p").contentEditable = "true";
// }

// add a new todo using "enter" button
document.getElementById("newTodo").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addNewTodo();
  }
});
