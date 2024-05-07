const Joi = require("joi");

const genreSchema = Joi.object({
  genre: Joi.string().required(),
});

const customerInterface = Joi.object({
  name: Joi.string().min(2).max(30).required().alphanum(),
  isGold: Joi.boolean(),
  phone: Joi.string().min(10).max(10).required(),
});

module.exports = { genreSchema, customerInterface };
