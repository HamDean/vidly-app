const express = require("express");
const genres = require('./data')
const schema = require('./schema')
const { badRequest, lookUpGenre, notFound} = require('./utils')
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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
