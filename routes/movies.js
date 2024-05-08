const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const { movieSchema } = require("../schema");
const { badRequest, notFound } = require("../utils");

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

  const movie = new Movie({
    title: req.body.title,
    numberInstock: req.body.numberInstock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: { genre: req.body.genre },
  });

  await movie.save();

  res.send(movie);
});

module.exports = router;
