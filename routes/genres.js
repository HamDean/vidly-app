const express = require("express");
const router = express.Router();
const genres = require("../data");
const schema = require("../schema");
const { badRequest, lookUpGenre, notFound } = require("../utils");

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = lookUpGenre(req.params.id);

  if (!genre) return res.status(404).send("No genre found :(");

  res.send(genre);
});

router.post("/", (req, res) => {
  const newGenre = req.body;

  const { error } = schema.validate(newGenre);
  if (error) return badRequest(res, error);

  const genre = {
    id: genres.length + 1,
    genre: newGenre.genre,
  };

  genres.push(genre);

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
