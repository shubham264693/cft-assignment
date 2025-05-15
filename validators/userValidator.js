const Joi = require('joi');

const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema
};