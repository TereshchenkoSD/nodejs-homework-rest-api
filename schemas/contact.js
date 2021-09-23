const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().length(10).pattern(/^\d+$/).required(),
  email: Joi.string().min(1).required(),
});

module.exports = contactSchema;
