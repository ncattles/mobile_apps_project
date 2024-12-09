const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Review = mongoose.model("Review");

const router = express.Router();

// middleware for authentication
router.use(requireAuth);

// add review for specific restaurant
router.post("/restaurants/:id/reviews", async (req, res) => {
  const { id } = req.params; // restaurantId from the URL
  const { category, item, description, rating, images } = req.body;

  // validate fields
  if (!category || !item || !description || !rating) {
    return res.status(422).send({ error: "Category, item, description, and rating are required." });
  }

  if (rating < 1 || rating > 5) {
    return res.status(422).send({ error: "Rating must be between 1 and 5." });
  }

  try {
    const review = new Review({
      restaurantId: id, // directly associate review with restaurantId
      category,
      item,
      description,
      rating,
      images: images || [], // default to empty array if no images provided
      user: req.user._id, // associate review with authenticated user
    });

    await review.save();
    res.send(review);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong." });
  }
});

// get reviews for a specific restaurant
router.get("/restaurants/:id/reviews", async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ restaurantId: id }).populate("user", "email");
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong." });
  }
});

module.exports = router;
