const mongoose = require("mongoose");
const preferrenceSchema = new mongoose.Schema({
  favActorId: [
    {
      type: String,
    },
  ],
  favActoressId: [
    {
      type: String,
    },
  ],
  favDirectorId: [
    {
      type: String,
    },
  ],
  favGenreId: [
    {
      type: String,
    },
  ],
});

const moviesWatchedSchema = new mongoose.Schema({
  movieId: {
    type: String,
  },
  rating: {
    type: String,
  },
  dateWatched: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  preferrence: preferrenceSchema,
  backgroundImage: {
    type: String,
    default: "https://artshortlist.com/files/48502313109648854.jpg",
  },
  profileImage: {
    type: String,
    default: "https://artshortlist.com/files/48502313109648854.jpg",
  },
  about: {
    type: String,
  },
  movies_watched: [moviesWatchedSchema],
  favMovies: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
