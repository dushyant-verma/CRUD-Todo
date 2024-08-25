document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskText = document.createElement('p');
            taskText.classList.add('task-text');
            taskText.textContent = task.text;

            if (task.completed) {
                taskItem.classList.add('task-completed');
            }

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const editButton = document.createElement('button');
            editButton.innerHTML = '✏️';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => editTask(index));

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '🗑️';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => deleteTask(index));

            const toggleButton = document.createElement('button');
            toggleButton.innerHTML = task.completed ? '🔄' : '✔️';
            toggleButton.classList.add('toggle');
            toggleButton.addEventListener('click', () => toggleTask(index));

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);
            taskActions.appendChild(toggleButton);

            taskItem.appendChild(taskText);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }

    // Function to edit a task
    function editTask(index) {
        const newTaskText = prompt('Edit your task:', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            tasks[index].text = newTaskText.trim();
            renderTasks();
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
