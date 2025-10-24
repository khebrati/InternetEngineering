document.addEventListener('DOMContentLoaded', function () {
    handleContentLoaded();
});

class Task {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

let lastId = 0;

function generateId() {
    return lastId++
}

const tasksList = []

function createDivWithClass(className) {
    const editButton = document.createElement('div')
    editButton.className = className
    return editButton
}

function createButtonWithClass(className) {
    const editButton = document.createElement('button')
    editButton.className = className
    return editButton
}


function createDeleteEdit() {
    const editButton = createButtonWithClass('edit-button');
    editButton.textContent = 'Edit'
    const deleteButton = createButtonWithClass('delete-button');
    const deleteEdit = createDivWithClass('delete-edit')
    deleteButton.textContent = 'Delete'
    deleteEdit.appendChild(editButton)
    deleteEdit.appendChild(deleteButton)
    return deleteEdit
}

function createTaskElement(task) {
    const deleteEdit = createDeleteEdit();
    const checkbox = createCheckbox(task.name);
    const taskDiv = createDivWithClass('task')
    taskDiv.dataset.id = task.id
    taskDiv.appendChild(checkbox)
    taskDiv.appendChild(deleteEdit)
    return taskDiv
}

function appendTaskInUi(task) {
    const tasks = document.getElementById('tasks')
    const newTaskDiv = createTaskElement(task)
    tasks.appendChild(newTaskDiv)
}

function createCheckbox(name) {
    const checkBoxLabel = createDivWithClass('checkbox-label')
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.className = 'task-checkbox'
    const label = document.createElement('label')
    label.innerText = name
    checkBoxLabel.appendChild(input)
    checkBoxLabel.appendChild(label)
    return checkBoxLabel
}

function refreshTasks() {
    const tasks = document.getElementById('tasks')
    tasks.innerHTML = ''
    tasksList.forEach(task =>
        appendTaskInUi(task)
    )
}

function handleAddEvent() {
    const addButton = document.getElementById('add-button')
    addButton.addEventListener('click', function () {
        const taskInput = document.getElementById('task-input');
        const text = taskInput.value;
        if (text) {
            console.log(`input task name ${text}`);
            taskInput.value = "";
            const task = new Task(generateId(), text)
            tasksList.push(task)
            refreshTasks()
        }
    })
}

function handleDeleteEvent() {
    const taskContainerDiv = document.getElementById('container')
    taskContainerDiv.addEventListener('click',function (event) {
        if(event.target.classList.contains('delete-button')){
            const deleteButton = event.target
            const taskDiv = deleteButton.closest('.task')
            const taskId = parseInt(taskDiv.dataset.id)
            const taskIndex = tasksList.findIndex(task => task.id === taskId)
            if(taskIndex !== -1){
                tasksList.splice(taskIndex,1)
            }
            refreshTasks()
        }
    })
}


function handleContentLoaded() {
    handleAddEvent();
    handleDeleteEvent()
}
