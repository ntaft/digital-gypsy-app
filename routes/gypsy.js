const router = require('express').Router();
const { getSavedCities, saveCity, deleteCity } = require('../models/gypsy.js');

// Get all saved cities
router.get('/', getSavedCities, (req, res) => {
  console.log('get all saved cities');
  res.json(res.saved);
});

// Save city to gypsy API
router.post('/', saveCity, (req, res) => {
  console.log('City saved!');
});

// Delete city from API
router.delete('/:id', deleteCity, (req, res) => {
  console.log('City has been removed from list.');
});

module.exports = router;
