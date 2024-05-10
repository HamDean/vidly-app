const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const express = require("express");
const { userSchema } = require("../schema");
const { badRequest } = require("../utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return badRequest(res, error);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  user.password = hashed;
  await user.save();

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
