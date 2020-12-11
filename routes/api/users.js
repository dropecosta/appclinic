const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

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
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
        // see if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'User already exists' }] });
        }
    
          user = new User({
            name,
            email,
            password,
            role
          });

          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(password, salt);

          await user.save();
        
        res.send('User route');

    } catch (error) {
        
    }

});


module.exports = router;