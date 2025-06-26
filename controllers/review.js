const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.destroyreview=async (req,res)=>{
    let {id, reviewid} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listings/${id}`);
};

module.exports.showreview = (req,res)=>{
    let {id} = req.params;
    res.redirect(`/listings/${id}`);
};

module.exports.newreview = async (req,res)=>{
    let {id,reviewid} = req.params;
    let listing =await Listing.findById(id);
    let newreview = new Review(req.body.review);
  // console.log(res.locals.request.user);
    newreview.owner = res.locals.request.user;
    //console.log(newreview);
    // res.send(newreview);
    //console.log("new review is ");
    //console.log(newreview);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    console.log("review saved ");
    res.redirect(`/listings/${id}`)
};