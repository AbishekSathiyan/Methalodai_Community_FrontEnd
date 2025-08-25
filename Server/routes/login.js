const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetch = require("node-fetch");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    email = email.trim().toLowerCase(); // Ensure email is lowercase

    // 1️⃣ Check if user exists in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "This Account doesn't exist in our Community. Please sign up first.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // 2️⃣ Authenticate with Firebase
    const firebaseRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    ).then((r) => r.json());

    if (firebaseRes.error) {
      let message = firebaseRes.error.message;

      switch (message) {
        case "EMAIL_NOT_FOUND":
          message = "This account doesn't exist. Please sign up first.";
          break;
        case "INVALID_PASSWORD":
          message = "Incorrect password. Please try again.";
          break;
        case "USER_DISABLED":
          message = "Your account has been disabled. Contact support.";
          break;
        default:
          message = "Login failed. Please check your credentials.";
      }

      return res.status(401).json({ success: false, message });
    }

    // 3️⃣ Return success with tokens
    res.json({
      success: true,
      token: firebaseRes.idToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});

module.exports = router;
