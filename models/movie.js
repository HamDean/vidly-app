const mongoose = require("mongoose");
const { genreSchema } = require("../models/genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    default: 0,
  },
  genre: { type: genreSchema, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
