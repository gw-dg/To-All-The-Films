const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const api_key = process.env.api_key;
router.get("/trending/movie", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWM0MTYyZTgzYzdkYjAzMzMyZjE4MjFlYmM1YzZmNiIsIm5iZiI6MTczNjYwMjgzMC45NjcsInN1YiI6IjY3ODI3NGNlOTBmNDJjMzI4MzdiMGI5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AXOvIZkCFRB_8DAQvJC5-u_VWkDa5TEGDcs2Kcl1bnk",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching trending movies:", err.message);
    res.status(500).json({
      error: "An error occurred while fetching trending movies",
    });
  }
});

router.get("/trending/tv", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWM0MTYyZTgzYzdkYjAzMzMyZjE4MjFlYmM1YzZmNiIsIm5iZiI6MTczNjYwMjgzMC45NjcsInN1YiI6IjY3ODI3NGNlOTBmNDJjMzI4MzdiMGI5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AXOvIZkCFRB_8DAQvJC5-u_VWkDa5TEGDcs2Kcl1bnk",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching trending TV Shows:", err.message);
    res.status(500).json({
      error: "An error occurred while fetching trending TV shows",
    });
  }
});

module.exports = router;
