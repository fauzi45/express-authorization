const Boom = require("boom");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const db = require("../../models");

const jwtSecretToken = "super_strong_key";
const jwtExpiresIn = "24h";
const salt = bcrypt.genSaltSync(10);

const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
};

const registerEmployee = async (dataObject) => {
  const { name, email, password, position, departmentId } = dataObject;

  try {
    const employee = await db.employees.findOne({
      where: { email },
    });
    const checkDepartment = await db.departments.findOne({
      where: { id: departmentId },
    });
    if (!_.isEmpty(employee)) {
      return Promise.reject(
        Boom.badRequest("EMAIL HAS BEEN USED, PLEASE TRY ANOTHER EMAIL")
      );
    } else if (_.isEmpty(checkDepartment)) {
      return Promise.reject(
        Boom.badRequest("Department with this id is doesn't exist")
      );
    }
    const hashedPass = __hashPassword(password);
    await db.employees.create({
      name,
      email,
      password: hashedPass,
      position,
      departmentId,
    });
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(err);
  }
};

const login = async (dataObject) => {
  const { email, password } = dataObject;
  try {
    const employee = await db.employees.findOne({
      where: { email },
    });
    if (_.isEmpty(employee)) {
      return Promise.reject(Boom.badRequest("Email is doesn't exist"));
    }

    const isPassMatched = __comparePassword(password, employee.password);

    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("Wrong Password"));
    }

    const token = __generateToken({
      employeeId: employee.id,
    });
    return Promise.resolve({ token });
  } catch (err) {
    return Promise.reject(err);
  }
};

const changePassword = async (dataEmployee,oldPassword, newPassword, newConfirmPassword) => {
  try {
    const checkAuthorization = await db.employees.findOne({
      where: { id: dataEmployee.employeeId },
    });
    if (_.isEmpty(checkAuthorization)) {
      return Promise.reject(
        Boom.unauthorized("You are not authorized to see this data")
      );
    }
    const checkOldPassword = __comparePassword(
      oldPassword,
      checkAuthorization.password
    );
    if (!checkOldPassword) {
      return Promise.reject(Boom.badRequest("Wrong Old Password"));
    }
    if (newPassword !== newConfirmPassword) {
      return Promise.reject(
        Boom.badRequest("New Password doesn't match with Confirm Password")
      );
    }

    const hashedPass = __hashPassword(newPassword);
    await db.employees.update(
      {
        password: hashedPass,
      },
      {
        where: {
          id: checkAuthorization.id,
        },
      }
    );
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  registerEmployee,
  login,
  changePassword,
};
