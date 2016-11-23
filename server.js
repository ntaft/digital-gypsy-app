require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.argv[2] || process.env.port || 3000;
const SECRET = 'superdupersecret';

// import router for our API
const gypsyRouter = require('./routes/gypsy');

// user auth router for login
const userRouter = require('./routes/gypsy');

// import router for our external API
const nomadRouter = require('./routes/nomadlist');

// This is how we read the cookies sent over from the browser
app.use(cookieParser());

// activates session cookies
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

// set up some logging
app.use(logger('dev'));

// This will parse our playload from fetch which is sent as a JSON object
app.use(bodyParser.json());

// set default static assets folder
app.use(express.static(path.join(__dirname, 'dist')));

// map our routes
app.use('/gypsy', gypsyRouter);
app.use('/nomad', nomadRouter);
app.use('/login', userRouter);

app.listen(PORT, () => { console.log('Wanderlust 🌍')});
