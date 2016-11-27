// adapted from user/auth management routes attributed to Rafa @ GA. Thanks!

const loginRouter = require('express').Router();
const { logIn } = require('../lib/auth');
const { createUser } = require(../models/user);
const { fetchAllCities } =require('../services/nomadlist')
// const { authenticate } = require('../lib/auth');



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

// decodes token
var decoded = jwt.decode(token, {complete: true})

 /**
  * Log In and if successful assign res.user._id to the session
  * It uses the logIn middleware from the auth library to parse the form inputs
  * and save the user to the database
  */

loginRouter.post('/login', logIn, (req, res) => {
  res.redirect('/');
})

// assigns null to the session cookie userID
// then redirects to the login page
loginRouter.delete('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
})

// if posting to newuser, collect form data
// create a new user and redirect to homepage
loginRouter.post('/signup', createUser, (req, res) => {
  res.redirect('/');
});

module.exports = loginRouter;
