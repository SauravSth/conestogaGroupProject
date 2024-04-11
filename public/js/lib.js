class TaskManager {
	constructor() {}

	static getNextTaskId() {
		const nextId = parseInt(localStorage.getItem('nextId')) || 1
		localStorage.setItem('nextId', nextId + 1)
		return nextId
	}

	static async addTask(newTask, onSuccess, onFailed) {
		fetch('/api/task/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTask),
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.status == 'ok') {
					onSuccess?.(json)
				} else {
					onFailed?.(json)
				}
			})
			.catch((e) => console.log(e))
	}

	// Store the tasks array back in local storage
	static saveTasks(tasks) {
		return localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	static getTasks() {
		return fetch('/api/task')
			.then((res) => res.text())
			.then(
				(html) =>
					(document.getElementById('tasks-container').innerHTML =
						html)
			)
	}

	static searchTasks(keyword) {
		const tasks = this.getTasks()
		if (keyword == '') {
			return tasks
		}
		keyword = keyword.toLowerCase()
		return tasks.filter((task) => {
			return (
				task.taskName.toLowerCase().includes(keyword) ||
				task.taskDesc.toLowerCase().includes(keyword) ||
				task.assignedTo.toLowerCase().includes(keyword)
			)
		})
	}

	// Update the task in the tasks array
	static updateTask(updatedTask) {
		const tasks = this.getTasks()
		const index = this.findIndexById(updatedTask.taskId)
		if (index !== -1) {
			tasks[index] = updatedTask
			this.saveTasks(tasks)
		}
	}

	static deleteTask(taskId) {
		const tasks = this.getTasks()
		const index = this.findIndexById(taskId)
		if (index !== -1) {
			tasks.splice(index, 1)
			this.saveTasks(tasks)
		}
	}

	static findTaskById(taskId) {
		return this.getTasks().find((task) => task.taskId == taskId)
	}

	// Find the index of the task with the matching taskId
	static findIndexById(taskId) {
		return this.getTasks().findIndex((task) => task.taskId === taskId)
	}
}

const $ = (selector) => document.querySelector(selector)
