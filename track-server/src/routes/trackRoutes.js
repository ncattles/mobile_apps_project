const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ error: "Name and locations are required" });
  }

  try {
    const track = new Track({ userId: req.user._id, name, locations });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: "Could not save track" });
  }
});

module.exports = router;
