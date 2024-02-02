'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      departments.hasMany(models.employees,{
        as: 'department',
        foreignKey: 'departmentId'
      })
    }
  }
  departments.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'departments',
  });
  return departments;
};