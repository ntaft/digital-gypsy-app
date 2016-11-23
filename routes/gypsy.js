const router = require('express').Router();
const { saveCity } = require('../models/gypsy.js');

// Get all saved cities
router.get('/', (req, res) => {
  res.json('gypsy');
})

// Save city to gypsy API
router.post('/', saveCity, (req, res) => {
  console.log('City saved!');
});

module.exports = router;
