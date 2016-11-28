// adapted from user/auth management routes attributed to Rafa @ GA. Thanks!
// referenced https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#.97do466y7
// for auth techniques using jwt

const loginRouter = require('express').Router();
const { logIn } = require('../lib/auth');
const { createUser, getUserByUsername, getUserById } = require('../models/user');
const { createToken } = require('../lib/token');
// const { authenticate } = require('../lib/auth');

// decodes token
// var decoded = jwt.decode(token, {complete: true})

// authenticates the login, and if true send a json token
loginRouter.post('/login', logIn, (req, res) => {
  // if it is not a match, send back an error
  if (res.user === false ) {
   res.status(401)
    .json({
      error: true,
      message: 'Wrong Username or Password'
    });
  } else {
    const user = {
      username: res.user.username,
      id: res.user.id
    }
    const token = createToken(user)
    res.json({
      user: user,
      token: token,
      error: false
    })
  };
});

// assigns null to the session cookie userID
// then redirects to the login page
loginRouter.delete('/logout', (req, res) => {
  req.session.userId = null;
  res.json('logged out')
})

// if posting to newuser, collect form data
// sends token of user data
loginRouter.post('/signup', createUser, (req, res) => {
  const user = {
    username: res.user.username,
    id: res.user.id
  }
  const token = createToken(user)
  res.json({
    user: user,
    token: token,
  })

loginRouter.get('/verify', verifyUser, (req, res) => {
  // if it is not a match, send back an error
  if (res.user === false ) {
   res.status(401)
    .json({
      error: true,
      message: 'Unauthenticated User'
    });
  } else {
    const user = {
      username: res.user.username,
      id: res.user.id
    };
    const token = createToken(user)
    res.json({
      user: user,
      token: token,
    });
  };
});

module.exports = loginRouter;
