
const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const passpostLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    // name:{
    //     type:String,        //passportlocalmongoose define usernmae and password automatically along with hashed and salt password 
 
    //     required:true,
    // },
    email:{
        type:String,
        required:true,
    },
    // password:{
    //     type:string,
    //     required:true,
    // },
});
userSchema.plugin(passpostLocalMongoose)
const User = mongoose.model("User",userSchema);

module.exports = User;