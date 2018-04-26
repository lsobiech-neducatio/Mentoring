
let newTodo = document.getElementById("newTodo");
let list = document.getElementsByClassName("todoList")[0];
let allTodos = [];


var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:1337/todo', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if (req.status == 200) {
      const data = JSON.parse(req.responseText);
      console.dir(data); //createTodo
      data.forEach(item => create(item));

    } else {
      console.log("Błąd podczas ładowania strony\n"); //komunikat o błędzie dla użytkownika
    }
  }
};
req.send(null);


// // update data in json
// const dataUpdated = () => {
//   localStorage.setItem("todoList", JSON.stringify(data));
// };
//
// // add todoes to the array
// const addItem = ("li") => {
//   createTodo("li");
//
//   allTodos.push("li");
//   dataUpdated();
// };

// {item: '', done: false}
function create(todo) {
  // add a new todo to the list
  let item = document.createElement("li");
  list.appendChild(item);

  item.innerHTML = `<div class="container"><input type="checkbox"><p class="checkmark">
  ${todo.item}</p></div><div class="buttons"><button class="btn-remove"><i class="far fa-trash-alt"></i></button></div>`;

    const checkbox = item.getElementsByTagName('input')[0];
  // checkbox.addEventListener('change', (event) => {
    //zapisać na serwerze
  // });

  const removeButton = item.getElementsByClassName('btn-remove')[0];
  removeButton.addEventListener("click", () => {
    list.removeChild(item);
  });

  const editable = item.getElementsByTagName("p")[0];
  //const editButton = item.getElementsByClassName('btn-edit')[0];
  editable.addEventListener("mousedown", () => {
    console.log('click')

    editable.contentEditable = "true";
    editable.addEventListener("keydown", function(event) {

      if (event.keyCode === 13) {
        event.preventDefault();
        editable.contentEditable = "false";
      }
    });
  });

  // place a new todo on the top of the list
  list.insertBefore(item, list.childNodes[0]);
}


const createTodo = () => {

  // if input field is not empty, add the new todo to the list
  if (newTodo.value && newTodo.value.length) {

    create({item: newTodo.value, done: false});

    document.getElementById("newTodo").value = "";
  }
};


// add a new todo using "enter" button
newTodo.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    createTodo();
  }
});

// click on the "add" button
document.getElementById("add").addEventListener("click", createTodo);
