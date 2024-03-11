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

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  // Populate form fields with task data
  document.getElementById('taskName').value = queryParams.get('taskName') || '';
  document.getElementById('taskDesc').value = queryParams.get('taskDesc') || '';
  document.getElementById('assignedTo').value = queryParams.get('assignedTo') || '';
  document.getElementById('deadline').value = queryParams.get('deadline') || '';
  const priority = queryParams.get('priority') || '';
  // Check the radio button corresponding to the priority
  document.getElementById(priority).checked = true;
  
  // Add event listener for form submission
  document.getElementById('taskForm').addEventListener('submit', event => {
      event.preventDefault();
      // Retrieve task ID from URL parameters
      const taskId = parseInt(queryParams.get('taskId'));
      if (taskId) {
          // If taskId exists, update existing task
          const updatedTask = {
              taskId: taskId,
              taskName: document.getElementById('taskName').value.trim(),
              taskDesc: document.getElementById('taskDesc').value.trim(),
              assignedTo: document.getElementById('assignedTo').value.trim(),
              deadline: document.getElementById('deadline').value,
              priority: document.querySelector('input[name="priority"]:checked').id
          };
          TaskManager.updateTask(updatedTask);
      } else {
          // If taskId doesn't exist, add new task
          const newTask = {
              taskName: document.getElementById('taskName').value.trim(),
              taskDesc: document.getElementById('taskDesc').value.trim(),
              assignedTo: document.getElementById('assignedTo').value.trim(),
              deadline: document.getElementById('deadline').value,
              priority: document.querySelector('input[name="priority"]:checked').id
          };
          TaskManager.addTask(newTask);
      }
      // Redirect to getAll.html
      window.location.href = 'getAll.html';
  });
});


