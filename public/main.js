document.querySelector("#to-do-form").addEventListener("submit", handleSubmit);

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
