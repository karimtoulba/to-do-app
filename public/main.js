document.querySelector("#to-do-form").addEventListener("submit", handleSubmit);

// Adding new task
async function handleSubmit(event) {
  event.preventDefault();

  let taskValue = document.querySelector("#to-do-field").value;
  let taskForm = document.querySelector("#to-do-form");
  let taskField = document.querySelector("#to-do-field");

  let taskLink = await fetch("/.netlify/functions/main", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: taskValue }),
  });

  let taskJson = await taskLink.json();

  if (taskJson.success) {
    taskForm.reset();
    taskField.focus();
  } else {
    alert("Task field is blank. Please enter text.");
    taskField.focus();
  }
  listTasks();
}

// List all tasks in the database
async function listTasks() {
  let tasksLink = await fetch("/.netlify/functions/tasks");
  let tasksJson = await tasksLink.json();

  // Server Side Rendering
  // document.querySelector("#list-tasks").innerHTML = tasksJson.tasks;

  // Client Side Rendering
  const template = document.querySelector("#single-task-template");
  const wrapper = document.createDocumentFragment();

  tasksJson.tasks.forEach((task) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("#task-entry").textContent = task.text;
    wrapper.appendChild(clone);
  });

  document.querySelector("#list-tasks").textContent = "";
  document.querySelector("#list-tasks").appendChild(wrapper);
}

listTasks();
