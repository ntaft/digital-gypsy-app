// adapted from user/auth management routes attributed to Rafa @ GA. Thanks!

const loginRouter = require('express').Router();
const { logIn } = require('../lib/auth');
const { createUser } = require('../models/user');


/**
 * Log In and if successful assign res.user._id to the session
 * It uses the logIn middleware from the auth library to parse the form inputs
 * and save the user to the database
 */
loginRouter.post('/login', logIn, (req, res) => {
  res.redirect('/');
});

// assigns null to the session cookie userID
// then redirects to the login page
loginRouter.delete('/', (req, res) => {
  req.session.userId = null;
  res.redirect('/login');
});

// if posting to newuser, collect form data
// create a new user and redirect to homepage
loginRouter.post('/signup', createUser, (req, res) => {
  res.redirect('/');
});

module.exports = loginRouter;
