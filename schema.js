// const joy = require("joi");
// const Listing = require("./models/listing");
// const Joi = require("joi");
// module.exports= listingSchema = Joi.object({
//     listing:Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         location:Joi.string().required(),
//         country:Joi.string().required(),
//         price:Joi.number().required().min(0),
//         image:Joi.string().allow("",null),
//     }).required()
// });


// schema.js
const Joi = require('joi');

const listingSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    image:Joi.string().allow("",null),
    location:Joi.string().required(),
    country:Joi.string().required(),
    // Add more fields based on your Listing model
});

module.exports = { listingSchema };
