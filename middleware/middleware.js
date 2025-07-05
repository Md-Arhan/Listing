const Listing = require("../models/listing");
const Review = require("../models/review.js")
const { listingSchema, reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    req.session.url = req.originalUrl;
    // console.log(req.session.url)
    req.flash("error", "must be logged in!!");
    return res.redirect("/login");
  }
  next();
};

module.exports.savedRedirectUrl = (req, res, next) =>{
  if(req.session.url){
    res.locals.url = req.session.url;
  }
  next();
}

module.exports.isOwner = async (req, res, next) =>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.user._id)){
      req.flash("error", "unauthorized person");
      return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  let { error, value } = listingSchema.validate(req.body);
  console.log(error);
  console.log(value);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error, value } = reviewSchema.validate(req.body);
  console.log(error);
  console.log(value);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
} 


module.exports.isAuthor = async (req, res, next) =>{
  let {id, reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.user._id)){
      req.flash("error", "unauthorized person");
      return res.redirect(`/listings/${id}`);
  }
  next();
}