const express = require("express");
const route = express.Router();
const passport = require("../config/passport");
const {
  verifyGoogleToken,
  getProfile,
} = require("../contollers/authentication");
const {authCheck} = require("../middleware/middleware")

route.post("/auth/google/verify", verifyGoogleToken);
route.get("/profile", authCheck, getProfile)
module.exports = route;
