document.addEventListener('DOMContentLoaded', () => {
	$('#search').addEventListener('click', searchTasks)
	displayTasks()
})

function displayTasks(tasks = TaskManager.getTasks().reverse()) {
	const tasksContainer = $('#tasks-container')
	tasksContainer.innerHTML = ''

	if (tasks.length == 0) {
		tasksContainer.innerHTML = `<p class="no-result">No task found.</p>`
		return
	}
	let pColor = '',
		pColorDark = ''

	tasks.forEach((task, index) => {
		switch (task.priority) {
			case 'low':
				pColor = '#579bfc'
				pColorDark = '#3286fc'
				break
			case 'medium':
				pColor = '#DAA520'
				pColorDark = '#CC7722'
				break
			case 'high':
				pColor = '#990000'
				pColorDark = '#800000'
				break
			default:
				pColor = 'black'
				pColorDark = 'black'
		}
		tasksContainer.innerHTML += `<div class="task-container">
				<div class="task-details">
					<div class="task-title" style="background-color: ${pColorDark}">
						<h3>${task.taskName}</h3>
						<div class="task-nav-right">
							<h4>Due: ${task.deadline}</h4>
							<h4>Priority: ${task.priority}</h4>
						</div>
					</div>
					<div class="task-desc" style="background-color: ${pColor}">
						<p>${task.taskDesc}</p>
					</div>
				</div>
				<div class="task-options" style="background-color: ${pColorDark}">
					<div class="edit">
						<a href="" onclick="editTask(event, ${task.taskId});">
							<img
								src="./images/pen-to-square-solid.svg"
								alt="Edit Icon"/>
						</a>
					</div>
					<div class="delete" onclick="deleteTask(event, ${task.taskId});">
						<a href=""
							><img
								src="./images/trash-solid.svg"
								alt="Delete Icon"
							/>
						</a>
					</div>
					<div class="assigned-to">
						Assigned To: <strong>${task.assignedTo}</strong>
					</div>
				</div>
		</div>
		`
	})
}

function deleteTask(event, taskId) {
	event.preventDefault()
}

function editTask(event, taskId) {
	event.preventDefault()
}

function searchTasks(event) {
	event.preventDefault()
	const keyword = $('#searchKeyword').value.trim()
	const matchedTasks = TaskManager.searchTasks(keyword)
	displayTasks(matchedTasks)
}
