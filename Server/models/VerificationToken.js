// models/VerificationToken.js
const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: Number, required: true },  // change from 'token' to 'otp'
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
