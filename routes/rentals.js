const Fawn = require("fawn");
const mongoose = require("mongoose");
const { Customer } = require("../models/cutomer");
const Movie = require("../models/movie");
const Rental = require("../models/rentals");
const express = require("express");
const { rentalSchema } = require("../schema");
const { badRequest, notFound } = require("../utils");
const router = express.Router();

Fawn.init("mongodb://localhost:27017/vidly");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = rentalSchema.validate(req.body);
  if (error) return badRequest(res, error);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return notFound(res, "customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return notFound(res, "movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--; //* use transactions to ensure both rental and decreement of stocks are done successfully
  movie.save();

  res.send(rental);
});

module.exports = router;
