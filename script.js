const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// تحميل المهام المحفوظة
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

  // زر الحذف
const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
deleteBtn.onclick = (e) => {
  e.stopPropagation(); // عشان الضغط على الزر ما يحدد المهمة
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};


    // عند الضغط على المهمة ← انجزت
    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
