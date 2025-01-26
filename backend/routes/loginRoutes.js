const express = require("express");
const axios = require("axios");
const admin = require("../config/firebaseAdmin");
const User = require("../models/user");
require("dotenv").config();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID Token is required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const firebaseUID = decodedToken.uid;

    const mongoUser = await User.findOne({ firebaseUID });
    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn,
    });

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      message: "Login successful",
      user: {
        username: mongoUser.username,
        email: mongoUser.email,
      },
    });
  } catch (error) {
    console.error("Session creation failed:", error);
    res.status(401).json({
      message: "Session creation failed",
      error: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  const { idToken, username } = req.body;

  if (!idToken || !username) {
    return res
      .status(400)
      .json({ message: "ID Token and username are required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUID = decodedToken.uid;

    const existingUser = await User.findOne({
      $or: [{ firebaseUID }, { username }, { email: decodedToken.email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.username === username
            ? "Username already exists"
            : "User already exists",
      });
    }

    const newUser = new User({
      firebaseUID,
      email: decodedToken.email,
      username,
    });

    await newUser.save();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn,
    });

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({
      message: "Error registering user",
      error: error.message,
    });
  }
});

router.post("/login/auth", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID Token is required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ firebaseUID: decodedToken.uid });

    if (!user) {
      const firebaseUser = await admin.auth().getUser(decodedToken.uid);

      // unique username if user not found
      const username =
        firebaseUser.displayName ||
        `user${Math.random().toString(36).substr(2, 9)}`;

      user = new User({
        firebaseUID: decodedToken.uid,
        email: firebaseUser.email,
        username: username,
      });

      await user.save();
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn,
    });

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("OAuth login error:", error);
    res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
});

router.get("/session/validate", async (req, res) => {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ isLoggedIn: false, message: "No session" });
  }

  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const mongoUser = await User.findOne({ firebaseUID: decodedClaims.uid });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }
    res.status(200).json({
      isLoggedIn: true,
      user: decodedClaims,
      username: mongoUser.username,
    });
  } catch (error) {
    res.status(401).json({ isLoggedIn: false, message: "Invalid session" });
  }
});

router.post("/logout", (req, res) => {
  console.log("logout initiated");
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
