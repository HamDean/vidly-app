const mongoose = require("mongoose");
const express = require("express");
const { customerInterface } = require("../schema");
const { badRequest, notFound } = require("../utils");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
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
    unique: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (error) {
    console.log("error", error.message);
    return notFound(res);
  }
});

router.post("/", async (req, res) => {
  const { error } = customerInterface.validate(req.body);
  if (error) return badRequest(res, error);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  //   await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
      { new: true }
    );
    res.send(customer);
  } catch (error) {
    console.log(error.message);
    return notFound(res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (error) {
    return notFound(res);
  }
});

module.exports = router;

// seperate the db connection to the app.js
// sort customers by name
// cutomize not found genres/customers
