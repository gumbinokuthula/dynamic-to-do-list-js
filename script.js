document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load saved tasks from localStorage
    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create li element and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // On click, remove task
        removeBtn.onclick = () => {
            li.remove();
            saveTasks();
        };

        // Append remove button to li, then li to ul
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save updated tasks
        saveTasks();
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Save current task list to localStorage
    function saveTasks() {
        const tasks = [];
        const allTasks = document.querySelectorAll('#task-list li');
        allTasks.forEach(li => {
            // Remove the button text from li.textContent
            const taskOnly = li.firstChild.textContent.trim();
            tasks.push(taskOnly);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load saved tasks from localStorage
    function loadTasks() {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            const tasks = JSON.parse(saved);
            tasks.forEach(taskText => {
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
    }
});
