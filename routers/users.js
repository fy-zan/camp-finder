const express = require("express");
const passport = require("passport");
const { nextTick } = require("process");
const User = require("../models/user");
const asyncCatch = require("../utils/asyncCatch")
const router = express.Router({mergeParams: true});
const users = require("../controllers/users")

router.get("/register", users.renderRegister)

router.post("/register", asyncCatch(users.register));

router.get("/login", users.renderLogin);

router.post("/login", passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), users.login)

router.get("/logout", users.logout)

module.exports = router;