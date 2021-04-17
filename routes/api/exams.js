const express = require('express');
const router = express.Router();

// @route   GET api/exams
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Exams route'));

module.exports = router;