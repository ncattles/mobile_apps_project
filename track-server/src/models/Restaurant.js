const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resID: {
    type: String,
    required: true,
    unique: true,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: String, // admin user for restaurant
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
