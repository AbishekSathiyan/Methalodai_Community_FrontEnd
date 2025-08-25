// routes/profile.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const admin = require("../firebaseAdmin");
const verifyToken = require("../middleware/auth");

// ------------------- GET Profile -------------------
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
    const allowedUpdates = [
      "name", "fatherName", "phone", "location",
      "bio", "jobTitle", "dob", "website", "photoURL"
    ];

    const filteredUpdates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowedUpdates.includes(k))
    );

    if (filteredUpdates.dob) {
      const dobDate = new Date(filteredUpdates.dob);
      if (isNaN(dobDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid date format for date of birth" });
      }
      filteredUpdates.dob = dobDate;
    }

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

    if (filteredUpdates.name) {
      try {
        await admin.auth().updateUser(req.user.uid, { displayName: filteredUpdates.name });
      } catch (firebaseError) {
        console.error("Failed to update Firebase user:", firebaseError);
      }
    }

    res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
