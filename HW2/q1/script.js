document.addEventListener('DOMContentLoaded', function () {
    handleContentLoaded();
});

class Task {
    constructor(id, name,isEditMode = false) {
        this.id = id
        this.name = name
        this.isEditMode = isEditMode
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
    const checkbox = createCheckbox(task);
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

function createCheckbox(task) {
    const checkBoxLabel = createDivWithClass('checkbox-label')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'task-checkbox'
    checkBoxLabel.appendChild(checkbox)
    if(task.isEditMode){
        const editInput = document.createElement('input')
        editInput.className = 'edit-input'
        editInput.id = task.id
        checkBoxLabel.appendChild(editInput)
    }else{
        const label = document.createElement('label')
        label.innerText =task.name
        checkBoxLabel.appendChild(label)
    }
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


function removeTaskWithId(taskId) {
    const taskIndex = tasksList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasksList.splice(taskIndex, 1)
    }
}

function handleDeleteEvent() {
    handleClickTaskEvent('delete-button', function (taskId) {
        removeTaskWithId(taskId);
        refreshTasks()
    })
}


function handleClickTaskEvent(buttonClass, onReceiveId) {
    const taskContainerDiv = document.getElementById('container')
    taskContainerDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains(buttonClass)) {
            const deleteButton = event.target
            const taskDiv = deleteButton.closest('.task')
            const taskId = parseInt(taskDiv.dataset.id)
            onReceiveId(taskId)
        }
    })
}

function handleEditEvent() {
    handleClickTaskEvent('edit-button',function (taskId) {
        const task = tasksList.find(task => task.id === taskId)
        console.log(`clicked on ${task.id}`)
        task.isEditMode = true
        console.log(`edit mode: ${task.isEditMode}`)
        refreshTasks()
    })
}

function handleContentLoaded() {
    handleAddEvent();
    handleDeleteEvent()
    handleEditEvent();
}
