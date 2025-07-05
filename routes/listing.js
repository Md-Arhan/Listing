const express = require("express");
const app = express();
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware/middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js")
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn, validateListing, upload.single('listing[image][url]'), wrapAsync(ListingController.createListing));


router.get("/new", isLoggedIn, ListingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(isLoggedIn, isOwner, validateListing, upload.single('listing[image][url]'), wrapAsync(ListingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.editListing));

module.exports = router;

