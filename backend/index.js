const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const trendingRoutes = require("./routes/trendingRoutes");
const genreRoutes = require("./routes/genreRoutes");
const titleDetailRoutes = require("./routes/titleDetailRoutes");
const loginRoutes = require("./routes/loginRoutes");
const profileRoutes = require("./routes/profileRoutes");
const addTitleRoutes = require("./routes/addTitleRoutes");
const searchRoutes = require("./routes/searchRoutes");
const chatRoutes = require("./routes/genAIRoutes");
const recommendationRoutes = require("./routes/getReccRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.json({
    message: "Server is running " + PORT,
  });
});

app.use("/api", trendingRoutes);
app.use("/api", genreRoutes);
app.use("/api", titleDetailRoutes);
app.use("/", recommendationRoutes);
app.use("/", loginRoutes);
app.use("/", profileRoutes);
app.use("/", addTitleRoutes);
app.use("/", searchRoutes);
app.use("/", chatRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {});
});
