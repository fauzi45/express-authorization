const Router = require("express").Router();

const AuthHelper = require("../helpers/AuthHelper");
const Middleware = require("../middlewares/authMiddleware");
const ValidationAuth = require("../validation/ValidationAuth");

const register = async (req, res) => {
  try {
    ValidationAuth.registerValidation(req.body);
    const { name, email, password, position, departmentId } = req.body;
    const response = await AuthHelper.registerEmployee({
      name,
      email,
      password,
      position,
      departmentId,
    });
    return res.status(200).send({
      message: "Data Employee succesfully registered",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Data Employee failed registered",
      data: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    ValidationAuth.loginValidation(req.body);
    const { email, password } = req.body;
    const response = await AuthHelper.login({ email, password });
    return res.status(200).send({
      message: "Login successfully",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Login failed",
      data: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const dataEmployee = req.body.employeeToken;
    const { oldPassword, newPassword, newConfirmPassword } = req.body;
    ValidationAuth.changePasswordValidation({oldPassword, newPassword});
    
    const response = await AuthHelper.changePassword(
      dataEmployee,
      oldPassword,
      newPassword,
      newConfirmPassword
    );
    return res.status(200).send({
      message: "Change password successfully",
      data: response,
    });
  } catch (err) {
    res.status(400).send({
      message: "Change password failed",
      data: err.message,
    });
  }
};

Router.post("/register", register);
Router.post("/login", login);
Router.patch("/change-password", Middleware.validateToken, changePassword);

module.exports = Router;
