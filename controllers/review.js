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
    let {id} = req.params;
    let listing =await Listing.findById(id);
    
    let newreview = new Review(req.body.review);
    
    newreview.owner = res.locals.request.user;
   
    //res.send(newreview);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
   
    res.redirect(`/listings/${id}`)
};