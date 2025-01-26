const express = require("express");
const User = require("../models/user");
const admin = require("../config/firebaseAdmin");
require("dotenv").config();
const router = express.Router();

router.post("/add", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { rating, title, titleId, dateWatched, posterPath } = req.body;
  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (!mongoUser.movies_watched) {
      mongoUser.movies_watched = [];
    }
    // console.log(titleId)
    if (!titleId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    const movieIndex = mongoUser.movies_watched.findIndex(
      (movie) => movie.movieId.toString() === titleId.toString()
    );

    if (movieIndex === -1) {
      const newTitle = {
        movieId: titleId,
        movieName: title,
        posterPath,
        rating,
        dateWatched,
      };
      mongoUser.movies_watched.push(newTitle);
    } else {
      mongoUser.movies_watched[movieIndex].rating = rating;
      mongoUser.movies_watched[movieIndex].dateWatched = dateWatched;
      mongoUser.movies_watched[movieIndex].posterPath = posterPath;
    }

    await mongoUser.save();
    res.status(200).json({ message: "Movie logged successfully", name: title });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.post("/favorite", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { title, titleId, posterPath } = req.body;
  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }
    if (!mongoUser.favMovies) {
      mongoUser.movies_watchefavMoviesd = [];
    }

    if (!titleId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    const movieIndex = mongoUser.favMovies.findIndex(
      (movie) => movie.movieId.toString() === titleId.toString()
    );

    if (movieIndex === -1) {
      const newTitle = {
        movieId: titleId,
        movieName: title,
        posterPath,
      };
      mongoUser.favMovies.push(newTitle);
    }

    await mongoUser.save();
    res
      .status(200)
      .json({ message: "Movie favorited successfully", name: title });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
