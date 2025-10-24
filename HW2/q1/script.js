document.addEventListener('DOMContentLoaded', function () {
    handleContentLoaded();
});

class Task {
    constructor(id, name, isEditMode = false,isDone = false) {
        this.id = id
        this.name = name
        this.isEditMode = isEditMode
        this.isDone = isDone
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


function createDeleteEdit(isEditMode) {
    let buttonClass;
    let buttonText;
    if (isEditMode) {
        buttonText = 'Save'
        buttonClass = 'save-button'
    } else {
        buttonText = 'Edit'
        buttonClass = 'edit-button'
    }
    const editSaveButton = createButtonWithClass(buttonClass);
    editSaveButton.textContent = buttonText
    const deleteButton = createButtonWithClass('delete-button');
    deleteButton.textContent = 'Delete'
    const deleteEdit = createDivWithClass('delete-edit')
    deleteEdit.appendChild(editSaveButton)
    deleteEdit.appendChild(deleteButton)
    return deleteEdit
}

function createTaskElement(task) {
    const deleteEdit = createDeleteEdit(task.isEditMode);
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
    if (task.isEditMode) {
        const editInput = document.createElement('input')
        editInput.className = 'edit-input'
        editInput.id = task.id
        checkBoxLabel.appendChild(editInput)
    } else {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'task-checkbox'
        checkBoxLabel.appendChild(checkbox)
        checkbox.checked = task.isDone
        const labelElement = document.createElement('label')
        labelElement.innerText = task.name
        if(task.isDone){
            labelElement.classList.add('done')
        }else{
            labelElement.classList.remove('done')
        }
        checkBoxLabel.appendChild(labelElement)
    }
    return checkBoxLabel
}

function updateUI() {
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
            updateUI()
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
        updateUI()
    })
}


function handleClickTaskEvent(buttonClass, onReceiveId) {
    const taskContainerDiv = document.getElementById('container')
    taskContainerDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains(buttonClass)) {
            const button = event.target
            const taskDiv = button.closest('.task')
            const taskId = parseInt(taskDiv.dataset.id)
            onReceiveId(taskId)
        }
    })
}

function handleEditEvent() {
    handleClickTaskEvent('edit-button',function (taskId) {
        const task = tasksList.find(task => task.id === taskId)
        task.isEditMode = true
        updateUI()
    })
}

function handleEditSaved() {
    const taskContainerDiv = document.getElementById('container')
    taskContainerDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('save-button')) {
            const button = event.target
            const taskDiv = button.closest('.task')
            const taskId = parseInt(taskDiv.dataset.id)
            const task = tasksList.find(task => task.id === taskId)
            task.isEditMode = false
            const editInputField = taskDiv.querySelector('.edit-input')
            task.name = editInputField.value
            updateUI()
        }
    })
}

function handleDoneEvent() {
    handleClickTaskEvent('task-checkbox',function (taskId) {
        const task = tasksList.find(task => task.id === taskId)
        task.isDone = !task.isDone
        updateUI()
    })
}

function handleContentLoaded() {
    handleAddEvent();
    handleDeleteEvent()
    handleEditEvent();
    handleEditSaved()
    handleDoneEvent();
}
