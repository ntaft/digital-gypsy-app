const fetch = require('node-fetch');

// This function will hit the nomad list API and search for cities that match the user input. The paramaters that the user can search by are month and weather (cold, mild, warm, or hot)
// The month will be indicated by its numerical equivalent
// Type, limit and temp are parameters dealing with the weather conditions
// The type will be either lt (less than) or gt (greater than)
// Limit will be either max or min
// Temp will refer to either the maximum or minimum temperature
function searchByParameters(req, res, next) {
  fetch(`https://nomadlist.com/api/v2/filter/city?c=2&f1_target=month&f1_type=em&f1_value=${req.params.month}&f2_target=temperatureF&f2_type=${req.params.type}&f2_${req.params.limit}=${req.params.temp}`)
  .then(r => r.json())
  .then((nomadData) => {
    res.nomad = nomadData.slugs;
    next();
  })
  .catch(err => next(err));
}

// This function will search for nomad data for a single city
function searchByCity(req, res, next) {
  console.log(req.params.city);
  fetch(`https://nomadlist.com/api/v2/list/cities/${req.params.city}`)
  .then(r => r.json())
  .then((cityData) => {
    res.city = cityData;
    next();
  })
  .catch(err => next(err));
}


module.exports = {
  searchByParameters,
  searchByCity
};




