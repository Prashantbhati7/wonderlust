const express= require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const Listing = require("../models/listing.js");
const listings = require("../routes/listing.js");
const { listingSchema } = require("../schema.js");
const passport = require("passport");
const {isloggedin,saveRedirectUrl,isowner} = require("../middleware.js");
const { request } = require("http");
const listingcontroller = require("../controllers/listing");

router.route("/").get(wrapAsync(listingcontroller.index)).post(wrapAsync(listingcontroller.newlisiting));

router.get("/new",isloggedin,(listingcontroller.newform));   //should always be before /:id becase if /:id came before then new could be misinterpreted as id 



router.route("/:id")
 .get(wrapAsync(listingcontroller.showlisting))
 .patch(wrapAsync(listingcontroller.updatedlisting));



router.get("/:id/edit",isowner,isloggedin,wrapAsync(listingcontroller.editlisting));



router.get("/:id/remove",isloggedin,isowner,wrapAsync(listingcontroller.remove));

module.exports = router;