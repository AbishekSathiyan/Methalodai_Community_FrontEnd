const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    fatherName: { type: String },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    location: { type: String },
    bio: { type: String },
    jobTitle: { type: String },
    website: { type: String },
    photoURL: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ✅ Email verification
    isVerified: { type: Boolean, default: false },

    // ✅ Unique custom ID to avoid duplicate key errors
    customId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
