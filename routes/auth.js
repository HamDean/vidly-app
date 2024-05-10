const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../models/user");
const express = require("express");
const { authSchema } = require("../schema");
const { badRequest } = require("../utils");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) return badRequest(res, error);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password");

  res.send("authenticated");
});

module.exports = router;
