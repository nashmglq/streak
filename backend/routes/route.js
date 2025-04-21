const express = require("express");
const route = express.Router();
const passport = require("../config/passport");
const {
  verifyGoogleToken,
  getProfile,
} = require("../contollers/authentication");
const {authCheck} = require("../middleware/middleware");
const { postStreak, getStreak } = require("../contollers/streak");

route.post("/auth/google/verify", verifyGoogleToken);
route.get("/profile", authCheck, getProfile)
route.post("/streak-post", authCheck, postStreak)
route.get("/streak-get", authCheck, getStreak)
module.exports = route;
