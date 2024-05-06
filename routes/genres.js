const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const schema = require("../schema");
const { badRequest, notFound } = require("../utils");

mongoose
  .connect("mongodb://localhost:27017/genres")
  .then(() => console.log("connection to database successfull..."))
  .catch((err) => console.log("could not connect to databse :("));

const Genre = mongoose.model("Genre", new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
}));

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  console.log(genres)
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

router.put("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });
  console.log(genre)
  if (!genre) return notFound(res);

  const genreBody = req.body;
  const { error } = schema.validate(genreBody);
  if (error) return badRequest(res, error);

  const result = await Genre.findByIdAndUpdate(req.params.id, {
    genre: genreBody.genre
  })

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    res.send(genre);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
