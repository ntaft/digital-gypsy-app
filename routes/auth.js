// adapted from user/auth management routes attributed to Rafa @ GA. Thanks!

const loginRouter = require('express').Router();
// const { logIn } = require('../lib/auth');
const { createUser } = require('../models/user');
// const { authenticate } = require('../lib/auth');

// decodes token
// var decoded = jwt.decode(token, {complete: true})

// still working on a login solution...
loginRouter.post('/login', (req, res) => {
  res.redirect('/');
})

// assigns null to the session cookie userID
// then redirects to the login page
loginRouter.delete('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
})

// if posting to newuser, collect form data
// temporarily sends unencoded userId
loginRouter.post('/signup', createUser, (req, res) => {
  res.json(req.session.userId);
});

module.exports = loginRouter;
