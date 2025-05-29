const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

const api_key = process.env.api_key;

router.get("/genre-list/movie", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching trending movie genres:", err.message);
    res.status(500).json({
      error: "An error occurred while fetching trending movie genres",
    });
  }
});

router.get("/genre-list/tv", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?language=en`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching trending TV Show genres:", err.message);
    res.status(500).json({
      error: "An error occurred while fetching trending TV show genres",
    });
  }
});

router.get("/discover/movie", async (req, res) => {
  const { genreId, page } = req.query;
  if (!genreId) return res.status(400).json({ error: "genre is required" });
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&vote_count.gte=300&with_genres=${genreId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    res.status(500).json({ error: "Error occured during fetching data" });
  }
});

router.get("/discover/tv", async (req, res) => {
  const { genreId, page } = req.query;
  if (!genreId) return res.status(400).json({ error: "genre is required" });
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&vote_count.gte=300&with_genres=${genreId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching TV shows:", error.message);
    res.status(500).json({ error: "Error occured during fetching data" });
  }
});

module.exports = router;
