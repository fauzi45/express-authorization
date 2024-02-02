const db = require("../../models");

const getEmployeeListHelper = async () => {
  try {
    const response = await db.employees.findAll({
      include: "department",
      attributes: { exclude: ['password'] }
    });
    if (!response) {
      throw new Error("There's no data on Employee");
    }
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

const getEmployeeDetailHelper = async (dataEmployee) => {
  try {
    const response = await db.employees.findOne({
      include: "department",
      attributes: { exclude: ['password'] },
      where: { id: dataEmployee.employeeId },
    });
    
    if (!response) {
      throw new Error("Employee with this id doesn't exist");
    }
    return Promise.resolve(response.dataValues);
  } catch (error) {
    throw error;
  }
};

const createEmployeeHelper = async (name, position, departmentId) => {
  try {
    const checkDepartment = await db.departments.findOne({
      where: { id: departmentId },
    });
    if (!checkDepartment) {
      throw new Error("Department with this id doesn't exist");
    }
    const response = await db.employees.create({
      name: name,
      position: position,
      departmentId: departmentId,
    });
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

const updateEmployeeHelper = async (id, name, position, departmentId) => {
  try {
    if (departmentId) {
      const checkDepartment = await db.departments.findOne({
        where: { id: departmentId },
      });
      if (!checkDepartment) {
        throw new Error("Department with this id doesn't exist");
      }
    }
    const checkEmployee = await db.employees.findOne({
      where: { id: id },
    });
    if (!checkEmployee) {
      throw new Error("Employee with this id doesn't exist");
    }
    await db.employees.update(
      {
        name: name ? name : checkEmployee.dataValues.name,
        position: position ? position : checkEmployee.dataValues.position,
        departmentId: departmentId
          ? departmentId
          : checkEmployee.dataValues.departmentId,
      },
      { where: { id: id } }
    );
    return Promise.resolve([]);
  } catch (error) {
    throw error;
  }
};

const deleteEmployeeHelper = async (id) => {
  try {
    const checkEmployee = await db.employees.findOne({
      where: { id: id },
    });
    if (!checkEmployee) {
      throw new Error("Employee with this id doesn't exist");
    } else {
      await db.employees.destroy({
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
  createEmployeeHelper,
  getEmployeeListHelper,
  getEmployeeDetailHelper,
  updateEmployeeHelper,
  deleteEmployeeHelper,
};
