const Listing = require("../models/listing");
const Reviews = require("../models/review");

module.exports.createReview = async(req, res, next) => {   //child route
   console.log(req.params.id);
   let listing = await Listing.findById(req.params.id);
   let newReview = new Reviews(req.body.review);
   newReview.author = req.user._id;
   listing.reviews.push(newReview);

   await listing.save();
   await newReview.save();

   console.log("review saved");
   req.flash("success", "New Review Created!")
   res.redirect(`/listings/${req.params.id}`);
}

module.exports.deleteReview = async (req, res, next) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
  await Reviews.findByIdAndDelete(reviewId); 
  req.flash("success", "Review Deleted")
  res.redirect(`/listings/${id}`)
}