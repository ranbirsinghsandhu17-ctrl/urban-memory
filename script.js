let subjects = [];
let tasks = [];

// Add Subject
function addSubject() {
  const input = document.getElementById("subjectInput");
  const name = input.value.trim();

  if (name === "") {
    alert("Please enter a subject.");
    return;
  }

  subjects.push(name);
  input.value = "";

  displaySubjects();
  updateStats();
}

// Display Subjects
function displaySubjects() {
  const list = document.getElementById("subjectList");
  list.innerHTML = "";

  subjects.forEach((subject, index) => {
    list.innerHTML += `
      <div class="subject">
        <h3>📚 ${subject}</h3>
        <p>Subject ${index + 1}</p>
      </div>
    `;
  });
}

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();

  if (title === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({
    title: title,
    completed: false
  });

  input.value = "";

  displayTasks();
  updateStats();
}

// Display Tasks
function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <div class="task ${task.completed ? "completed" : ""}">
        <span>${task.title}</span>
        <button onclick="completeTask(${index})">
          ${task.completed ? "Completed" : "Complete"}
        </button>
      </div>
    `;
  });
}

// Complete Task
function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;

  displayTasks();
  updateStats();
}

// Update Dashboard
function updateStats() {
  document.getElementById("subjectCount").textContent = subjects.length;
  document.getElementById("taskCount").textContent = tasks.length;

  const completed = tasks.filter(task => task.completed).length;
  document.getElementById("completedCount").textContent = completed;

  let percentage = 0;

  if (tasks.length > 0) {
    percentage = Math.round((completed / tasks.length) * 100);
  }

  document.getElementById("progressFill").style.width = percentage + "%";
  document.getElementById("progressText").textContent = percentage + "% completed";
}

// Start Studying
function startStudying() {
  alert("Study session started! 📚");
}

// Initial display
displaySubjects();
displayTasks();
updateStats();
