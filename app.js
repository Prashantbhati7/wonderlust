

if(process.env.NODE_ENV !== "production"){

    require('dotenv').config();
}




const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const signup = require("./routes/signup.js");
const login = require("./routes/login.js");
const  cookieParser = require("cookie-parser");


const session =require("express-session");

const Mongostore  = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const multer  = require('multer')
const {storage} =require("./cloudconfig.js");
const upload = multer({ storage});



app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate);
app.use(methodOverride("_method"));
const { copyFileSync } = require("fs");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));


const dburl = process.env.ATLASDB_URL ;
console.log("url is ",dburl);


main().then(()=>{
    //console.log(data);
    console.log("connected to database ");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(process.env.ATLASDB_URL)
}
const port=8080;


const store = Mongostore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,          //information will update after 24hrs if no change and update occur in session/database 
})

store.on("error",()=>{
    console.log("error in mongo session store",err);
});

app.use(session({secret:process.env.SECRET,
    store:store,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
    }
}));

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.redirect("/listings");
});

app.use(cookieParser("secretCode"));
app.use(flash());

app.use(passport.initialize());         //middleware to initialize passport at every req should be after express session is defined and in use 
app.use(passport.session()) ;        // to identify the user during the session so that user don't need to log in again and again 
passport.use(new LocalStrategy(User.authenticate()));      // all the user send req must authenticate through LocalStrategy  using method .authenticate()   
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.deleted = req.flash("deleted");
    res.locals.error = req.flash("error");
    res.locals.request = req;
    next();
})



app.get("/getcookies",(req,res)=>{
    //res.cookie("testing","cookies");
    res.cookie("greeting","good morining ",{signed:true});
    res.cookie("message","bye bye !",{signed:true});
    res.send("browser has sent you signed cookies ");
})
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",signup);
app.use("/",login);

app.get("/error",(req,res)=>{
    throw  new ExpressError(400,"access denied");
})
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"} = err;
    console.log(message);
    res.status(status).send(message);
});
app.listen(port,()=>{
     console.log("listening to port 8080");
});
// app.get("/listings",async (req,res)=>{
    
//         const allListings = await Listing.find({});
//         res.render("listings/index",{allListings});
    

// });
// app.post("/listings",wrapAsync(async (req,res,next)=>{
//     // try{
//         let result=  listingSchema.validate(req.body);
//         console.log(result);
//         if(result.error){
//             next(result.error);
//         }
//         let listing= req.body;
//        const newlisting = new Listing(listing);       //creating document by parsing it into model Listing format 
//        await newlisting.save();                      //saving to database 
//        res.redirect("/listings");
//     // }catch(err){
//     //     next(err);
//     //}
// }));
// app.get("/listings/new",(req,res)=>{
//     res.render("listings/new");
// });
// app.patch("/listings/:id",wrapAsync(async (req,res,next)=>{
//     // try{
//         let newlisting = req.body;
//         let {id} = req.params;
//         await Listing.findByIdAndUpdate(id,newlisting);
//         res.redirect(`/listings/${id}`);
//     //}//catch(err){
//     //     next(err);
//     // }
// }));
// app.get("/listings/:id",wrapAsync(async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     console.log(listing);
//     res.render("listings/show",{listing});
// }));
// app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
//     const {id} = req.params;
//     const listing =await Listing.findById(id);
//     res.render("listings/edit",{listing});
// }));
// app.get("/listings/:id/remove",wrapAsync(async (req,res)=>{
//     let {id} = req.params;
//     await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
// }));
// app.get("/listings/:id/reviews",(req,res)=>{
    //     res.send("get req for /listings/:id/reviews");
    // });
    // app.delete("/listings/:id/reviews/:reviewid",wrapAsync(async (req,res)=>{
        //     let {id, reviewid} = req.params;
        //     await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewid}});
        //     await Review.findByIdAndDelete(reviewid);
        //     res.redirect(`/listings/${id}`);
        // }));
        // app.post("/listings/:id/reviews",async (req,res)=>{
            //     let {id} = req.params;
            //     let listing =await Listing.findById(id);
            //     let newreview = new Review(req.body.review);
            //     // console.log(newreview);
//     // res.send(newreview);
//     listing.reviews.push(newreview);
//     await newreview.save();
//     await listing.save();
//     console.log("review saved ");
//     res.redirect(`/listings/${id}`)
// })
// // app.all("*",(req,res,next)=>{
// //     next(new ExpressError(404,"page not found "));
// // });
// // app.use((err,req,res,next)=>{
// //     let {status=500,message=something went wrong !""} = err;
// //     res.status(status).send(message);
// // });