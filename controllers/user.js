const User = require("../models/user")

module.exports.renderSignUp = (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
      let { username, password, email } = req.body;

      const newUser = new User({
        email: email,
        username: username,
      });

      let result = await User.register(newUser, password);
      req.login(result, (err) => {
        if (err) {
          return next(err);
        }

        req.flash("success", "Welcome to Wanderlust");
        console.log(result);
        return res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", "User name already exists");
      res.redirect("/signup");
    }
}

module.exports.renderLogin = (req, res) => {
// console.log(req.originalUrl)
  
  res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    // console.log(req.originalUrl);
    req.flash("success", "login successfully");
    if(res.locals.url){
      return res.redirect(res.locals.url);
    }
    return res.redirect("/listings")
}

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged out!");
    res.redirect("/listings");
  });
}