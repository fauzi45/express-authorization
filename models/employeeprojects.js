'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeprojects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      employeeprojects.belongsTo(models.employees, {
        foreignKey: 'employeeId'
      });
      employeeprojects.belongsTo(models.projects, {
        foreignKey: 'projectId'
      });
    }
  }
  employeeprojects.init({
    employeeId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employeeprojects',
  });
  return employeeprojects;
};