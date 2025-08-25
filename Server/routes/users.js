const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/auth");

// ------------------- Get Current User Profile -------------------
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const currentUserUid = req.user.uid; // set by verifyToken middleware
    const user = await User.findOne({ firebaseUid: currentUserUid }).select(
      "-password"
    ); // exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
});

module.exports = router;
