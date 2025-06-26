const mongoose = require("mongoose");
const { ref } = require("process");
const Schema = mongoose.Schema;
const User = require("./users.js");
const reviewSchema = new Schema ({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }

})

module.exports = mongoose.model("Review",reviewSchema);