const express = require("express");
const route = express.Router();
const passport = require("../config/passport");
const { googleAuth, verifyGoogleToken } = require("../contollers/authentication");

// passport.authenticate(services, {scope you want to access})
// pic account
route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// passport.authenticate(services, {session if use or not, failureRedirect: redirection lin)
// this will save
route.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleAuth
);
route.post("/auth/google/verify", verifyGoogleToken);
module.exports = route;
