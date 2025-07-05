const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find();

    res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewForm = (req, res) => {
  // console.log(req.user)
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id).populate({path : "reviews", populate: {path : "author"}}).populate("owner");
    // console.log(data.reviews[0].author.username)
    // console.log(req.user)
    if(!data){
      req.flash("error", "Listing does not exists");
      res.redirect("/listings");
      return;
    }

    // console.log(data.owner._id);
    // res.locals.owner = data.owner._id;

    res.render("listings/show.ejs", { data: data });
}


module.exports.createListing = async (req, res, next) => {
    if (!req.body) {
      throw new ExpressError(400, "Validation Error");   // if we not sending body it self then it is Validation Error
    }
    const newListing = new Listing(req.body.listing);
    let url = req.file.path
    let filename = req.file.filename
    newListing.image = {filename, url}
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing Created!")
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id);
    if (!data) {
      req.flash("error", "Listing does not exists");
      res.redirect("/listings");
      return;
    }
    let original = data.image.url;
    original = original.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { data, original });
}

module.exports.updateListing = async (req, res) => {
    if (!req.body) {
      throw new ExpressError(400, "Send valid data for listing");
    }
    let { id } = req.params;
    // console.log(res.locals.user)
    // console.log(listing);
    console.log(req.file)

    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true, runValidators: true }
    );

    if(typeof req.file !== "undefined"){
      let url = req.file.path
      let filename = req.file.filename
      listing.image = {filename, url}
      await listing.save();
    }

    req.flash("success", "Modified Successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}