// models/Friend.js
const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // the owner of the friends list
  friendName: { type: String, required: true },
  friendEmail: { type: String, required: true },
});

module.exports = mongoose.model("Friend", friendSchema);
