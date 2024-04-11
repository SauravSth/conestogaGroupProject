document.addEventListener('DOMContentLoaded', () => {
	$('#search').addEventListener('click', searchTasks)
	// displayTasks()
	getTask()
})

function deleteTask(event, taskId) {
	event.preventDefault()
	let confirmVal = confirm('Are you sure you want to delete this task?')
	if (confirmVal) {
		TaskManager.deleteTask(taskId)
	}
	displayTasks()
}

function getTask() {
	TaskManager.getTasks()
}

function editTask(event, taskId) {
	event.preventDefault()
	// Retrieve task data from local storage
	const task = TaskManager.findTaskById(taskId)
	if (task) {
		// Encode task data as URL parameters
		const queryParams = new URLSearchParams()
		queryParams.set('taskId', taskId)
		queryParams.set('taskName', task.taskName)
		queryParams.set('taskDesc', task.taskDesc)
		queryParams.set('assignedTo', task.assignedTo)
		queryParams.set('deadline', task.deadline)
		queryParams.set('priority', task.priority)
		// Redirect to index.html with task data as URL parameters
		window.location.href = `index.html?${queryParams.toString()}`
	}
}

function searchTasks(event) {
	event.preventDefault()
	const keyword = $('#searchKeyword').value.trim()
	const matchedTasks = TaskManager.searchTasks(keyword)
	displayTasks(matchedTasks)
}
