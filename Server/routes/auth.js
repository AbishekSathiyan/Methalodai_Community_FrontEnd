const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const admin = require("../firebaseAdmin"); // Firebase Admin SDK

// ------------------- Register -------------------
// routes/auth.js
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, customId, dob } = req.body;

    if (!name || !email || !password || !customId || !dob) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'The email address is already in use by another account.'
      });
    }

    const newUser = new User({ name, email, password, customId, dob });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ------------------- Login -------------------
router.post("/login", async (req, res) => {
  // Login handled on frontend via Firebase Auth
  res.json({ success: true, message: "Use Firebase Auth on frontend for login" });
});

// ------------------- Profile -------------------
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).select("-__v");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------- Update Profile -------------------
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const allowedUpdates = ["name", "phone", "bio", "location", "photoURL", "dob", "jobTitle", "website"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
    );

    // Validate date if provided
    if (updates.dob) {
      const dobDate = new Date(updates.dob);
      if (isNaN(dobDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid date format for dob" });
      }
      updates.dob = dobDate;
    }

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-__v");

    // Update Firebase displayName if name changed
    if (updates.name) {
      try {
        await admin.auth().updateUser(req.user.uid, { displayName: updates.name });
      } catch (firebaseErr) {
        console.error("Firebase update error:", firebaseErr);
      }
    }

    res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
