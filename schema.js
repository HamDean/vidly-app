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
  title: Joi.string().min(5).max(255).required(),
  numberInStock: Joi.number().positive().max(255),
  dailyRentalRate: Joi.number().positive().max(255),
  genreId: Joi.string().required(),
});

const rentalSchema = Joi.object({
  movieId: Joi.string().required(),
  customerId: Joi.string().required(),
});

module.exports = { genreSchema, customerInterface, movieSchema, rentalSchema };
