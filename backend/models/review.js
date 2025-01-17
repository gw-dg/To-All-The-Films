const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: True,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateReviewed: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
