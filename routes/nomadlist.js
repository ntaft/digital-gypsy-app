const router = require('express').Router();
const { searchByParameters, searchByCity } = require('../services/nomadlist.js');

// Get a list of all cities that match user input
router.get('/:month/:type/:limit/:temp', searchByParameters, (req, res) => {
  res.json(res.nomad);
})

// Get nomad data on a specific city
router.get('/city/:city', searchByCity, (req, res) => {
  res.json(res.city);
})

module.exports = router;
