const router = require('express').Router();
const { searchByParameters } = require('../services/nomadlist.js');

router.get('/:month/:type/:limit/:temp', searchByParameters, (req, res) => {
  res.json(res.nomad);
})

module.exports = router;
