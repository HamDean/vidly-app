const mongoose = require("mongoose");
const express = require("express");
const { customerInterface } = require("../schema");
const { badRequest } = require("../utils");
const router = express.Router();

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
  const { error } = customerInterface.validate(req.body);
  if (error) return badRequest(res, error);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  await customer.save();
  res.send(customer);
});

module.exports = router;
