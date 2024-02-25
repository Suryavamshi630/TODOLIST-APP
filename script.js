let tasks = [];
let undoStack = [];

function addTask() {
  const taskInput = document.getElementById("taskInput").value;
  const prioritySelect = document.getElementById("prioritySelect").value;
  const categorySelect = document.getElementById("categorySelect").value;
  const dueDateInput = document.getElementById("dueDate").value;

  if (!taskInput) {
    alert(" surya are you kidding Please enter task..");
    return;
  }

  const task = {
    id: Date.now(),
    task: taskInput,
    priority: prioritySelect,
    category: categorySelect,
    dueDate: dueDateInput,
    completed: false
  };

  tasks.push(task);
  undoStack.push({ action: "add", task });

  renderTasks();
}

function removeTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    undoStack.push({ action: "remove", task: tasks[index] });
    tasks.splice(index, 1);
    renderTasks();
  }
}

function toggleComplete(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
}

function undo() {
  const lastAction = undoStack.pop();
  if (lastAction) {
    if (lastAction.action === "add") {
      const index = tasks.findIndex(task => task.id === lastAction.task.id);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    } else if (lastAction.action === "remove") {
      tasks.push(lastAction.task);
    }
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task ${task.completed ? 'completed' : ''}">${task.task}</span>
      <span class="priority ${task.priority}">${task.priority}</span>
      <span class="category">${task.category}</span>
      <span class="due-date">${task.dueDate}</span>
      <span class="actions">
        <button onclick="removeTask(${task.id})">Delete</button>
        <button onclick="toggleComplete(${task.id})">Toggle Complete</button>
      </span>
    `;
    taskList.appendChild(li);
  });
}
