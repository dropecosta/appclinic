const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Patient = require('../../models/Patient');
// const User = require('../../models/User');
// const Post = require('../../models/Post');

// @route   GET api/patients
// @desc    Test route
// @access  Public
// router.get('/', (req, res) => res.send('Patients route'));

// @route   POST api/patients
// @desc    Register patient route
// @access  Public
router.post(
    '/',
      check('name', 'O campo nome é obrigatório').not().isEmpty(),
      check('email', 'O campo tem que ser um email válido').isEmail(),
      check('telephone', 'O campo telefone é obrigatório').not().isEmpty(),
    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // destructure the request
      const { name, email, telephone, healthcare } = req.body;
  
      try {
        // see if user exists
        let user = await User.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Patient already exists' }] });
        }

        const newPatient = new Patient({
          name,
          email,
          telephone,
          healthcare
        });
  
        const patient = await newPatient.save();
  
        res.json(patient);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

module.exports = router;