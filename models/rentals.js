const mongoose = require("mongoose");
const Customer = require("./cutomer");

const rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: Customer,
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  })
);

module.exports = rental;
