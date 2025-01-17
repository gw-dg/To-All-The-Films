const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const trendingRoutes = require("./routes/trendingRoutes");
const genreRoutes = require("./routes/genreRoutes");
const titleDetailRoutes = require("./routes/titleDetailRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  ///server to client
  response.json({
    message: "Server is running " + PORT,
  });
});

app.use("/api", trendingRoutes);
app.use("/api", genreRoutes);
app.use("/api", titleDetailRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {});
});
