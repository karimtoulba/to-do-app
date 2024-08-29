document.querySelector("#to-do-form").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let taskValue = document.querySelector("#to-do-field").value;
  console.log(taskValue);
}
