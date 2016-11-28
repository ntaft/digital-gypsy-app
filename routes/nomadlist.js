const router = require('express').Router();
const { fetchAllCities, getWorkPlaces } = require('../services/nomadlist.js');

// Get a list of all cities
router.get('/cities', fetchAllCities, (req, res) => {
  res.json(res.cities);
});

// Get list of places to work for a specific city
router.get('/work/:slug', getWorkPlaces, (req, res) => {
  res.json(res.workData);
});

module.exports = router;
