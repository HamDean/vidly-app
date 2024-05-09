const Rental = require("../models/rentals");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

module.exports = router;
