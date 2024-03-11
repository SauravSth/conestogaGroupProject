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

    static getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || []
    }

    static searchTasks(keyword) {
        const tasks = this.getTasks()
        if (keyword == "") {
            return tasks
        }

        return tasks.filter((task) => {
            return task.taskName.includes(keyword)
                || task.taskDesc.includes(keyword)
                || task.assignedTo.includes(keyword);
        })
    }

    updateTask(updatedTask) {
       
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        const index = tasks.findIndex(task => task.taskId === updatedTask.taskId);
        
        if (index !== -1) {
            
            tasks[index] = updatedTask;
            
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
   
}

const $ = (selector) => document.querySelector(selector)