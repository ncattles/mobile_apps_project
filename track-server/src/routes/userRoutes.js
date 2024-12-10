const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const requireAuth = require('../middlewares/requireAuth');

// get user details
router.get('/users/:id', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching user details.' });
  }
});

// fetch a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user); // respond with user data
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
