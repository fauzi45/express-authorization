const Joi = require("joi");
const Boom = require("boom");

const detailEmployeeValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createEmployeeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    departmentId: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateEmployeeValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const deleteEmployeeValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  detailEmployeeValidation,
  createEmployeeValidation,
  updateEmployeeValidation,
  deleteEmployeeValidation
};
