const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  const tokenSecret = process.env.TOKEN_SECRET;

  //check if jwt exist
  if (token) {
    jwt.verify(token, tokenSecret, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  const tokenSecret = process.env.TOKEN_SECRET;

  if (token) {
    jwt.verify(token, tokenSecret, async (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
