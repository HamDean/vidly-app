const Joi = require("joi");

const genreSchema = Joi.object({
  genre: Joi.string().required(),
});

const customerInterface = Joi.object({
  name: Joi.string().min(2).max(30).required().alphanum(),
  isGold: Joi.boolean(),
  phone: Joi.string().min(10).max(10).required(),
});

const movieSchema = Joi.object({
  title: Joi.string().required(),
  numberInStock: Joi.number().positive(),
  dailyRentalRate: Joi.number().positive(),
  genre: Joi.string()
})

module.exports = { genreSchema, customerInterface, movieSchema };
