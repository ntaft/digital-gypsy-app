const router = require('express').Router();
const { getSavedCities, saveCity } = require('../models/gypsy.js');

// Get all saved cities
router.get('/', getSavedCities, (req, res) => {
  console.log('get all saved cities');
  res.json(res.saved);
});

// Save city to gypsy API
router.post('/', saveCity, (req, res) => {
  console.log('City saved!');
});

module.exports = router;
