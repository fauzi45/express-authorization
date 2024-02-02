const Joi = require("joi");
const Boom = require("boom");

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2 }).description('Valid email address'),
    password: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20).description('Name must be between 3 and 20 characters'),
    email: Joi.string().required().email({ minDomainSegments: 2 }).description('Valid email address'),
    password: Joi.string().required().min(6).max(20).description('Password must be between 6 and 20 characters'),
    position: Joi.string().required().min(3).max(20).description('Position must be between 3 and 20 characters'),
    departmentId: Joi.number().required().description('Department Id is required'),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

const changePasswordValidation = (data) => {
  const schema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required().min(6).max(20).description('New Password must be between 6 and 20 characters'),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

module.exports = {
    loginValidation,
    registerValidation,
    changePasswordValidation
};
