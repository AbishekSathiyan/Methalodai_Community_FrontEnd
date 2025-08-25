const express = require("express");
const router = express.Router();
const TempUser = require("../models/TempUsers");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer");

function generateCustomId() {
  return crypto.randomBytes(8).toString("hex");
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// POST /api/auth/register
router.post("/", async (req, res) => {
  try {
    const { email, password, name, fatherName, dob, phone } = req.body;

    if (!email || !password || !name || !dob)
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });

    // Remove existing temp user
    const existingTemp = await TempUser.findOne({ email });
    if (existingTemp) await existingTemp.deleteOne();

    const otp = generateOTP();
    const customId = generateCustomId();

    const tempUser = new TempUser({
      email,
      password,
      name,
      fatherName,
      dob: new Date(dob),
      phone: phone || "",
      customId,
      isVerified: false,
    });
    await tempUser.save();

    await VerificationToken.create({
      userId: tempUser._id,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail({
      to: email,
      subject: "🔐 Your OTP for Methalodai Community",
      html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0fbf5; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); padding: 30px; text-align: center;">
        <h1 style="color: #1e7d34; font-size: 28px;">🌴 Methalodai Community</h1>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">Use the OTP below to verify your email address:</p>
        <div style="margin: 20px 0;">
          <span style="display: inline-block; font-size: 28px; letter-spacing: 5px; font-weight: bold; background-color: #e8f5e9; color: #1e7d34; padding: 12px 25px; border-radius: 10px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #999;">Valid for 1 minute only.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa;">If you didn’t request this OTP, please ignore this email. 🌞</p>
      </div>
    </div>
  `,
    });

    res
      .status(201)
      .json({ success: true, message: "OTP sent to email", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

module.exports = router;
