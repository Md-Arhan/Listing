const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware/middleware");
const { signUp, renderSignUp, renderLogin, login, logout } = require("../controllers/user");

router.route("/signup")
.get(renderSignUp)
.post(wrapAsync(signUp));

router.route("/login")
.get(renderLogin)
.post(
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), wrapAsync(login));

router.get("/logout", logout);

module.exports = router;
