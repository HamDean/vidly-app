const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

mongoose
  .connect("mongodb://localhost:27017/customers")
  .then(() => console.log("connected successfully..."))
  .catch((err) => console.log("could not connect :(", err));

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    lowercase: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
});

const Customer = mongoose.model("Customer", customerSchema);



module.exports = router;
