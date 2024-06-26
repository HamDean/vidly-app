const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const { movieSchema } = require("../schema");
const { badRequest, notFound } = require("../utils");
const {Genre} = require('../models/genre')

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort("title");
    res.send(movies);
  } catch (error) {
    res.send("No movies movies available atm :(");
    console.log("No movies movies available atm :(");
  }
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return notFound(res);

  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = movieSchema.validate(req.body);
  if (error) return badRequest(res, error);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({ 
    title: req.body.title,
    genre: genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = movieSchema.validate(req.body);
  if (error) return badRequest(res, error);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
          genre: req.body.genre,
        },
      },
    },
    { new: true }
  );
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return notFound(res);

  res.send(movie);
});

module.exports = router;
