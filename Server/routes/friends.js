// routes/auth/friends.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust the path as necessary

// ====== Routes ======

// Get all friends of a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("friends", "name email");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, friends: user.friends });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a friend
router.post("/", async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and friendId required" });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Prevent duplicates
    if (user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already friends" });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ success: true, message: "Friend added", friends: user.friends });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove a friend
router.delete("/", async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) {
      return res
        .status(400)
        .json({ success: false, message: "userId and friendId required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.friends = user.friends.filter(
      (id) => id.toString() !== friendId.toString()
    );
    await user.save();

    res.json({
      success: true,
      message: "Friend removed",
      friends: user.friends,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
