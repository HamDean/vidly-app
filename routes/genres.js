const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { genreSchema } = require("../schema");
const { badRequest, notFound } = require("../utils");

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("connection to database successfull..."))
  .catch((err) => console.log("could not connect to databse :(", err));

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    genre: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch (error) {
    return notFound(res);
  }
});

router.post("/", async (req, res) => {
  const newGenre = req.body;

  const { error } = genreSchema.validate(newGenre);
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

router.put("/:id", async (req, res) => {
  const { error } = genreSchema.validate(req.body);
  if (error) return badRequest(res, error);

  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { genre: req.body.genre },
      { new: true }
    );
    res.send(genre);
  } catch (error) {
    return notFound(res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    res.send(genre);
  } catch (error) {
    return notFound(res);
  }
});

module.exports = router;
