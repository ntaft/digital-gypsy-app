const db = require('../db/db.js');

// Go to the database and get all cities the user has saved
function getSavedCities(req, res, next) {
  db.any(`SELECT * FROM savedcities
  WHERE user_id = $/user_id/;`, req.params)
  .then((saved) => {
    res.saved = saved;
    next();
  })
  .catch(error => next(error));
}

// The user will saved a city to their collection
function saveCity(req, res, next) {
  console.log('save model');
  db.none(`INSERT INTO savedcities
           (user_id, city, country, slug, nomadScore, wifi, fun, safety, lat, lng, cost, img)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
           [req.body.user_id, req.body.city, req.body.country, req.body.slug, req.body.nomadScore, req.body.wifi, req.body.fun, req.body.safety, req.body.lat, req.body.lng, req.body.cost, req.body.img])
  .then((city) => {
    res.city = city;
    next();
  })
  .catch(err => next(err));
}

// The user can delete a city from their collection
function deleteCity(req, res, next) {
  console.log('delete city');
  db.none(`DELETE FROM savedcities
           WHERE id = $1;`,
           [req.params.id])
  .then(next())
  .catch(err => next(err));
}

// The user can add notes to a city within their collection
function updateCity(req, res, next) {
  console.log(req.body.notes);
  console.log(req.body.id);
  db.none(`UPDATE savedcities
           SET notes = $1
           WHERE id = $2;`,
           [req.body.notes, req.body.id])
  .then(() => console.log('Update complete!'))
  .then(next())
  .catch(err => next(err));
}

module.exports = {
  getSavedCities,
  saveCity,
  deleteCity,
  updateCity,
};
