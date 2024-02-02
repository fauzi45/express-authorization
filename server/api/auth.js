const Router = require("express").Router();

const AuthHelper = require("../helpers/AuthHelper");

const register = async (req, res) => {
  try {
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

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
