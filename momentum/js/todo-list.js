const todoButton = document.querySelector('.todo-button'),
      todoContainer = document.querySelector('.todo-container'),
      addTaskButton = document.querySelector('.todo-task__add-button'),
      todoList =  document.querySelector('.todo-list');

let taskInput = document.getElementById('taskDesk');
let tasks = [];
let taskItems = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
};

function fillTodoList() {
    todoList.innerHTML = '';
    if (tasks.length) {
        tasks.forEach( function(task, index) {
            todoList.innerHTML += createTemplate(task, index);
        })
    };
    taskItems = document.querySelectorAll('.todo-list__item');
}

function createTemplate(task, index) {
    return ` 
        <li class="todo-list__item ${task.completed? 'done' : ''}">
            ${task.description}

            <div class="todo-list__item-control">
                <input class="todo-list__item-checkbox" type="checkbox" ${task.completed? 'checked' : ''} onclick="completeTask(${index})">
                <button class="todo-list__item-delete todo-icon" onclick="deleteTask(${index})"></button>
            </div>
        </li>
    `
}

function createTask() {
    let description = taskInput.value;
    let task = new Task(description);
    return task
}

function addTask() {
    let newTask = createTask();
    tasks.push(newTask);
    let index = tasks.length - 1;
    taskInput.value = '';
    todoList.innerHTML += createTemplate(newTask, index);
    taskItems = document.querySelectorAll('.todo-list__item');
}

function Task(description) {
    this.description = description;
    this.completed = false;
}

function completeTask(index) {
    tasks[index].completed = tasks[index].completed? false : true;
    taskItems[index].classList.toggle('done');
}

function deleteTask(index) {
    tasks.splice(index, 1);
    fillTodoList();
}


function showTodo() {
    todoContainer.classList.toggle('fadeIn');
}

todoButton.addEventListener('click', showTodo);

fillTodoList();
addTaskButton.addEventListener('click', addTask);
