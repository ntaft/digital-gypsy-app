// bcrypt auth code adapted from itunes example from Rafa @ GA. Thanks!
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const passport = require('passport');
const passportLocal = require('passport-local');


 // logIn - Middleware to compare password from login form with password
 // from the user in the DB. If matches, the user Id is stored in the session.

//  passport.authenticate('local', { session: false }), (req, res) => {
//    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
//      expiresIn: 86400 // expires in 24 hours
// }
// passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

function logIn(req, res, next) {
  const userPayload = req.body.user;
  // token signed using secret in .env. token expires in 24 hours
  const token = jwt.sign(req.user, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
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

//https://github.com/passport/express-4.x-local-example/blob/master/server.js
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
//
// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });
//
// passport.deserializeUser(function(id, userObj) {
//   db.users.findById(id, function (err, user) {
//     if (err) { return userObj(err); }
//     userObj(null, user);
//   });
// });

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

function authToken () {
  passport.authenticate('local', {
    session: true, // prob needs to serialize/deserialize?
    failureRedirect: '/login' // might be optional
 }), (req, res) => {
  // get private key from .env
    var cert = process.env.JWT_SECRET;
    // sign a new encrypted token that expires in 24h
    var token = jwt.sign(req.user, cert, {
      algorithm: 'RS256'
      expiresIn: '24h'
    }, (err, token) => {
      // sends a json token
      if err console.log err;
      console.log(token)
      res.json({token});
    });
  };
}

module.exports = {
  logIn,
  authenticate,
  authToken
};
