const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require('../../middleware/checkObjectId');

const Patient = require("../../models/Patient");

// @route   POST api/patients
// @desc    Register patient route
// @access  Public
router.post(
  "/",
  check("name", "O campo nome é obrigatório").not().isEmpty(),
  check("email", "O campo tem que ser um email válido").isEmail(),
  check("telephone", "O campo telefone é obrigatório").not().isEmpty(),

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
          .json({ errors: [{ msg: "Patient already exists" }] });
      }

      const newPatient = new Patient({
        name,
        email,
        telephone,
        healthcare,
      });

      const patient = await newPatient.save();

      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/patients
// @desc     Get all patients
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const patient = await Patient.find().sort({ date: -1 });
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/patients/:id
// @desc     Get patient by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
  
      if (!patient) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
  
      res.json(patient);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
});

// @route    PUT api/patients/:id
// @desc     Update patient
// @access   Private
router.put('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
  
      if (!patient) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
  
      patient.name = req.body.name,
      patient.email =  req.body.email,
      patient.telephone = req.body.telephone,
      patient.healthcare = req.body.healthcare,
      patient.createdAt =  new Date()
  
      await patient.save(patient);
  
      res.status(200).json({
        message: 'Paciente encontrado e atualizado com sucesso!',
        success: true,
        patient: patient,
      });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/patients/:id
// @desc     Delete patient
// @access   Private
router.delete('/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
  
      if (!patient) {
        return res.status(404).json({ msg: 'Paciente não encontrado' });
      };
  
      await patient.remove();
  
      res.json({ msg: 'Paciente removido' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
