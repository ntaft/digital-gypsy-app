const router = require('express').Router();

router.get('/:city', (req, res) => {
  res.json('city');
});

module.exports = router;
