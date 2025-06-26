const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const passport = require("passport");
const {isloggedin,saveRedirectUrl}= require("../middleware.js")
const usercontroller = require("../controllers/user.js");


router.get("/login",(usercontroller.login));



router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}) ,usercontroller.loggedin);



router.get("/logout",(usercontroller.loggedout));

module.exports = router;
