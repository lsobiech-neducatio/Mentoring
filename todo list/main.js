
let newTodo = document.getElementById('newTodo');
let list = document.getElementsByClassName('todoList')[0];

// GET (pobieranie całej listy)
fetch(`http://localhost:1337/todo/`)
  .then(list => list.json().then(result => result.forEach(item => create(item))))
  .catch(err => console.log(err))


// todo jest w postaci: {item: '', done: false, id: 0}
function create(todo) {
  // add a new todo to the list
  let item = document.createElement('li');
  item.setAttribute('data-id', todo.id);
  list.appendChild(item);

  let id = `check-${todo.id}`;
  // pojedynczy todo
  item.innerHTML = `<div class="container"><input type="checkbox" ${todo.done ? 'checked="checked"' : ''} class="check" id="${id}"/><label for="${id}"></label>
  <input type="text" class="todo-txt" value="${todo.item}"></div><div class="buttons"><button class="btn-remove"><i class="far fa-trash-alt"></i></button></div>`;

  const checkbox = item.getElementsByTagName('input')[0];
  const text = item.getElementsByTagName('input')[1];

  // edit a todo
  const editFunction = (event) => {

    fetch(`http://localhost:1337/todo/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({item: text.value, done: checkbox.checked})
    })
    .catch(err => console.log(err))
  };

  checkbox.addEventListener('change', editFunction);
  text.addEventListener('change', editFunction);

// remove a todo
  const removeButton = item.getElementsByClassName('btn-remove')[0];
  removeButton.addEventListener('click', () => {
    list.removeChild(item);
    let id = item.getAttribute('data-id');

    fetch(`http://localhost:1337/todo/${id}`, {
      method: 'DELETE',
    })
    .catch(err => console.log(err))
  });

  // place a new todo on the top of the list
  list.insertBefore(item, list.childNodes[0]);

}

// create todo
const createTodo = () => {

  // if input field is not empty, add the new todo to the list
  if (newTodo.value && newTodo.value.length) {

    fetch(`http://localhost:1337/todo/`, {
      method: 'POST',
      body: JSON.stringify({item: newTodo.value, done: false})
    })
      .then(todo => todo.json().then(result => create(result)))
      .catch(err => console.log(err))

    document.getElementById('newTodo').value = '';
  }
};


// add a new todo using 'enter' button
newTodo.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    createTodo();
  }
});


// click on the 'add' button
document.getElementById('add').addEventListener('click', createTodo);
