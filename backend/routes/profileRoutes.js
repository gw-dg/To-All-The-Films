const express = require("express");
const User = require("../models/user");
const admin = require("../config/firebaseAdmin");
require("dotenv").config();
const router = express.Router();

router.get("/profile/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const sessionCookie = req.cookies.session;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    let isItYourOwnId = false;

    if (sessionCookie) {
      try {
        const decodedClaims = await admin
          .auth()
          .verifySessionCookie(sessionCookie, true);
        isItYourOwnId =
          decodedClaims.uid.toString() === user.firebaseUID.toString();
      } catch (err) {
        console.error("Session verification failed:", err.message);
      }
    }

    res.json({
      user: {
        username: user.username,
        email: user.email,
        about: user.about || "",
        backgroundImage: user.backgroundImage,
        profileImage: user.profileImage,
        isOwnProfile: isItYourOwnId,
      },
      stats: {
        moviesWatched: user.movies_watched,
        favoriteMovies: user.favMovies,
        preferences: {
          favoriteActors: user.preferrence?.favActorId?.length || 0,
          favoriteActresses: user.preferrence?.favActoressId?.length || 0,
          favoriteDirectors: user.preferrence?.favDirectorId?.length || 0,
          favoriteGenres: user.preferrence?.favGenreId?.length || 0,
        },
      },
      recentActivity: user.movies_watched
        .sort((a, b) => b.dateWatched - a.dateWatched)
        .slice(0, 5)
        .map((movie) => ({
          movieId: movie.movieId,
          rating: movie.rating,
          dateWatched: movie.dateWatched,
          posterPath: movie.posterPath,
          movieName: movie.movieName,
        })),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
