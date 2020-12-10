const express = require('express');
const router = express.Router();

// @route   GET api/patient-detail
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Patient Detail route'));

module.exports = router;