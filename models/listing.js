const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const Schema = mongoose.Schema;
const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1743385779331-487e8391bf08?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const listingSchema = new Schema({
    title : {
        type: String,
        required : true
    },
    description : String,
    image : {
        filename : {type : String},
        url : {
            type : String,
            // default : DEFAULT_IMAGE_URL,
            // set: (v) => (v === "" ? DEFAULT_IMAGE_URL : v),
        },
    },
    price : Number,
    country : String,
    location : String, 
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref : "Review",    //review model
        }
    ],
    owner : {
        type: Schema.Types.ObjectId,
        ref : "User",
    }
});

listingSchema.post("findOneAndDelete", async (doc) => {
    if(doc){
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;


/*
 So when you write:
doc._id → gives you "123"

doc.reviews → gives you ["a", "b", "c"]

✅ Both are directly accessible — there’s no problem accessing reviews directly. You can access both directly.
🔑 The confusion happens inside your deleteMany() query:
This works:

await Review.deleteMany({ _id: { $in: doc.reviews } });
This would fail:

await Review.deleteMany({ reviews: { $in: doc.reviews } });
👉 Because you're querying the Review collection now.
Review model documents do not have a reviews field — they only have _id and other fields.
You cannot query by reviews field in the Review collection because that field doesn't exist there. */