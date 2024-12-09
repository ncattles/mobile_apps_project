const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register user
router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role: role || "user" });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token, role: user.role });
  } catch (err) {
    res.status(422).send({ error: "Failed to sign up" });
  }
});

// Login user
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "Invalid email or password" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token, role: user.role });
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
