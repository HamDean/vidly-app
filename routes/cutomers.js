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

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  await customer.save();
  res.send(customer);
});

module.exports = router;
