const Listing = require("../models/listing");
const User= require("../models/users");
const Review = require("../models/review");

module.exports.login=(req,res)=>{
    console.log(req);
    res.render("signup/login");
};
module.exports.loggedin = async(req,res)=>{
    req.flash("success","logged in successfully");
    if (res.locals.redirectUrl) res.redirect(res.locals.redirectUrl);
    else res.redirect("/listings");
};

module.exports.loggedout = (req,res)=>{
    req.logOut((err)=>{
        if (err){
            req.flash("error",error);
            res.redirect("/listings");
        }
        else {
            req.flash("success","logged out successfully ");
            res.redirect("/listings");
        }
    })
};

module.exports.singnin = (req,res)=>{
    res.render("signup/signup");
};

module.exports.siggnedup = async(req,res)=>{
    try{
    let {username , email ,password} = req.body;
    let newUser = new User({email,username});
    const registereduser =await  User.register(newUser,password);
    req.logIn(registereduser,(err)=>{
        if (err){
            next(err);
        }
        else {
            req.flash("success","user registered successfully ");
            res.redirect("/listings");
        }
    })
}catch(err){
    console.log(err.message);
    req.flash("error",err.message);
    res.redirect("/signup");
}
};