require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.argv[2] || process.env.port || 3000;

// import router for our API
const gypsyRouter = require('./routes/gypsy');

// import router for our external API
const nomadRouter = require('./routes/nomadlist');

// set up some logging
app.use(logger('dev'));

// This will parse our playload from fetch which is sent as a JSON object
app.use(bodyParser.json());

// set default static assets folder
app.use(express.static(path.join(__dirname, 'dist')));

// map our routes
app.use('/gypsy', gypsyRouter);
app.use('/nomad', nomadRouter);

app.listen(PORT, () => { console.log('Wanderlust 🌍')});
