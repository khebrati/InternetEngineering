document.addEventListener('DOMContentLoaded',function () {
   handleContentLoaded();
});

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

function createTaskElement(name) {
    const deleteEdit = createDeleteEdit();
    const checkbox = createCheckbox(name);
    const task = createDivWithClass('task')
    task.appendChild(checkbox)
    task.appendChild(deleteEdit)
    return task
}

function addTask(name) {
    const tasks = document.getElementById('tasks')
    const newTask = createTaskElement(name)
    tasks.appendChild(newTask)
}

function createCheckbox(name) {
    const checkBoxLabel =createDivWithClass('checkbox-label')
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.className = 'task-checkbox'
    const label = document.createElement('label')
    label.innerText = name
    checkBoxLabel.appendChild(input)
    checkBoxLabel.appendChild(label)
    return checkBoxLabel
}

function handleContentLoaded() {
    const addButton = document.getElementById('add-button')
    addButton.addEventListener('click',function () {
        const taskInput = document.getElementById('task-input');
        const text = taskInput.value;
        if(text){
            console.log(`input task name ${text}`);
            taskInput.value = "";
            addTask(text)
        }
    })
}
