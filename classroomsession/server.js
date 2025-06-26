const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(flash());
app.use(session({secret:"mysupersecretstring",
    resave: false,
    saveUninitialized: true
}));
app.get("/register",(req,res)=>{
    let {name = "anonymous"}= req.query;
    req.session.name = name;               // this will create a new key value pair that will get stored in req.session for the whole session kind of cookie 
    req.flash("success","new user register");
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    // console.log(req.flash());
    res.render("server.ejs",{name:req.session.name,msg:req.flash("success")});
})
app.get("/count",(req,res)=>{
    if (req.session.count){
        req.session.count++;
    }
    else req.session.count=1;
    res.send( `you sent a req ${req.session.count} times`);
})
app.get("/test",(req,res)=>{
   
    res.send(`successful`);
})

app.listen(3000,()=>{
    console.log("server is listening to port 3000");
});