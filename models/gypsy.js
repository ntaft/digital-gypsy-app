const db = require('../db/db.js');

function saveCity(req, res, next) {
  console.log('save model');
  db.none(`INSERT INTO savedcities
           (user_id, city, country, nomadScore, wifi, fun, safety, lat, lng, cost, img)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
           [req.body.user_id, req.body.city, req.body.country, req.body.nomadScore, req.body.wifi, req.body.fun, req.body.safety, req.body.lat, req.body.lng, req.body.cost, req.body.img])
  .then((city) => {
    res.city = city;
    next();
  })
  .catch(err => next(err));
}

module.exports = {
  saveCity,
};
