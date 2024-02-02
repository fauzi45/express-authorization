const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const department = require("./server/api/department");
const project = require("./server/api/project");
const employee = require("./server/api/employee");
const employeeproject = require("./server/api/employeeproject");

app.use("/department", department);
app.use("/project", project);
app.use("/employee", employee);
app.use("/employeeproject", employeeproject);

const port = process.env.NODEJS_PORT || 8000;

app.get("/", (req, res) => {
  res.send("Succesfull Response");
});

app.listen(port, console.log("start port"));