document.addEventListener('DOMContentLoaded',function () {
   handleContentLoaded();
});

function handleContentLoaded() {
    const addButton = document.getElementById('add-button')
    addButton.addEventListener('click',function () {
        const taskInput = document.getElementById('task-input');
        const text = taskInput.value;
        if(text){
            console.log(text);
            taskInput.value = "";
        }
    })
}
