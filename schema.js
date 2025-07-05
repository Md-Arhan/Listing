const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().allow("", null)
        }).required()
    }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
       rating : Joi.number().required().min(1).max(5),
       comment : Joi.string().required()
    }).required()
})


/*npm package Joi

What is Joi (in npm)?
👉 Joi is a data validation library for JavaScript — very popular when working with Express and Node.js apps.

🔑 Why do we use Joi?
When your backend receives data (from forms, APIs, users, etc), you must validate it before processing or storing it.
Is title present?
Is price a number?
Is email valid?
Is image an object with a valid URL?
Instead of manually writing if statements everywhere, Joi allows you to write a schema that defines what valid data looks like.
Then Joi automatically checks incoming data against this schema.
*/