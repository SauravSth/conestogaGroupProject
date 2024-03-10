
function checkData(e) {
	e.preventDefault()

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

	TaskManager.addTask(newTask)
	window.location.href = "/getAll.html"
}

document.addEventListener('DOMContentLoaded', () => {
	$('#taskForm').addEventListener('submit', checkData)
})
