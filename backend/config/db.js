const mongoose = require("mongoose");
require("dotenv").config();
<<<<<<< HEAD
//const mongoUrl =
//  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";
=======
// const mongoUrl =
//   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";
//
>>>>>>> ed50622 (vercel)
const mongoUrl = `${process.env.MONGOURL}`;

//setup connection
async function connectDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("connect DB");
  } catch (error) {
    console.log("Mongodb connect error", error);
    process.exit(1);
  }
}

const db = mongoose.connection;

//temp event listeners
db.on("connected", () =>
  console.log("DB connection established successfully.")
);
db.on("disconnected", () => console.log("DB connection closed."));
db.on("error", (error) => console.error("DB connection error:", error));

module.exports = connectDB;
