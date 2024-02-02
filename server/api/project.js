const Router = require("express").Router();

const ProjectHelper = require("../helpers/ProjectHelper");
const ValidationProjectHelper = require("../validation/ValidationProject");

const allProject = async (req, res) => {
  try {
    const response = await ProjectHelper.getProjectListHelper();
    return res
      .status(200)
      .send({ message: "Project data received successfully", data: response });
  } catch (err) {
    res.status(400).send({
      message: "Project data failed to be received",
      data: err.message,
    });
  }
};

const detailProject = async (req, res) => {
  try {
    ValidationProjectHelper.detailProjectValidation(req.query);
    const { id } = req.query;
    const response = await ProjectHelper.getProjectDetailHelper(id);
    return res.status(200).send({
      message: "Project detail data received successfully",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Project detail data failed to be received",
      data: err.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    ValidationProjectHelper.createProjectValidation(req.body);
    const { name } = req.body;
    const response = await ProjectHelper.createProjectHelper(name);
    return res
      .status(200)
      .send({
        message: "Project data successfully created",
        data: response,
      });
  } catch (err) {
    res.status(400).send({
      message: "Project data failed to be created",
      data: err.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    ValidationProjectHelper.updateProjectValidation(req.query);
    const { id } = req.query;
    const { name } = req.body;
    const response = await ProjectHelper.updateProjectHelper(id, name);
    return res
      .status(200)
      .send({
        message: "Project data successfully updated",
        data: response,
      });
  } catch (err) {
    res.status(400).send({
      message: "Project data failed to be updated",
      data: err.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    ValidationProjectHelper.deleteProjectValidation(req.query);
    const { id } = req.query;
    const response = await ProjectHelper.deleteProjectHelper(id);
    return res
      .status(200)
      .send({
        message: "Project data successfully deleted",
        data: response,
      });
  } catch (err) {
    res.status(400).send({
      message: "Project data failed to be deleted",
      data: err.message,
    });
  }
};

Router.get('/all', allProject);
Router.get("/detail", detailProject);
Router.post("/create", createProject);
Router.put("/update", updateProject);
Router.delete("/delete", deleteProject);

module.exports = Router;