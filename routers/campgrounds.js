const express = require("express");
const { builtinModules } = require("module");
const router = express.Router({mergeParams: true});
const asyncCatch = require("../utils/asyncCatch");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds")
const multer = require("multer");
const {storage} = require("../cloudinary")
const upload = multer({storage});


const {isLoggedIn, isAuthor, validateCampground} = require("../middleware");
const campground = require("../models/campground");

router.get("/", campgrounds.index);

router.post("/", isLoggedIn, upload.array("image"), validateCampground, asyncCatch(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm)

router.get("/:id", asyncCatch(campgrounds.showCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, asyncCatch(campgrounds.renderEditForm));

router.put("/:id", isLoggedIn, isAuthor, upload.array("image"), validateCampground, asyncCatch(campgrounds.updateCampground));

router.delete("/:id", isLoggedIn, isAuthor, asyncCatch(campgrounds.destroyCampground));


module.exports = router;