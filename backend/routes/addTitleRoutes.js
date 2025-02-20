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

router.delete("/favorite/:titleId", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { titleId } = req.params;

  try {
    if (!titleId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (!mongoUser.favMovies) {
      return res.status(404).json({ message: "No favorite movies found" });
    }

    const movieIndex = mongoUser.favMovies.findIndex(
      (movie) => movie.movieId.toString() === titleId.toString()
    );

    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found in favorites" });
    }

    const removedMovie = mongoUser.favMovies[movieIndex];
    mongoUser.favMovies.splice(movieIndex, 1);
    await mongoUser.save();

    res.status(200).json({
      message: "Movie removed from favorites successfully",
      name: removedMovie.movieName,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.get("/favorite/:titleId", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { titleId } = req.params;
  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const movieIndex = mongoUser.favMovies.findIndex(
      (movie) => movie.movieId.toString() === titleId.toString()
    );
    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie is Not Favorited" });
    } else return res.status(200).json({ message: "Movie is Favorited" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.post("/add/director", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { director } = req.body;
  try {
    if (!director)
      return res.status(400).json({ error: "Director Name is required" });
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (!mongoUser.preference) {
      mongoUser.preference = { favDirectorId: [] };
    }

    if (!mongoUser.preference.favDirectorId) {
      mongoUser.preference.favDirectorId = [];
    }

    const directorIndex = mongoUser.preference.favDirectorId.findIndex(
      (dir) =>
        dir.toString().toLowerCase() === director.toString().toLowerCase()
    );

    if (directorIndex === -1) {
      // console.log(director);
      mongoUser.preference.favDirectorId.push(director.toLowerCase());
    }

    await mongoUser.save();
    res.status(200).json({
      message: "Director added successfully",
      name: director.toLowerCase(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.post("/add/actor", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { actor } = req.body;
  try {
    if (!actor)
      return res.status(400).json({ error: "Actor Name is required" });
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (!mongoUser.preference) {
      mongoUser.preference = { favActorId: [] };
    }

    if (!mongoUser.preference.favActorId) {
      mongoUser.preference.favActorId = [];
    }

    const actorIndex = mongoUser.preference.favActorId.findIndex(
      (act) => act.toString().toLowerCase() === actor.toString().toLowerCase()
    );

    if (actorIndex === -1) {
      // console.log(actor);
      mongoUser.preference.favActorId.push(actor.toLowerCase());
    }

    await mongoUser.save();
    res.status(200).json({
      message: "Actor added successfully",
      name: actor.toLowerCase(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.post("/add/genre", async (req, res) => {
  const sessionCookie = req.cookies.session;
  const { genre } = req.body;
  try {
    if (!genre)
      return res.status(400).json({ error: "Genre Name is required" });
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (!mongoUser.preference) {
      mongoUser.preference = { favGenreId: [] };
    }

    if (!mongoUser.preference.favGenreId) {
      mongoUser.preference.favGenreId = [];
    }

    const genreIndex = mongoUser.preference.favGenreId.findIndex(
      (gen) => gen.toString().toLowerCase() === genre.toString().toLowerCase()
    );

    if (genreIndex === -1) {
      // console.log(director);
      mongoUser.preference.favGenreId.push(genre.toLowerCase());
    }

    await mongoUser.save();
    res.status(200).json({
      message: "Genre added successfully",
      name: genre.toLowerCase(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
