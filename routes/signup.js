const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams:true});
const User = require("../models/users.js");
const usercontroller= require("../controllers/user.js");


router.get("/signup",(usercontroller.singnin));



router.post("/signup",wrapAsync(usercontroller.siggnedup));
module.exports = router;