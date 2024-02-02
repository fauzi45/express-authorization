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
    const checkEmployee = await db.employees.findOne({
      where: { id: dataEmployee.employeeId },
    });
    const checkProject = await db.projects.findOne({
      where: { id: projectId },
    });
    console.log(checkEmployee);
    if (!checkEmployee) {
      return Promise.reject(
        Boom.badRequest("Employee with this id doesn't exist")
      );
    }
    if (!checkProject) {
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

const updateEmployeeProjectHelper = async (id, employeeId, projectId, role) => {
  try {
    if (employeeId) {
      const checkEmployee = await db.employees.findOne({
        where: { id: employeeId },
      });
      if (!checkEmployee) {
        throw new Error("Employee with this id doesn't exist");
      }
    }

    const checkEmployeeProject = await db.employeeprojects.findOne({
      where: { id: id },
    });
    if (!checkEmployeeProject) {
      throw new Error("Employee Project with this id doesn't exist");
    }

    await db.employeeprojects.update(
      {
        employeeId: employeeId
          ? employeeId
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

const deleteEmployeeProjectHelper = async (id) => {
  try {
    const checkEmployee = await db.employeeprojects.findOne({
      where: { id: id },
    });
    if (!checkEmployee) {
      throw new Error("Employee Project with this id doesn't exist");
    } else {
      await db.employeeprojects.destroy({
        where: {
          id: id,
        },
      });
    }
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
