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

  // get a single review
  router.get('/reviews/:id', requireAuth, async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).populate('user', 'email');
      if (!review) {
        return res.status(404).send({ error: 'Review not found' });
      }
      res.send(review);
    } catch (err) {
      res.status(500).send({ error: 'Error fetching the review.' });
    }
  });

  // delete a review
  router.delete("/restaurants/:restaurantId/reviews/:reviewId", async (req, res) => {
    const { restaurantId, reviewId } = req.params;

    try {
      const review = await Review.findOneAndDelete({ _id: reviewId, restaurantId });
      if (!review) {
        return res.status(404).send({ error: "Review not found" });
      }

      res.send({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).send({ error: "Something went wrong" });
    }
    });

  // like a review
  router.patch("/reviews/:id/like", requireAuth, async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).send({ error: "Review not found" });
      }
      review.likes = (review.likes || 0) + 1; // Ensure likes is not undefined
      await review.save();
      res.send(review);
    } catch (err) {
      res.status(500).send({ error: "Error liking the review." });
    }
  });

  // dislike a review
  router.patch("/reviews/:id/dislike", requireAuth, async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).send({ error: "Review not found" });
      }
      review.dislikes = (review.dislikes || 0) + 1; // Ensure dislikes is not undefined
      await review.save();
      res.send(review);
    } catch (err) {
      res.status(500).send({ error: "Error disliking the review." });
    }
  });

module.exports = router;