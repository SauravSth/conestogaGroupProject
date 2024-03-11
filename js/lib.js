class TaskManager {
    constructor() {

    }

    static getNextTaskId() {
        const nextId = parseInt(localStorage.getItem('nextId')) || 1
        localStorage.setItem('nextId', nextId + 1)
        return nextId
    }

    static addTask(newTask) {
        newTask.taskId = this.getNextTaskId();
        const tasks = this.getTasks()

        // Push the new task object into the dataArray
        tasks.push(newTask)

        // Update the 'FormData' in localStorage with the updated dataArray
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    // Retrieve tasks from local storage
    static getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || []
    }

    // Store the tasks array back in local storage
    static saveTasks(tasks) {
        return localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static searchTasks(keyword) {
        const tasks = this.getTasks()
        if (keyword == "") {
            return tasks
        }

        return tasks.filter((task) => {
            return task.taskName.includes(keyword)
                || task.taskDesc.includes(keyword)
                || task.assignedTo.includes(keyword)
        })
    }

    // Update the task in the tasks array
    static updateTask(updatedTask) {
        const tasks = this.getTasks();
        const index = this.findIndexById(updatedTask.taskId);
        if (index !== -1) {
            tasks[index] = updatedTask;
            this.saveTasks(tasks);
        }
    }

    static deleteTask(taskId) {
        const tasks = this.getTasks();
        const index = this.findIndexById(taskId);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.saveTasks(tasks);
        }
    }

    static findTaskById(taskId) {
        return this.getTasks().find(task => task.taskId == taskId);
    }

    // Find the index of the task with the matching taskId
    static findIndexById(taskId) {
        return this.getTasks().findIndex(task => task.taskId === taskId);
    }
}

const $ = (selector) => document.querySelector(selector)