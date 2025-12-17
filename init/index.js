const mongoose = require("mongoose");
const initialdata = require("./data.js");
const Listing = require("../models/listing.js");

let main = async function(){
    
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust")
}
main().then((res)=>{
    console.log("connected to database successfully ");
}).catch((err)=>{
    console.log(err);
});

let initdb = async function(){
    await Listing.deleteMany({});
    initialdata.data = initialdata.data.map((obj)=>({
        ...obj,
        owner:"685afbcc07dca92dd7efbf2e",
    }));
    await Listing.insertMany(initialdata.data);
    console.log("database initialised successfully ");
}

initdb();