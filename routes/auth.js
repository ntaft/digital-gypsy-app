// routes adapted from user/auth management routes attributed to Rafa @ GA. Thanks!
// referenced https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.97do466y7
// for auth techniques using jwt

const loginRouter = require('express').Router();
const { logIn, verifyUser, dansTempFunc } = require('../models/auth');
const { createUser } = require('../models/user');
const { createToken } = require('../lib/token');
// const { authenticate } = require('../lib/auth');

// decodes token
// var decoded = jwt.decode(token, {complete: true})

// authenticates the login, and if true send a json token
loginRouter.post('/login', (req, res) => res.json({message: 'user logged in!'}));

// assigns null to the session cookie userID
// then redirects to the login page
loginRouter.delete('/logout', (req, res) => {
  // req.session.userId = null;
  res.json('logged out');
});

// if posting to newuser, collect form data
// sends token of user data
loginRouter.post('/signup', createUser, (req, res) => {
  res.json({
    token: res.token,
    id: res.id
  });
});

loginRouter.post('/verify', verifyUser, (req, res) => {
  // if it is not a match, send back an error
  res.json({
    token: res.token,
    id: res.id
  });
});

module.exports = loginRouter;
