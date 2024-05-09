const _ = require("lodash");
const User = require("../models/user");
const express = require("express");
const { userSchema } = require("../schema");
const { badRequest } = require("../utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return badRequest(res, error);

  try {
    const user = new User(_.pick(req.body, ["name", "email", "password"]));

    await user.save();

    res.send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    return res.status(400).send("User already exists");
  }
});

module.exports = router;
