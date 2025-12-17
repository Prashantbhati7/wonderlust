const mongoose = require("mongoose");
const { ref } = require("process");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./users.js");
const listingSchema = new Schema({       //schema validation
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>  v === "" ?"https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v ,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:"anonmyous",
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing) await Review.deleteMany({_id:{$in:listing.reviews}});
});
const Listing= mongoose.model("Listing",listingSchema);

module.exports = Listing;