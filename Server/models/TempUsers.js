const mongoose = require("mongoose");

const TempUsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fatherName: { type: String },
  dob: { type: Date, required: true },
  phone: { type: String },
  firebaseUid: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TempUsers", TempUsersSchema);
