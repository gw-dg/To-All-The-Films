const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

const api_key = process.env.api_key;

router.get("/title/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos,images,credits`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching movie:", err.message);
    res.status(500).json({ err: "Error occured during fetching data" });
  }
});

router.get("/title/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=videos,images,credits`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching TV shows:", err.message);
    res.status(500).json({ err: "Error occured during fetching data" });
  }
});

module.exports = router;
