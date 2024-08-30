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
}

// List all tasks in the database
async function listTasks() {
  let tasksLink = await fetch("/.netlify/functions/tasks");
  let tasksJson = await tasksLink.json();
  console.log(tasksJson.tasks);

  // Client Side Rendering
}

listTasks();
