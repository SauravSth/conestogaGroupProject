// function to display success message after the successful submit
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

function validateForm() {
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
      message: "Please enter a valid name in the Assigned To field.",
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

  return errors.length == 0;
}

// Add event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  $("#taskForm").addEventListener("submit", submitForm);
  fillForm();
});

// fill form for updating task
function fillForm() {
  // Parse URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const taskId = parseInt(queryParams.get('taskId'));
  if (!taskId) {
    return;
  }
  // Populate form fields with task data
  $('#taskName').value = queryParams.get('taskName') || '';
  $('#taskDesc').value = queryParams.get('taskDesc') || '';
  $('#assignedTo').value = queryParams.get('assignedTo') || '';
  $('#deadline').value = queryParams.get('deadline') || '';
  const priority = queryParams.get('priority') || '';
  // Check the radio button corresponding to the priority
  document.getElementById(priority).checked = true;
}

function submitForm(e) {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }

  // Parse URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  // Retrieve task ID from URL parameters
  const taskId = parseInt(queryParams.get('taskId'));

  const task = {
    taskName: $('#taskName').value.trim(),
    taskDesc: $('#taskDesc').value.trim(),
    assignedTo: $('#assignedTo').value.trim(),
    deadline: $('#deadline').value,
    priority: document.querySelector('input[name="priority"]:checked').id
  };

  if (taskId) {
    // If taskId exists, update existing task
    task.taskId = taskId; 
    TaskManager.updateTask(task);
  } else {
    // If taskId doesn't exist, add new task
    TaskManager.addTask(task);
  }

  $("#taskForm").reset();
  // Display success message
  const operation = taskId ? "updated" : "added";
  displaySuccessMessage("Task " + operation + " successfully");

  // Redirect to getAll.html after a short delay
  setTimeout(() => {
    window.location.href = "/getAll.html";
  }, 1000);
}


