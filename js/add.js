// function to display success message after the succesful submit
function displaySuccessMessage(message) {
  const successMessage = document.createElement("div");
  successMessage.textContent = message;
  successMessage.className = "success-message";

  const formElement = document.getElementById("taskForm");
  formElement.appendChild(successMessage);

  // Clear the success message after a certain time
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

function checkData(e) {
  e.preventDefault();

  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

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
  const errors = [];

  if (taskName === "") {
    errors.push({ field: "taskName", message: "Task Name is required." });
  }
  if (taskDesc === "") {
    errors.push({
      field: "taskDesc",
      message: "Task Description is required.",
    });
  }
  if (deadline === "") {
    errors.push({ field: "deadline", message: "Deadline is required." });
  }
  if (priority === "") {
    errors.push({ field: "priority", message: "Priority is required." });
  }
  if (!/^[a-zA-Z ]+$/.test(assignedTo) || assignedTo === "") {
    errors.push({
      field: "assignedTo",
      message: "Please enter valid name in the Assigned To field.",
    });
  }

  // Display error messages on the form
  errors.forEach((error) => {
    const inputField = document.getElementById(error.field);
    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.textContent = error.message;
    inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);
  });

  if (errors.length > 0) {
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

  document.getElementById("taskForm").reset();

  // Display success message
  displaySuccessMessage("Task added successfully");

  // Redirect to getAll.html after a short delay
  setTimeout(() => {
    window.location.href = "/getAll.html";
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("taskForm").addEventListener("submit", checkData);
});
