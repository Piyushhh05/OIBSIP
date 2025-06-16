let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("prioritySelect").value;
  const text = input.value.trim();
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");

// Load saved theme

// Event listener
themeToggle.addEventListener("change", () => {
  applyTheme(themeToggle.checked);
});


  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text,
    priority,
    status: "pending",
    createdAt: new Date(),
    completedAt: null
  });

  input.value = "";
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById("pendingTasks");
  const completedList = document.getElementById("completedTasks");
  const filter = document.getElementById("filterPriority").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks
    .filter(task => (filter === "All" || task.priority === filter))
    .filter(task => task.text.toLowerCase().includes(search))
    .forEach(task => {
      const li = document.createElement("li");
      li.className = `task priority-${task.priority.toLowerCase()} ${task.status === "completed" ? "completed" : ""}`;

      const content = document.createElement("span");
      content.innerHTML = `
        <strong>[${task.priority}]</strong> ${task.text}
        <small>Added: ${task.createdAt.toLocaleString()}</small>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.onclick = () => editTask(task.id);

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.onclick = () => deleteTask(task.id);

      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = task.status === "pending" ? "✅" : "↩️";
      toggleBtn.onclick = () => toggleComplete(task.id);

      li.appendChild(content);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      li.appendChild(toggleBtn);

      if (task.status === "pending") {
        pendingList.appendChild(li);
      } else {
        content.innerHTML += `<small>Completed: ${task.completedAt.toLocaleString()}</small>`;
        completedList.appendChild(li);
      }
    });
}


function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit Task:", task.text);
  const newPriority = prompt("Edit Priority (High, Medium, Low):", task.priority);

  if (newText && newPriority && ["High", "Medium", "Low"].includes(newPriority)) {
    task.text = newText.trim();
    task.priority = newPriority;
    renderTasks();
  }
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.status = task.status === "pending" ? "completed" : "pending";
  task.completedAt = task.status === "completed" ? new Date() : null;
  renderTasks();
}

function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? "dark" : "light";
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.checked = isDark;
  themeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  themeToggle.checked = isDark;
  themeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
}

// Initialize
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

// Save user choice on toggle
themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});
