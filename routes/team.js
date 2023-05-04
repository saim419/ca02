const express = require('express');
const router = express.Router();

// Team page
router.get('/', (req, res) => {
  res.render('team');
});

module.exports = router;
