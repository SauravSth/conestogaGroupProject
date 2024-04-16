document.addEventListener('DOMContentLoaded', () => {
	$('#search').addEventListener('click', searchTasks);
	fetchAndDisplayTasks();
  });
  
  function deleteTask(event, taskId) {
	event.preventDefault();
	let confirmVal = confirm('Are you sure you want to delete this task?');
	if (confirmVal) {
	  TaskManager.deleteTask(taskId).then(() => {
		fetchAndDisplayTasks();
	  });
	}
  }
  
  function editTask(event, taskId) {
	event.preventDefault();
	TaskManager.findTaskById(taskId)
	  .then((task) => {
		if (task) {
		  const queryParams = new URLSearchParams();
		  queryParams.set('taskId', taskId);
		  queryParams.set('taskName', task.taskName);
		  queryParams.set('taskDesc', task.taskDesc);
		  queryParams.set('assignedTo', task.assignedTo);
		  queryParams.set('deadline', task.deadline);
		  queryParams.set('priority', task.priority);
		  window.location.href = `index.html?${queryParams.toString()}`;
		}
	  })
	  .catch((error) => console.error(error));
  }
  
  function searchTasks(event) {
	event.preventDefault();
	const keyword = $('#searchKeyword').value.trim();
	TaskManager.searchTasks(keyword).then((matchedTasks) => {
	  displayTasks(matchedTasks);
	});
  }
  
  function fetchAndDisplayTasks() {
	TaskManager.getTasks().then((tasks) => {
	  displayTasks(tasks);
	});
  }
  
  function displayTasks(tasks = []) {
	const tasksContainer = document.getElementById('tasks-container');
	tasksContainer.innerHTML = '';
  
	tasks.forEach((task) => {
	  const taskContainer = document.createElement('div');
	  taskContainer.className = 'task-container';
  
	  const taskDetails = document.createElement('div');
	  taskDetails.className = 'task-details';
  
	  const taskTitle = document.createElement('div');
	  taskTitle.className = 'task-title';
	  taskTitle.style.backgroundColor = getPriorityColor(task.priority, true);
  
	  const taskName = document.createElement('h3');
	  taskName.textContent = task.taskName;
  
	  const taskNavRight = document.createElement('div');
	  taskNavRight.className = 'task-nav-right';
  
	  const taskDue = document.createElement('h4');
	  taskDue.textContent = `Due: ${task.deadline}`;
  
	  const taskPriority = document.createElement('h4');
	  taskPriority.textContent = `Priority: ${task.priority}`;
  
	  taskNavRight.appendChild(taskDue);
	  taskNavRight.appendChild(taskPriority);
	  taskTitle.appendChild(taskName);
	  taskTitle.appendChild(taskNavRight);
  
	  const taskDesc = document.createElement('div');
	  taskDesc.className = 'task-desc';
	  taskDesc.style.backgroundColor = getPriorityColor(task.priority, false);
  
	  const taskDescText = document.createElement('p');
	  taskDescText.textContent = task.taskDesc;
	  taskDesc.appendChild(taskDescText);
  
	  taskDetails.appendChild(taskTitle);
	  taskDetails.appendChild(taskDesc);
  
	  const taskOptions = document.createElement('div');
	  taskOptions.className = 'task-options';
	  taskOptions.style.backgroundColor = getPriorityColor(task.priority, true);
  
	  const editDiv = document.createElement('div');
	  editDiv.className = 'edit';
  
	  const editLink = document.createElement('a');
	  editLink.href = '#';
	  editLink.addEventListener('click', (event) => editTask(event, task.taskId));
  
	  const editIcon = document.createElement('img');
	  editIcon.src = './images/pen-to-square-solid.svg';
	  editIcon.alt = 'Edit Icon';
	  editLink.appendChild(editIcon);
	  editDiv.appendChild(editLink);
  
	  const deleteDiv = document.createElement('div');
	  deleteDiv.className = 'delete';
  
	  const deleteLink = document.createElement('a');
	  deleteLink.href = '#';
	  deleteLink.addEventListener('click', (event) => deleteTask(event, task.taskId));
  
	  const deleteIcon = document.createElement('img');
	  deleteIcon.src = './images/trash-solid.svg';
	  deleteIcon.alt = 'Delete Icon';
	  deleteLink.appendChild(deleteIcon);
	  deleteDiv.appendChild(deleteLink);
  
	  const assignedTo = document.createElement('div');
	  assignedTo.className = 'assigned-to';
	  assignedTo.textContent = `Assigned To: ${task.assignedTo}`;
  
	  taskOptions.appendChild(editDiv);
	  taskOptions.appendChild(deleteDiv);
	  taskOptions.appendChild(assignedTo);
  
	  taskContainer.appendChild(taskDetails);
	  taskContainer.appendChild(taskOptions);
  
	  tasksContainer.appendChild(taskContainer);
	});
  }
  
  function getPriorityColor(priority, isDark) {
	switch (priority) {
	  case 'low':
		return isDark ? 'rgb(67, 132, 1)' : 'rgb(95, 176, 15)';
	  case 'medium':
		return isDark ? '#CC7722' : '#c8903c';
	  case 'high':
		return isDark ? '#800000' : '#990000';
	  default:
		return 'transparent';
	}
  }