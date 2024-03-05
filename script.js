const $ = (selector) => document.querySelector(selector)

const checkData = (e) => {
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
	dataArray.push([taskName, taskDesc, assignedTo, deadline, priority])
	localStorage.setItem('FormData', JSON.stringify(dataArray))
}

document.addEventListener('DOMContentLoaded', () => {
	$('#taskForm').addEventListener('submit', checkData)
})
