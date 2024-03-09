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

const getRandomColor = () => {
	let hexColor = Math.floor(Math.random() * 16777215).toString(16)
	const newShade = (hexColor, magnitude = 50) => {
		darkerColor = hexColor.replace(`#`, ``)
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
	return `#${(g | (b << 8) | (r << 16)).toString(16)}`, hexColor
}
