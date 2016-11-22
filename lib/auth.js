// Authentication code attributed to Rafa @ GA. Thanks!


const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

 // logIn - Middleware to compare password from login form with password
 // from the user in the DB. If matches, the user Id is stored in the session.
function logIn(req, res, next) {
  const userPayload = req.body.user;

  console.log(userPayload.password);
  userModel.getUserByUsername(userPayload.username).then((dbUser) => {
    const matches = bcrypt.compareSync(userPayload.password, dbUser.password);

  console.log(dbUser.password, matches);
    if (matches) {
      req.session.userId = dbUser.id;
      res.user = dbUser;
      next();
    } else {
      res.redirect('/');
    }
  });
}

// authenticate - Middleware to protect routes

function authenticate(req, res, next) {
  if (req.session.userId) {
    userModel.getUserById(req.session.userId).then((dbUser) => {
      res.user = dbUser;
      next();
    }).catch((err) => {
      console.log(err);
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = {
  logIn,
  authenticate,
};
