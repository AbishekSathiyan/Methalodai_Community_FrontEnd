const express = require("express");
const router = express.Router();

// Import individual routes
const registerRoute = require("./register");
const loginRoute = require("./login");
const otpRoute = require("./otp");
const profileRoute = require("./profile");
const usersRoute = require("./users");
const friendsRoute = require("./friends");

// Mount routes
router.use("/register", registerRoute); // /api/auth/register
router.use("/login", loginRoute);       // /api/auth/login
router.use("/otp", otpRoute);           // /api/auth/otp
router.use("/profile", profileRoute);   // /api/auth/profile
router.use("/users", usersRoute);       // /api/auth/users
router.use("/friends", friendsRoute);   // /api/auth/friends

module.exports = router;
