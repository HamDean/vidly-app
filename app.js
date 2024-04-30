const express = require("express");
const Joi = require("joi");
const { badRequest, lookUpGenre, notFound} = require('./utils')
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const genres = [
  { id: 1, genre: "adventure" },
  { id: 2, genre: "fantasy" },
  { id: 3, genre: "horro" },
  { id: 4, genre: "comedy" },
];

const schema = Joi.object({
  genre: Joi.string().required(),
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = lookUpGenre(req.params.id);

  if (!genre) return res.status(404).send("No genre found :(");

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const newGenre = req.body;

  const { error } = schema.validate(newGenre);
  if (error) return badRequest(res, error)

  const genre = {
    id: genres.length + 1,
    genre: newGenre.genre,
  };

  genres.push(genre);

  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genreBody = req.body;

  const genre = lookUpGenre(req.params.id);

  if (!genre) return notFound(res)

  const { error } = schema.validate(genreBody);
  if (error) return badRequest(res, error);

  genre.genre = genreBody.genre;

  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
    const genre = lookUpGenre(req.params.id)

    if(!genre) return notFound(res);

    const index = genres.indexOf(genre);
    genres.splice(index, 1)

    res.send(genre)
})

app.listen(port, () => console.log(`listening on port ${port}`));
