const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Registry = require('../../models/Registry');
const Patient = require('../../models/Patient');

// const Prescription = require('../../models/Prescription');
// const Exam = require('../../models/Exam');

// @route    POST api/registry/:id
// @desc     Create or update registry
// @access   Private
router.post(
  '/:id',
  
  // check('status', 'Status is required').notEmpty(),
  // check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // destructure the request
    const {
      patient,
      ...rest
    } = req.body;

    // build a profile
    const registryFields = {
      patient: await Patient.findById(req.params.id),
      ...rest
    };

    try {
      let registry = await Registry.findOneAndUpdate(
        { patient: req.params.id },
        { $set: registryFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      console.log(registry)
      return res.json(registry);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/registry/patient
// @desc     Get current patient registry
// @access   Private
router.get('/patient/:patient_id', 
  checkObjectId('patient_id'), 
  async ({ params: { patient_id } }, res) => {
  try {
    const registry = await Registry.findOne({
      patient: patient_id
    }).populate('patient', ['name', 'email']);

    if (!registry) {
      return res.status(404).json({ msg: 'Registro não encontrado' });
    }

    res.json(registry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
