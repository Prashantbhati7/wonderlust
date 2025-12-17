const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index",{allListings});
};

module.exports.newform = (req,res)=>{
    res.render("listings/new");
};

module.exports.showlisting = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",
        populate: {
          path: "owner" // populate the owner inside each review
        }
        }).populate("owner");
    if (!listing){
        req.flash("error","listing does not exist ");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show",{listing});
};


module.exports.newlisiting = async (req,res,next)=>{
    // try{
        let result=  listingSchema.validate(req.body);
        console.log(result);
        if(result.error){
            next(result.error);
        }
        let listing= req.body;
       const newlisting = new Listing(listing);       //creating document by parsing it into model Listing format 
       newlisting.owner = req.user._id;           // assigning owner to listing by giving it id from req.user._id given during authentication feature of passport library 
       await newlisting.save();                      //saving to database 
       req.flash("success","new listing created successfully !");
       res.redirect("/listings");
    // }catch(err){
    //     next(err);
    //}
};

module.exports.editlisting = async (req,res)=>{
    const {id} = req.params;
    const listing =await Listing.findById(id);
    if (!listing){
        req.flash("error","listing does not exist ");
        res.redirect("/listings");
    }
    res.render("listings/edit",{listing});
};

module.exports.updatedlisting = async (req,res,next)=>{
    // try{
        console.log("got requst at updtaed listing ")
        let newlisting = req.body;
        let {id} = req.params;
        let listing = await Listing.findById(id);
        if (res.locals.request.user &&  !listing.owner._id.equals(res.locals.request.user._id)){
            req.flash("error","you don't have access to this listing");
            return res.redirect(`/listings/${id}`);
        }
        await Listing.findByIdAndUpdate(id,newlisting);
        res.redirect(`/listings/${id}`);
    //}//catch(err){
    //     next(err);
    // }
};

module.exports.remove = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted","listing deleted successfully !");
    res.redirect("/listings");
};