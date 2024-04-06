const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const path = require("path");

const DATA_FILE = "task_list.json";

app.use(express.static("public"));
app.use(bodyParser.json());

const sendError = (res, err) => {
    res.status(500);
    res.send(JSON.stringify({
        status: "error",
        error: err
    }));
}

const sendOk = (res, msg, data) => {
    res.status(200);
    res.send(JSON.stringify({
        status: "ok",
        message: msg,
        data: data,
    }));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "pages", "index.html"));
});

app.get("/getAll.html", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "pages", "getAll.html"));
});

// Create a task
app.post("/api/task", (req, res) => {
    console.log("got an request, body:" + req.body);
    res.setHeader("Content-Type", "application/json");
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            sendError(res, err);
            return;
        }

        const taskList = JSON.parse(data);
        const task = {
            taskId: taskList.length > 0 ? taskList[taskList.length-1].taskId + 1 : 1,
            taskName: req.body.taskName,
            taskDesc: req.body.taskDesc,
            assignedTo: req.body.assignedTo,
            deadline: req.body.deadline,
            priority: req.body.priority,
        };
        taskList.push(task);

        fs.writeFile(DATA_FILE, JSON.stringify(taskList), (err, data) => {
            if (err) {
                sendError(res, err);
            } else {
                sendOk(res, "Record inserted.", {taskId: task.taskId});
            }
        })
        
    });
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})