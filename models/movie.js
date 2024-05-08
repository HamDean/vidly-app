const mongoose = require("mongoose");
const genre = require("../models/genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
  },
  genre: {
    type: mongoose.Schema.type,
    ref: genre,
  },
});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;

