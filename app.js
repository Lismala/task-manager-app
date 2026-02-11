// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const darkModeToggle = document.getElementById('darkModeToggle');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const activeTasksEl = document.getElementById('activeTasks');
const completedTasksEl = document.getElementById('completedTasks');

// State
let tasks = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadDarkMode();
    renderTasks();
    updateStats();
});

// Event Listeners
taskForm.addEventListener('submit', addTask);
darkModeToggle.addEventListener('click', toggleDarkMode);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Add Task
function addTask(e) {
    e.preventDefault();
    
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    updateStats();
    
    taskInput.value = '';
    taskInput.focus();
}