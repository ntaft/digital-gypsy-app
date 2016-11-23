const router = require('express').Router();
const nomadService = require('../models/gypsy.js');
const { authenticate } = require('../lib/auth');


router.get('/', authenticate, (req, res) => {
  res.json('gypsy');
})

module.exports = router;
