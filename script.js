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

const getRandomColor = () => {
	let hexColor = Math.floor(Math.random() * 16777215).toString(16)
	const newShade = (hexColor, magnitude = 50) => {
		darkerColor = hexColor.replace('#', ``)
		if (darkerColor.length === 6) {
			const decimalColor = parseInt(darkerColor, 16)
			let r = (decimalColor >> 16) + magnitude
			r > 255 && (r = 255)
			r < 0 && (r = 0)
			let g = (decimalColor & 0x0000ff) + magnitude
			g > 255 && (g = 255)
			g < 0 && (g = 0)
			let b = ((decimalColor >> 8) & 0x00ff) + magnitude
			b > 255 && (b = 255)
			b < 0 && (b = 0)
		} else {
			return darkerColor, hexColor
		}
	}
	return `#${(g | (b << 8) | (r << 16)).toString(16)}, hexColor`
}
