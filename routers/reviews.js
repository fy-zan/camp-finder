const express = require("express");
const { builtinModules } = require("module");
const router = express.Router({mergeParams: true});
const asyncCatch = require("../utils/asyncCatch");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Campground = require("../models/campground");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const reviews = require("../controllers/reviews")

router.post("/", isLoggedIn, validateReview, asyncCatch(reviews.createReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, asyncCatch(reviews.destroyReview))

module.exports = router;
