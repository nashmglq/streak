const express = require("express")
const route = express.Router()
const passport = require("../config/passport");
const { getGoogle } = require("../contollers/authentication");

route.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
route.get('/auth/google/callback', getGoogle)


module.exports = route