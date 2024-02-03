const Router = require("express").Router();

const EmployeeProjectHelper = require("../helpers/EmployeeProjectHelper");
const ValidationEmployeeProjectHelper = require("../validation/ValidationEmployeeProject");
const Middleware = require('../middlewares/authMiddleware');

const allEmployeeProject = async (req, res) => {
  try {
    const dataEmployee = req.body.employeeToken;
    const response = await EmployeeProjectHelper.getEmployeeProjectListHelper(dataEmployee);
    return res
      .status(200)
      .send({
        message: "Employee Project data received successfully",
        data: response,
      });
  } catch (err) {
    res.status(400).send({
      message: "Employee Project data failed to be received",
      data: err.message,
    });
  }
};

const detailEmployeeProject = async (req, res) => {
  try {
    ValidationEmployeeProjectHelper.detailEmployeeProjectValidation(req.query);
    const { id } = req.query;
    const dataEmployee = req.body.employeeToken;
    const response = await EmployeeProjectHelper.getEmployeeProjectDetailHelper(
      id,
      dataEmployee
    );
    return res.status(200).send({
      message: "Employee Project detail data received successfully",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Employee Project detail data failed to be received",
      data: err.message,
    });
  }
};

const createEmployeeProject = async (req, res) => {
  try {
    const { projectId, role } = req.body;
    const dataEmployee = req.body.employeeToken;
    const response = await EmployeeProjectHelper.createEmployeeProjectHelper(
      dataEmployee,
      projectId,
      role
    );
    return res.status(200).send({
      message: "Employee Project data successfully created",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Employee Project data failed to be created",
      data: err.message,
    });
  }
};

const updateEmployeeProject = async (req, res) => {
  try {
    ValidationEmployeeProjectHelper.updateEmployeeProjectValidation(req.query);
    const { id } = req.query;
    const { projectId, role } = req.body;
    const dataEmployee = req.body.employeeToken;
    const response = await EmployeeProjectHelper.updateEmployeeProjectHelper(
      id,
      dataEmployee,
      projectId,
      role
    );
    return res.status(200).send({
      message: "Employee Project data successfully updated",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Employee Project data failed to be updated",
      data: err.message,
    });
  }
};

const deleteEmployeeProject = async (req, res) => {
  try {
    ValidationEmployeeProjectHelper.deleteEmployeeProjectValidation(req.query);
    const { id } = req.query;
    const dataEmployee = req.body.employeeToken;
    const response = await EmployeeProjectHelper.deleteEmployeeProjectHelper(
      id,
      dataEmployee
    );
    return res.status(200).send({
      message: "Employee Project data successfully deleted",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Employee Project data failed to be deleted",
      data: err.message,
    });
  }
};

Router.get("/all",Middleware.validateToken, allEmployeeProject);
Router.get("/detail", Middleware.validateToken,detailEmployeeProject);
Router.post("/create",Middleware.validateToken, createEmployeeProject);
Router.put("/update", Middleware.validateToken,updateEmployeeProject);
Router.delete("/delete",Middleware.validateToken, deleteEmployeeProject);
module.exports = Router;
