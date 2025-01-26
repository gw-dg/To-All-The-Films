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
    required: true,
  },
  movieName: {
    type: String,
  },
  posterPath: {
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

const favoritesSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
  },
  posterPath: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
    default: "",
  },
  movies_watched: { type: [moviesWatchedSchema], default: [] },
  favMovies: { type: [favoritesSchema], default: [] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
