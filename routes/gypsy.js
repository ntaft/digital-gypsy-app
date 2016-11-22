const router = require('express').Router();
const nomadService = require('../models/gypsy.js');

router.get('/', (req, res) => {
  res.json('gypsy');
})

module.exports = router;
