const User = require("../models/user");
const express = require("express");
const { userSchema } = require("../schema");
const { badRequest } = require("../utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return badRequest(res, error);

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.send(user);
  } catch (error) {
    return res.status(400).send("User already exists");
  }
});

module.exports = router;
