const Router = require("express").Router();

const AuthHelper = require("../helpers/AuthHelper");

const register = async (req, res) => {
  try {
    const {name, email, password, position, departmentId} = req.body;
    const response = await AuthHelper.registerEmployee({name, email, password, position, departmentId});
    return res
      .status(200)
      .send({
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

Router.post('/register', register);

module.exports = Router;
