const mongoose = require("mongoose");

const Genre = mongoose.model(
    "Genre",
    new mongoose.Schema({
      genre: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
      },
    })
  );

  module.exports = Genre;