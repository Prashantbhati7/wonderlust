const { findById } = require("./models/review");
const Listing =require("./models/listing");
const Review  = require("./models/review");

module.exports.isloggedin= ((req,res,next)=>{
    //console.log(req);
    if (!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in first to perform this operation ! ");
        return res.redirect(`/login`);
    }
    next();
});
module.exports.saveRedirectUrl = ((req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
       
    }
    next();
})

module.exports.isowner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (res.locals.request.user &&  !listing.owner._id.equals(res.locals.request.user._id)){
        req.flash("error","you don't have access to this listing");
        return res.redirect(`/listings/${id}`);
    }
   next();
};

module.exports.isauthor = async (req,res,next)=>{
    let {id,reviewid} = req.params;
    console.log("id is ");
    console.log(id);
    let review = await  Review.findById(reviewid);
    if (res.locals.request.user && !review.owner._id.equals(res.locals.request.user._id)){
        req.flash("error","you don't have permission to delete this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}