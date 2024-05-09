const { Customer } = require("../models/cutomer");
const express = require("express");
const { customerInterface } = require("../schema");
const { badRequest, notFound } = require("../utils");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (error) {
    console.log("error", error.message);
    return notFound(res, "customer");
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

  await customer.save();
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
    return notFound(res, "customer");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch (error) {
    return notFound(res, "customer");
  }
});

module.exports = router;
