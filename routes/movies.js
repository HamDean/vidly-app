const express = require("express");
const router = express.Router();
const { Movie } = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort("title");
    res.send(movies);
  } catch (error) {
    res.send("No movies movies available atm :(");
    console.log("No movies movies available atm :(");
  }
});

module.exports = router;

//* don't forget to fix genre imports of the movie module and references as well
