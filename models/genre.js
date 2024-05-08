const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

exports.genre = Genre;
exports.genreSchema = genreSchema;