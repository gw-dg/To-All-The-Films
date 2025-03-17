const express = require("express");
const User = require("../models/user");
const admin = require("../config/firebaseAdmin");
require("dotenv").config();
const router = express.Router();
const { Pinecone } = require("@pinecone-database/pinecone");

const api_key = process.env.pinecone_api_key3;
const pc = new Pinecone({ apiKey: `${api_key}` });
const index = pc.index("to-all-the-films");

// console.log(index);

router.get("/recommendations", async (req, res) => {
  const sessionCookie = req.cookies.session;
  try {
    if (!sessionCookie) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);

    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const favoriteMovieIds = mongoUser.favMovies.map((movie) => movie.movieId);

    const highRatedMovieIds = mongoUser.movies_watched
      .filter((movie) => Number(movie.rating) >= 4)
      .map((movie) => movie.movieId);

    const uniqueMovieIds = [
      ...new Set([...favoriteMovieIds, ...highRatedMovieIds]),
    ];

    if (uniqueMovieIds.length === 0) {
      return res.json({ recommendations: [] });
    }

    console.log("Fetching similar movies for IDs:", uniqueMovieIds);

    const vectors = await index.fetch(uniqueMovieIds);
    // console.log(vectors);
    if (!vectors || !vectors.records) {
      //   console.error("Error: No vectors found for the given IDs.", vectors);
      return res
        .status(404)
        .json({ message: "No recommendations found from these movies." });
    }

    if (Object.keys(vectors.records).length === 0) {
      //   console.warn("Warning: Pinecone returned an empty result.");
      return res.status(404).json({ message: "No recommendations found." });
    }

    // if (!vectors || Object.keys(vectors.vectors).length === 0) {
    //   //This counts the number of keys (movie IDs) in vectors.vectors.
    //   return res.json({ recommendations: [] });
    // }

    const queryVectors = Object.values(vectors.records).map((v) => v.values);
    const queries = queryVectors.map((vector) =>
      index.query({
        vector: vector,
        topK: 10,

        filter: {
          vote_count: { $gte: 50 },
          average_rating: { $gte: 1 },
          hybrid_score: { $gte: 0.5 },
        },
        includeMetadata: true,
      })
    );

    const results = await Promise.all(queries);

    const recommendedMovies = results.flatMap((result) =>
      result.matches.map((match) => ({
        movieId: match.id,
        score: match.score,
        metadata: match.metadata,
      }))
    );

    res.json({ recommendations: recommendedMovies });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
