const jwt = require("jsonwebtoken");
const User = require("../models/user");


const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next(); // User is logged in, proceed to the next middleware/route
  } else {
    return res.redirect('/login'); // Redirect to login page if not authenticated
  }
};

  
  
  module.exports = isAuthenticated ;