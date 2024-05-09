const mongoose = require("mongoose");

const rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      required: true,
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 30,
          required: true,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          minlength: 10,
          maxlength: 10,
          required: true,
        },
      }),
    },

    movie: {
      required: true,
      type: new mongoose.Schema({
        title: {
          type: String,
          minlength: 5,
          maxlength: 255,
          trim: true,
          required: true,
        },
        dailyRentalRate: {
          type: Number,
          min: 0,
          max: 255,
          default: 0,
          required: true,
        },
      }),
    },

    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dateReturned: {
      type: Date,
    },

    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

module.exports = rental;
