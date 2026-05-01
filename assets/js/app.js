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


const cl = console.log;
const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');
const todoItemControl = document.getElementById('todoItem');

const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}
function temmplating (arr){
    let result = '';
    arr.forEach(obj => {
        result += `<li class="list-group-item d-flex justify-content-between" id="todoItem">
                           <strong>${obj.todoItem}</strong> 
                         <div>
                             <i class="fa-solid fa-pen-to-square fa-2x  text-primary"></i>
                             <i class="fa-solid fa-trash fa-2x text-danger "></i>   
                         </div>
                        </li> 
        `
    });
    todoList.innerHTML = result;
}

temmplating(todoArr)

function onTodoSubmit(eve){
    eve.preventDefault();
    let newTodo = {
        todoItem : todoItemControl.value,
        todoId : Date.now.toString()
    }
    todoArr.push(newTodo);

    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';

    li.innerHTML = `<strong>${newTodo.todoItem}</strong>
                    <div>
                        <i class="fa-solid fa-pen-to-square fa-2x  text-primary"></i>
                        <i class="fa-solid fa-trash fa-2x text-danger "></i>   
                    </div>`

    todoList.append(li)
    todoForm.reset();
}

todoForm.addEventListener('submit', onTodoSubmit)