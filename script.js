const $ = (selector) => document.querySelector(selector)

function checkData(e) {
	e.preventDefault()

	let dataArray = JSON.parse(localStorage.getItem('FormData')) || []
	let radios = document.getElementsByName('priority')
	let priority = ''

	let taskName = $('#taskName').value
	let taskDesc = $('#taskDesc').value
	let assignedTo = $('#assignedTo').value
	let deadline = $('#deadline').value

	radios.forEach((radio) => {
		if (radio.checked) {
			priority = radio.id
		}
	})

	// Create a new task object
	const newTask = {
		taskName: taskName,
		taskDesc: taskDesc,
		assignedTo: assignedTo,
		deadline: deadline,
		priority: priority,
	}

	// Push the new task object into the dataArray
	dataArray.push(newTask)

	// Update the 'FormData' in localStorage with the updated dataArray
	localStorage.setItem('FormData', JSON.stringify(dataArray))

	displayTasks()
}

function displayTasks() {
	const tasks = JSON.parse(localStorage.getItem('FormData')) || []

	console.log('Tasks stored in localStorage:')
	tasks.forEach((task, index) => {
		console.log(`Task ${index + 1}:`)
		console.log('Task Name: ' + task.taskName)
		console.log('Task Description: ' + task.taskDesc)
		console.log('Assigned To: ' + task.assignedTo)
		console.log('Deadline: ' + task.deadline)
		console.log('Priority: ' + task.priority)
		console.log('----------------------')
	})
}

document.addEventListener('DOMContentLoaded', () => {
	$('#taskForm').addEventListener('submit', checkData)
})
