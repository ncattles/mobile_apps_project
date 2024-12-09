// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  images: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("Review", reviewSchema);
