const express = require('express');
const router = express.Router();

// @route   GET api/prescriptions
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Prescriptions route'));

module.exports = router;