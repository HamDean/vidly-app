const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require('./routes/cutomers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')

mongoose
  .connect("mongodb://localhost:27017/vidly", { useNewUrlParser: true })
  .then(() => console.log("connection to database successfull..."))
  .catch((err) => console.log("could not connect to databse :(", err));


app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers)
app.use("/api/movies", movies)
app.use("/api/rentals", rentals)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));