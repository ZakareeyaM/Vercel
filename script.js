let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        updateStats();
        return;
    }

    taskList.innerHTML = tasks.map((task, index) => `
        <li class="task ${task.completed ? 'completed' : ''}">
            <span class="task-text" onclick="toggleTask(${index})">
                ${task.completed ? '✓' : '○'} ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </li>
    `).join('');

    updateStats();
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = '';
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;

    document.getElementById('stats').innerHTML = 
        total > 0 ? `${completed} completed • ${remaining} remaining • ${total} total` : '';
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks when page loads
renderTasks();