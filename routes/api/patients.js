const express = require('express');
const router = express.Router();

// @route   GET api/patients
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Patients route'));

module.exports = router;