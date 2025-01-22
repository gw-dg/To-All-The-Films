const express = require("express");
const axios = require("axios");
const admin = require("../config/firebaseAdmin");
const User = require("../models/user");
require("dotenv").config();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const signInResult = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const firebaseUID = signInResult.data.localId;

    const mongoUser = await User.findOne({ firebaseUID });

    if (!mongoUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const idToken = signInResult.data.idToken;
    const expiresIn = 60 * 60 * 24 * 10 * 1000;

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use secure in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      maxAge: expiresIn,
    });

    res.json({
      message: "Login successful",
      user: {
        username: mongoUser.username,
        email: mongoUser.email,
        id: mongoUser._id,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(400).json({
      message: "Login failed",
      error: err.message,
    });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    const newUser = new User({
      firebaseUID: firebaseUser.uid,
      email: firebaseUser.email,
      username: username,
    });

    await newUser.save();

    const idToken = await admin.auth().createCustomToken(firebaseUser.uid);
    const expiresIn = 60 * 60 * 24 * 10 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use secure in production
      sameSite: "none",

      maxAge: expiresIn,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: username,
        email: firebaseUser.email,
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

      user = new User({
        firebaseUID: decodedToken.uid,
        email: firebaseUser.email,
        username: firebaseUser.displayName,
      });

      await user.save();
    }

    const expiresIn = 60 * 60 * 24 * 10 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use secure in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      maxAge: expiresIn,
    });

    res.json({
      message: "User logged in successfully",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    console.error("OAuth login error:", err);
    res.status(400).json({
      message: "Error authenticating user",
      error: err.message,
    });
  }
});

router.get("/session/validate", async (req, res) => {
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res
      .status(401)
      .json({ isLoggedIn: false, message: "No session found" });
  }

  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    return res.status(200).json({ isLoggedIn: true, user: decodedClaims });
  } catch (error) {
    console.error("Session validation failed:", error);
    return res
      .status(401)
      .json({ isLoggedIn: false, message: "Invalid or expired session" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
