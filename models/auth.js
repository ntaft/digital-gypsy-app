// bcrypt auth code adapted from example from Rafa @ GA. Thanks!
const bcrypt = require('bcryptjs');
const { getUserByUsername, getUserById } = require('../models/user');
const jwt = require('jsonwebtoken');

function logIn(req, res, next) {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  }
  console.log(loginData.username);
  getUserByUsername(loginData.username).then((userDB) => {
    const matches = bcrypt.compareSync(loginData.password, userDB.password);
  // console.log(loginData.password, matches);
    if (matches) {
      console.log(userDB);
      res.user = userDB;
      // req.session.userID = userDB.id;
      next();
    } else {
      res.user = false;
      next();
    }
  });
}

// authenticate - Middleware to protect routes
function verifyUser(req, res, next) {
  const token = req.body.token
  if (token) {
    const decoded = jwt.decode(token, { complete: true })
    jwt.verify(decoded, process.env.JWT_SECRET, (err, user) => {
      if (err) next(err);
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
    // req.session.userID = null;
  }
}

module.exports = {
  logIn,
  verifyUser,
};
