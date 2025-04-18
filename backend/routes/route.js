const express = require("express");
const route = express.Router();
const passport = require("../config/passport");
const {
  verifyGoogleToken,
} = require("../contollers/authentication");

route.post("/auth/google/verify", verifyGoogleToken);
module.exports = route;
