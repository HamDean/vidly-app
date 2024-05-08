const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const { movieSchema } = require("../schema");
const { badRequest } = require("../utils");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort("title");
    res.send(movies);
  } catch (error) {
    res.send("No movies movies available atm :(");
    console.log("No movies movies available atm :(");
  }
});

router.post("/", async (req, res) => {
  const { error } = movieSchema.validate(req.body);
  if (error) return badRequest(res, error);

  try {
    const movie = new Movie({
      title: req.body.title,
      numberInstock: req.body.numberInstock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: { genre: req.body.genre },
    });

    await movie.save();

    res.send(movie);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
