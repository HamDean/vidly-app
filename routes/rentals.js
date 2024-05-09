const {Customer} = require("../models/cutomer")
const Movie = require("../models/movie")
const Rental = require("../models/rentals");
const express = require("express");
const { rentalSchema } = require("../schema");
const { badRequest } = require("../utils");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = rentalSchema.validate(req.body);
  if (error) return badRequest(res, error);

  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId)

  const rental = new Rental({
    customer: {
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
    },
    movie: {
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
    },
  });

  await rental.save();

  res.send(rental);
});

module.exports = router;
