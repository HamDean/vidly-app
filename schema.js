const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
  genreId: Joi.objectId().required(),
});

const rentalSchema = Joi.object({
  movieId: Joi.objectId().required(),
  customerId: Joi.objectId().required(),
});

const userSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().required().min(8).max(255),
});

const authSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().required().min(8).max(255),
});

module.exports = {
  genreSchema,
  customerInterface,
  movieSchema,
  rentalSchema,
  userSchema,
  authSchema
};
