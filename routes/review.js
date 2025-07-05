const express = require('express');
const app = express();
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Reviews = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isAuthor } = require('../middleware/middleware.js');
const { createReview, deleteReview } = require('../controllers/reviews.js');
  
//reviews route
router.post("/", validateReview, isLoggedIn, wrapAsync(createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(deleteReview));

module.exports = router;