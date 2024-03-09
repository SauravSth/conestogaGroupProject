document.addEventListener('DOMContentLoaded', () => {
	$('#search').addEventListener('click', searchTasks)
	displayTasks()
})


function displayTasks(tasks = TaskManager.getTasks()) {
	const tasksContainer = $("#tasks-container");
	tasksContainer.innerHTML = ""

	if (tasks.length == 0) {
		tasksContainer.innerHTML = `<p class="no-result">No task found.</p>`
		return
	}

	tasks.forEach((task, index) => {
		tasksContainer.innerHTML += 
		`<div class="task-container random-color">
			<div class="task-details">
				<div class="task-title">
					<h3>${task.taskName}</h3>
				</div>
				<div class="task-desc">
					<p>${task.taskDesc}</p>
				</div>
			</div>
			<div class="task-options">
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
	console.log("deleting task:" + taskId)
}

function editTask(event, taskId) {
	event.preventDefault()
	console.log("editing task:" + taskId)
}

function searchTasks(event) {
	event.preventDefault()
	const keyword = $("#searchKeyword").value.trim()
	const matchedTasks = TaskManager.searchTasks(keyword)
	displayTasks(matchedTasks)
}