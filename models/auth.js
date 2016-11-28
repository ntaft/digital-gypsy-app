// bcrypt auth code adapted from example from Rafa @ GA. Thanks!
const bcrypt = require('bcryptjs');
const { getUserByUsername } = require('../models/user');
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
  loginData = {
    username: req.body.username,
    password: req.body.password,
  }
  console.log(loginData.password);
  getUserByUsername(loginData.username).then((userDB) => {
    const matches = bcrypt.compareSync(loginData.password, userDB.password);
  console.log(loginData.password, matches);
    if (matches) {
      // req.session.userId = dbUser.id;
      res.user = userDB
      res.session.userID = userDB.id;
      next();
    } else {
      res.user = false;
    }
  });
}

function signupUser (req, res, next) {
var hash = bcrypt.hashSync(body.password.trim(), 10);
var user = new User({
 name: body.name.trim(),
 username: body.username.trim(),
 email: body.email.trim(),
 password: hash,
 admin: false,
 isEmailVerified: false
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
var token = req.body.token || req.query.token;
 if (!token) {
  return res.status(401).json({message: ‘Must pass token’});
 }
// Check token that was passed by decoding token using secret
jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
   if (err) throw err;
  //return user using the id from w/in JWTToken
   User.findById({
   ‘_id’: user._id
   }, function(err, user) {
      if (err) throw err;


// authenticate - Middleware to protect routes
function verifyToken(req, res, next) {
  const token = req.body.token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if err throw err;
    // returns the user by fetching the id from the database
    })
    getUserById(user.id).then((dbUser) => {
      res.user = dbUser;
      next();
    }).catch((err) => {
      throw (err);
    });
  } else {
    res.user = false;
    req.session.userID = null;
  };
}

module.exports = {
  logIn,
  authenticate,
  authToken
};
