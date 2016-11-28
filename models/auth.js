// bcrypt auth code adapted from example from Rafa @ GA. Thanks!
const bcrypt = require('bcryptjs');
const { getUserByUsername } = require('../models/user');
const passportLocal = require('passport-local');






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
// authenticate - Middleware to protect routes
function verifyToken(req, res, next) {
  const token = req.body.token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if err next(err);
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
