const router = require('express').Router();
const nomadService = require('../services/nomadlist.js');

router.get('/', (req, res) => {
  res.json('nomad');
})

module.exports = router;
