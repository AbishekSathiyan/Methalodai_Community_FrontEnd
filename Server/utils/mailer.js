// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",       // Gmail SMTP host
  port: 587,                    // TLS port
  secure: false,                // false for TLS
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP connection error:", err);
  } else {
    console.log("✅ SMTP ready to send emails");
  }
});

module.exports = async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"Methalodai Community" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
};
