const express= require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js")
const reviewController = require("../controllers/review.js");
const {isloggedin,saveRedirectUrl,isauthor} = require("../middleware.js");

router.delete("/:reviewid",isloggedin,isauthor,wrapAsync(reviewController.destroyreview));


router.get("/",(reviewController.showreview));


router.get("/:reviewid",(reviewController.showreview));


router.post("",isloggedin,wrapAsync(reviewController.newreview));

module.exports= router;