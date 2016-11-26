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

// // Get a list of all cities that match user input
// router.get('/:month/:type/:limit/:temp', searchByParameters, (req, res) => {
//   res.json(res.nomad);
// })

// // Get nomad data on a specific city
// router.get('/city/:city', searchByCity, (req, res) => {
//   res.json(res.city);
// })

module.exports = router;
