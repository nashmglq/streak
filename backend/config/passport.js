const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Passport is for authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        // null = error, profile = data
      return done(null, profile); 
    }
  )
);

module.exports = passport


