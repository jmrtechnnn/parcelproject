let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 // seob Dom elemendid
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// laeb andmed 
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="task-time">${task.time}</span>
            <button class="delete-btn">Kustuta</button>
        `;
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        taskList.appendChild(li);
    });
    saveTasks();
}
// lisab uue ülesande ja eesti aja
function addTask(text) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}.${minutes}`;
    tasks.push({ text, time });
    renderTasks();
}
// kustutab ülesanne
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
// salvestab ülesanded browserisse
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// vormis uue ülesande lisamiseks
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
    }
});

//start
renderTasks();