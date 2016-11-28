// parts of bcrypt auth code adapted from example from Rafa @ GA. Thanks!
const bcrypt = require('bcryptjs');
const { createToken, comparePassword } = require('../lib/token.js');
const { getUserByUsername, getUserById } = require('../models/user');
const jwt = require('jsonwebtoken');
const psql = require('../db/db.js');

function logIn(req, res, next) {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  }
  console.log(loginData.username);
  getUserByUsername(loginData.username).then((userDB) => {
    const matches = bcrypt.compareSync(loginData.password, userDB.password);
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

// authenticates the user
function verifyUser(req, res, next) {
  const token = req.body.token
  console.log(req.body.token);
  if (token) {
    // const decoded = jwt.decode(token, { complete: true });
    // returns the user by fetching the id from the database
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      res.send(err)
      next(err)
    }
      // res.user = getUserById(req.body.id)
      res.token = createToken(req.body.id)
      next();
  } else {
    res.token = {
      error: true,
      message: 'Unauthenticated User',
      }
      next();
    // req.session.userID = null;
  }
}

module.exports = {
  logIn,
  verifyUser,
};
