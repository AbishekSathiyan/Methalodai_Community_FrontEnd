const express = require("express");
const router = express.Router();
const TempUser = require("../models/TempUsers");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const admin = require("../firebaseAdmin");
const sendEmail = require("../utils/mailer");

// POST /api/auth/otp
router.post("/", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP required" });

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser)
      return res.status(404).json({
        success: false,
        message: "User not found or already verified",
      });

    const record = await VerificationToken.findOne({
      userId: tempUser._id,
      otp,
    });
    if (!record)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (record.expiresAt < Date.now()) {
      await record.deleteOne();
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Create user in Firebase
    const firebaseUser = await admin.auth().createUser({
      email: tempUser.email,
      password: tempUser.password,
      displayName: tempUser.name,
      emailVerified: true,
    });

    // Create user in MongoDB
    const user = new User({
      firebaseUid: firebaseUser.uid,
      name: tempUser.name,
      fatherName: tempUser.fatherName,
      dob: tempUser.dob,
      email: tempUser.email,
      phone: tempUser.phone,
      isVerified: true,
      customId: tempUser.customId || `USER_${Date.now()}`, // fallback to prevent validation error
    });
    await user.save();

    // Cleanup temp data
    await tempUser.deleteOne();
    await record.deleteOne();

    // Send welcome email
    await sendEmail({
      to: user.email,
      subject: "🎉 Welcome to Methalodai Community!",
      html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0fbf5; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 30px; text-align: center;">
        <h1 style="color: #1e7d34; font-size: 28px;">🎉 Welcome, ${user.name}!</h1>
        <p style="font-size: 16px; color: #555;">You’re now a proud member of the Methalodai Community 🌴</p>
        <p style="font-size: 16px; color: #555;">Explore the village, connect with friends, and stay updated with community news.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa;">We’re happy to have you! 🌞</p>
      </div>
    </div>
  `,
    });

    res.json({
      success: true,
      message: "OTP verified. Registration complete!",
      user,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "OTP verification failed" });
  }
});

module.exports = router;
