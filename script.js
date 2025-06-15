// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasks();

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task when clicked
        removeBtn.onclick = () => {
            li.remove();
            saveTasks();
        };

        // Add button to the list item
        li.appendChild(removeBtn);

        // Add list item to the task list
        taskList.appendChild(li);

        // Clear the input
        taskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            removeBtn.onclick = () => {
                li.remove();
                saveTasks();
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
