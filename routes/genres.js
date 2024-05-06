const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const genres = require("../data");
const schema = require("../schema");
const { badRequest, lookUpGenre, notFound } = require("../utils");

mongoose
  .connect("mongodb://localhost:27017/genres")
  .then(() => console.log("connection to database successfull..."))
  .catch((err) => console.log("could not connect to databse :("));

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 3,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

router.get("/", async (req, res) => {
  res.send(JSON.stringify(await Genre.find()));
  console.log(await Genre.find())
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });

  if (!genre) return res.status(404).send("No genre found :(");

  res.send(JSON.stringify(genre));
});

router.post("/", async (req, res) => {
  const newGenre = req.body;

  const { error } = schema.validate(newGenre);
  if (error) return badRequest(res, error);

  const genre = new Genre({
    genre: newGenre.genre,
  });

  try {
    await genre.save();
    console.log("genre saved...");
  } catch (error) {
    console.log(error);
  }

  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genreBody = req.body;

  const genre = lookUpGenre(req.params.id);

  if (!genre) return notFound(res);

  const { error } = schema.validate(genreBody);
  if (error) return badRequest(res, error);

  genre.genre = genreBody.genre;

  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = lookUpGenre(req.params.id);

  if (!genre) return notFound(res);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
