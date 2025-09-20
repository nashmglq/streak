const express = require("express");
const route = express.Router();
const passport = require("../config/passport");
const {
  verifyGoogleToken,
  getProfile,
  authCookie,
  logout,
} = require("../contollers/authentication");
const { authCheck } = require("../middleware/middleware");
const {
  postStreak,
  getStreak,
  getDetailViewStreak,
  addStreakCount,
  AIresponse,
  deleteStreak,
  updateStreak,
} = require("../contollers/streak");

route.post("/auth/google/verify", verifyGoogleToken);
route.get("/profile", authCheck, getProfile);
route.post("/streak-post", authCheck, postStreak);
route.get("/streak-get", authCheck, getStreak);
route.get("/streak-get/:streakId", authCheck, getDetailViewStreak);
route.post("/streak-add-count", authCheck, addStreakCount);
route.get("/streak-get-ai/:streakId", authCheck, AIresponse);
route.delete("/streak-delete/:streakId", authCheck, deleteStreak);
route.put("/streak-update", authCheck, updateStreak);
route.get("/auth-check", authCheck, authCookie);
route.post("/logout", authCheck, logout);

module.exports = route;
