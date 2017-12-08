var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var userController = {};

userController.authenticated = (req, res, next) => {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.isAuthenticated())
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
}

// Post registration
userController.signup = (req, res) => {
  User.register(new User({ username : req.body.username}), req.body.password, function(err, user) {
    if (err) {
          throw new Error('Registration error');
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Post login
userController.login = (req, res) => {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

console.log("Auth setup");

module.exports = userController;