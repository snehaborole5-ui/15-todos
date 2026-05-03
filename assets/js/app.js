const cl = console.log;

const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');
const todoItemControl = document.getElementById('todoItem');
const addTodoBtn = document.getElementById('addTodoBtn');
const updateTodoBtn = document.getElementById('updateTodoBtn');

let EDIT_ID = null;

// Schema
let todoArr =[ 
    { 
        todoId:'asdf123-123AS-21asd3',
        todoItem:'CSS'
    },
    { 
        todoId:'sdfg-123AS-21asd3',
        todoItem:'JS and ES6'
    },
    { 
        todoId:'zasasd23-123AS-21asd3',
        todoItem:'FLEX'
    },
] 

// REMOVE
function onRemove(ele){
    let REMOVE_ID = ele.closest('li').id;

    let getIndex = todoArr.findIndex(todo =>{
        return todo.todoId === REMOVE_ID
    });

    let removedTodo = todoArr.splice(getIndex,1);
    ele.closest('li').remove();

    Swal.fire({
        title: `The Todo item ${removedTodo[0].todoItem} removed successfully !!!`,
        timer: 3000,
        icon: 'success'
    });
}

// EDIT
function onEdit(ele){
    EDIT_ID = ele.closest('li').id;

    let EDIT_OBJ = todoArr.find(todo =>{
        return todo.todoId === EDIT_ID
    });

    todoItemControl.value = EDIT_OBJ.todoItem;

    addTodoBtn.classList.add('d-none');
    updateTodoBtn.classList.remove('d-none');
}

// TEMPLATE
function temmplating (arr){
    let result = '';
    arr.forEach(obj => {
        result += `<li class="list-group-item d-flex justify-content-between" id="${obj.todoId}">
                        <strong>${obj.todoItem}</strong>
                        <div>
                            <i class="fa-solid fa-pen-to-square fa-2x text-primary" role="button" onclick="onEdit(this)"></i>
                            <i class="fa-solid fa-trash fa-2x text-danger" role="button" onclick="onRemove(this)"></i>   
                        </div>
                   </li>`;
    });
    todoList.innerHTML = result;
}

temmplating(todoArr)

// ADD
function onTodoSubmit(eve){
    eve.preventDefault();

    let newTodo = {
        todoItem : todoItemControl.value,
        todoId : Date.now().toString()
    }

    todoArr.push(newTodo);

    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.id = newTodo.todoId;

    li.innerHTML = `<strong>${newTodo.todoItem}</strong>
                    <div>
                        <i class="fa-solid fa-pen-to-square fa-2x text-primary" role="button" onclick="onEdit(this)"></i>
                        <i class="fa-solid fa-trash fa-2x text-danger" role="button" onclick="onRemove(this)"></i>   
                    </div>`

    todoList.append(li);
    todoForm.reset();

    Swal.fire({
        title: `The new Todo ${newTodo.todoItem} added successfully !!!`,
        timer: 3000,
        icon: 'success'
    });
}

// UPDATE
function onTodoUpdate(){
    let updatedValue = todoItemControl.value;

    let getIndex = todoArr.findIndex(todo =>{
        return todo.todoId === EDIT_ID
    });

    // update array
    todoArr[getIndex].todoItem = updatedValue;

    // update UI
    let li = document.getElementById(EDIT_ID);
    li.querySelector('strong').innerText = updatedValue;

    // reset
    todoForm.reset();
    addTodoBtn.classList.remove('d-none');
    updateTodoBtn.classList.add('d-none');

    Swal.fire({
        title: `Todo updated successfully !!!`,
        timer: 3000,
        icon: 'success'
    });
}

// EVENTS
todoForm.addEventListener('submit', onTodoSubmit);
updateTodoBtn.addEventListener('click', onTodoUpdate);