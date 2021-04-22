const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user route
// @access  Public
router.post(
  '/',
    check('name', 'O campo nome é obrigatório').not().isEmpty(),
    check('email', 'O campo tem que ser um email válido').isEmail(),
    check('password', 'O campo senha é obrigatório').isLength({ min: 6 }),
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
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
        res.status(500).send('Server error!');
    }
  }
);

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.find().sort({ date: -1 });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/:id
// @desc     Get users by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/users/:id
// @desc     Update user
// @access   Private
router.put('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    user.name = req.body.name,
    user.email =  req.body.email,
    user.createdAt =  new Date()

    await user.save(user);

    res.status(200).json({
      message: 'Cliente encontrado e atualizado com sucesso!',
      success: true,
      user: user,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Private
router.delete('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    };

    await user.remove();

    res.json({ msg: 'Usuário removido' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


module.exports = router;
