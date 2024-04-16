class TaskManager {
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
			onSuccess?.(json);
		  } else {
			onFailed?.(json);
		  }
		})
		.catch((e) => console.log(e));
	}
  
	static getTasks() {
	  return fetch('/api/task')
		.then((res) => res.json())
		.then((json) => json.data);
	}
  
	static searchTasks(keyword) {
	  return this.getTasks().then((tasks) => {
		if (keyword == '') {
		  return tasks;
		}
		keyword = keyword.toLowerCase();
		return tasks.filter((task) => {
		  return (
			task.taskName.toLowerCase().includes(keyword) ||
			task.taskDesc.toLowerCase().includes(keyword) ||
			task.assignedTo.toLowerCase().includes(keyword)
		  );
		});
	  });
	}
  
	static async updateTask(updatedTask, onSuccess, onFailed) {
	  fetch(`/api/task/${updatedTask.taskId}`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedTask),
	  })
		.then((response) => response.json())
		.then((json) => {
		  if (json.status == 'ok') {
			onSuccess?.(json);
		  } else {
			onFailed?.(json);
		  }
		})
		.catch((e) => console.log(e));
	}
  
	static async deleteTask(taskId) {
	  return fetch(`/api/task/${taskId}`, {
		method: 'DELETE',
	  })
		.then((response) => response.json())
		.then((json) => {
		  if (json.status === 'ok') {
			console.log(`Task : ${taskId} deleted from the list.`);
			this.getTasks();
		  } else {
			console.error(`Error while deleting task ${taskId}: ${json.error}`);
		  }
		})
		.catch((error) => {
		  console.error('Error in deleting task:', error);
		});
	}
  
	static findTaskById(taskId) {
	  return this.getTasks().then((tasks) => tasks.find((task) => task.taskId == taskId));
	}
  }
  
  const $ = (selector) => document.querySelector(selector);