const Joi = require("joi");
const Boom = require("boom");

const detailEmployeeProjectValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createEmployeeProjectValidation = (data) => {
    const schema = Joi.object({
      employeeId: Joi.number().required(),
      projectId: Joi.number().required(),
      role: Joi.string().required(),
    });
  
    if (schema.validate(data).error) {
      throw Boom.badRequest(schema.validate(data).error);
    }
  }

  const updateEmployeeProjectValidation = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
  
    if (schema.validate(data).error) {
      throw Boom.badRequest(schema.validate(data).error);
    }
  };

  const deleteEmployeeProjectValidation = (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
  
    if (schema.validate(data).error) {
      throw Boom.badRequest(schema.validate(data).error);
    }
  };

module.exports = {
  detailEmployeeProjectValidation,
  createEmployeeProjectValidation,
  updateEmployeeProjectValidation,
  deleteEmployeeProjectValidation
};
