const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   POST api/users
// @desc    Register user route
// @access  Public
router.post('/', [
    check('name', 'O campo nome é obrigatório')
        .not()
        .isEmpty(),
    check('email', 'O campo tem que ser um email válido')
        .isEmail(),
        check('password', 'O campo senha é obrigatório')
        .isLength({ min: 6 })
], 
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
});

module.exports = router;