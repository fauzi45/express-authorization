const Boom = require("boom");
const db = require("../../models");
const _ = require("lodash");

const getEmployeeProjectListHelper = async (dataEmployee) => {
  try {
    const response = await db.employeeprojects.findAll({
      include: [
        { model: db.employees, attributes: { exclude: ["password"] } },
        { model: db.projects },
      ],
      where: { employeeId: dataEmployee.employeeId },
      attributes: { exclude: ["password"] },
    });
    if (_.isEmpty(response)) {
      return Promise.reject(
        Boom.badRequest("This user has no data on employee project")
      );
    }
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getEmployeeProjectDetailHelper = async (id, dataEmployee) => {
  try {
    const response = await db.employeeprojects.findOne({
      include: [
        { model: db.employees, attributes: { exclude: ["password"] } },
        { model: db.projects },
      ],
      where: { id: id, employeeId: dataEmployee.employeeId },
    });
    if (_.isEmpty(response)) {
      return Promise.reject(
        Boom.badRequest("This user has no data on employee project")
      );
    }
    return Promise.resolve(response.dataValues);
  } catch (error) {
    throw error;
  }
};

const createEmployeeProjectHelper = async (dataEmployee, projectId, role) => {
  try {
    const checkProject = await db.projects.findOne({
      where: { id: projectId },
    });
    if (_.isEmpty(checkProject)) {
      return Promise.reject(
        Boom.badRequest("Project with this id doesn't exist")
      );
    }
    const response = await db.employeeprojects.create({
      employeeId: dataEmployee.employeeId,
      projectId: projectId,
      role: role,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(err);
  }
};

const updateEmployeeProjectHelper = async (
  id,
  dataEmployee,
  projectId,
  role
) => {
  try {
    const checkEmployeeProject = await db.employeeprojects.findOne({
      where: { id: id, employeeId: dataEmployee.employeeId },
    });
    if (_.isEmpty(checkEmployeeProject)) {
      return Promise.reject(
        Boom.badRequest("Employee Project with this id doesn't exist")
      );
    }
    const checkProject = await db.projects.findOne({
      where: { id: projectId },
    });
    if (_.isEmpty(checkProject)) {
      return Promise.reject(
        Boom.badRequest("Project with this id doesn't exist")
      );
    }
    await db.employeeprojects.update(
      {
        employeeId: dataEmployee.id
          ? dataEmployee.id
          : checkEmployeeProject.dataValues.employeeId,
        projectId: projectId
          ? projectId
          : checkEmployeeProject.dataValues.projectId,
        role: role ? role : checkEmployeeProject.dataValues.role,
      },
      { where: { id: id } }
    );
    return Promise.resolve([]);
  } catch (error) {
    throw error;
  }
};

const deleteEmployeeProjectHelper = async (id,dataEmployee) => {
  try {
    const checkAuthorization = await db.employeeprojects.findOne({
      where: { employeeId: dataEmployee.employeeId },
    });
    if (_.isEmpty(checkAuthorization)) {
      throw new Error("You are not authorized to delete this data");
    }
    const checkEmployeeProject = await db.employeeprojects.findOne({
      where: { id: id },
    });
    if (_.isEmpty(checkEmployeeProject)) {
      throw new Error("Employee Project with this id doesn't exist");
    }
    await db.employeeprojects.destroy({
      where: {
        id: id,
      },
    });

    return Promise.resolve([]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEmployeeProjectHelper,
  getEmployeeProjectDetailHelper,
  getEmployeeProjectListHelper,
  updateEmployeeProjectHelper,
  deleteEmployeeProjectHelper,
};
