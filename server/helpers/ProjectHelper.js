const db = require("../../models");

const getProjectListHelper = async () => {
  try {
    const response = await db.projects.findAll();
    if (!response) {
      throw new Error("There's no data on Project");
    }
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

const getProjectDetailHelper = async (id) => {
  try {
    const response = await db.projects.findOne({
      where: { id: id },
    });
    if (!response) {
      throw new Error("Project with this id doesn't exist");
    }
    return Promise.resolve(response.dataValues);
  } catch (error) {
    throw error;
  }
};

const createProjectHelper = async (name) => {
  try {
    const response = await db.projects.create({
      name: name,
    });
    return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

const updateProjectHelper = async (id, name) => {
  try {
    const checkProject = await db.projects.findOne({
      where: { id: id },
    });
    if (!checkProject) {
      throw new Error("Project with this id doesn't exist");
    } else {
       await db.projects.update(
        { name: name ? name : checkProject.dataValues.name },
        { where: { id: id } }
      );
    }
    return Promise.resolve([]);
  } catch (error) {
    throw error;
  }
};

const deleteProjectHelper = async (id) => {
  try {
    const checkProject = await db.projects.findOne({
      where: { id: id },
    });
    if (!checkProject) {
      throw new Error("Project with this id doesn't exist");
    } else {
      await db.projects.destroy({
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
  createProjectHelper,
  getProjectListHelper,
  getProjectDetailHelper,
  updateProjectHelper,
  deleteProjectHelper
};
