const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

const api_key = process.env.api_key;

router.get("/search/:title/:page", async (req, res) => {
  const { title, page } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
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

module.exports = router;
