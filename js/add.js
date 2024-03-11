function checkData(e) {
  e.preventDefault();

  let radios = document.getElementsByName("priority");
  let priority = "";

  let taskName = $("#taskName").value.trim();
  let taskDesc = $("#taskDesc").value.trim();
  let assignedTo = $("#assignedTo").value.trim();
  let deadline = $("#deadline").value.trim();

  radios.forEach((radio) => {
    if (radio.checked) {
      priority = radio.id;
    }
  });

  // Basic validations
  if (
    taskName === "" ||
    taskDesc === "" ||
    assignedTo === "" ||
    deadline === "" ||
    priority === ""
  ) {
    alert("Please fill out all fields.");
    return;
  }

  // Validate assignedTo field for English alphabets only
  if (!/^[a-zA-Z ]+$/.test(assignedTo)) {
    alert("Please enter valid name in the Assigned To field.");
    return;
  }

  // Create a new task object
  const newTask = {
    taskName: taskName,
    taskDesc: taskDesc,
    assignedTo: assignedTo,
    deadline: deadline,
    priority: priority,
  };

  TaskManager.addTask(newTask);
  window.location.href = "/getAll.html";
}

document.addEventListener("DOMContentLoaded", () => {
  $("#taskForm").addEventListener("submit", checkData);
});
