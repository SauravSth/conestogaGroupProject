const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const path = require('path')

const DATA_FILE = 'task_list.json'

app.use(express.static('public'))
app.use(bodyParser.json())

const sendError = (res, err) => {
	res.status(500)
	res.send(
		JSON.stringify({
			status: 'error',
			error: err,
		})
	)
}

const sendOk = (res, msg, data) => {
	res.status(200)
	res.send(
		JSON.stringify({
			status: 'ok',
			message: msg,
			data: data,
		})
	)
}

app.get('/', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'public', 'pages', 'index.html'))
})

app.get('/getAll.html', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'public', 'pages', 'getAll.html'))
})

// Create a task
app.post('/api/task', (req, res) => {
	console.log('got an request, body:' + req.body)
	res.setHeader('Content-Type', 'application/json')
	fs.readFile(DATA_FILE, (err, data) => {
		if (err) {
			sendError(res, err)
			return
		}

		const taskList = JSON.parse(data)
		const task = {
			taskId:
				taskList.length > 0
					? taskList[taskList.length - 1].taskId + 1
					: 1,
			taskName: req.body.taskName,
			taskDesc: req.body.taskDesc,
			assignedTo: req.body.assignedTo,
			deadline: req.body.deadline,
			priority: req.body.priority,
		}
		taskList.push(task)

		fs.writeFile(DATA_FILE, JSON.stringify(taskList), (err, data) => {
			if (err) {
				sendError(res, err)
			} else {
				sendOk(res, 'Record inserted.', { taskId: task.taskId })
			}
		})
	})
})

// Get Task
app.get('/api/task', (req, res) => {
	fs.readFile(DATA_FILE, (err, data) => {
		if (err) {
			sendError(res, err)
		} else {
			let tasksContainer = ''
			data = JSON.parse(data)
			data.forEach((task, index) => {
				switch (task.priority) {
					case 'low':
						pColor = 'rgb(95, 176, 15)'
						pColorDark = 'rgb(67, 132, 1)'
						break
					case 'medium':
						pColor = '#c8903c'
						pColorDark = '#CC7722'
						break
					case 'high':
						pColor = '#990000'
						pColorDark = '#800000'
						break
					default:
						pColor = 'transparent'
				}
				tasksContainer += `<div class="task-container">
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
			res.send(tasksContainer)
		}
	})
})

app.get('/api/oneTask', (req, res) => {
	//
	const data = req.body
})

const port = 8080
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
