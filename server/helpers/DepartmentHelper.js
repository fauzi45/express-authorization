const db = require("../../models");
const getDepartmentListHelper = async () => {
  try {
    const response = await db.departments.findAll();
    if (!response) {
      throw new Error("There's no data on department");
    }
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

const getDepartmentDetailHelper = async (id) => {
  try {
    const response = await db.departments.findOne({
      where: { id: id },
    });
    if (!response) {
      throw new Error("Department with this id doesn't exist");
    }
    return Promise.resolve(response.dataValues);
  } catch (error) {
    throw error;
  }
};

const createDepartmentHelper = async (name) => {
  try {
    const response = await db.departments.create({
      name: name,
    });
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

const updateDepartmentHelper = async (id, name) => {
  try {
    const checkDepartment = await db.departments.findOne({
      where: { id: id },
    });
    if (!checkDepartment) {
      throw new Error("Department with this id doesn't exist");
    } else {
      await db.departments.update(
        { name: name ? name : checkDepartment.dataValues.name },
        { where: { id: id } }
      );
    }
    return Promise.resolve([]);
  } catch (error) {
    throw error;
  }
};

const deleteDepartmentHelper = async (id) => {
  try {
    const checkDepartment = await db.departments.findOne({
      where: { id: id },
    });
    if (!checkDepartment) {
      throw new Error("Department with this id doesn't exist");
    } else {
      await db.departments.destroy({
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
  getDepartmentListHelper,
  getDepartmentDetailHelper,
  createDepartmentHelper,
  updateDepartmentHelper,
  deleteDepartmentHelper,
};
