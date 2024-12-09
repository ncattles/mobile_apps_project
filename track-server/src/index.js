require("./models/User");
require("./models/Track");
require("./models/Review"); 
require("./models/Restaurant"); 

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); 
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(reviewRoutes);

// Use your MongoDB connection string here
const mongoUri =
  "mongodb://127.0.0.1:27017/track-app"; // For local MongoDB

// For MongoDB Atlas (use this format if you're using the cloud version)
// const mongoUri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/track-app?retryWrites=true&w=majority";

if (!mongoUri) {
  throw new Error("MongoURI was not supplied. Please check your configuration.");
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

mongoose.connection.on("error", (err) => {
  console.error("Error in MongoDB connection:", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
