const Joi = require("joi");


const schema = Joi.object({
  genre: Joi.string().required(),
});

module.exports = schema;
