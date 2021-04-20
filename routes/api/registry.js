const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Registry = require('../../models/Registry');
const Patient = require('../../models/Patient');

// @route    POST api/registry/:id
// @desc     Create or update registry
// @access   Private
router.post(
  '/patient/:id',
  async (req, res) => {
    // destructure the request
    const {
      patient,
      prescription,
      // exam,
      ...rest
    } = req.body;

    // build a registry
    const registryFields = {
      patient: await Patient.findById(req.params.id),
      // prescription: Array.isArray(prescription) ? prescription : prescription.split(',').map((p) => ' ' + p.trim()),
      prescription: Array.isArray(prescription) ? prescription : '',
      // exam: Array.isArray(exam) ? exam : exam.split(',').map((e) => ' ' + e.trim()),
      // exam: Array.isArray(exam) ? exam : '',
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

// @route    GET api/registry
// @desc     Get all registries
// @access   Public
router.get('/', async (req, res) => {
  try {
    const  registry = await Registry.find().populate('patient', ['name', 'email']);
    res.json(registry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/registry/patient/:patient_id
// @desc     Get patient registry by patient id
// @access   Private
router.get('/patient/:patient_id', 
  checkObjectId('patient_id'), 
  async ({ params: { patient_id } }, res) => {
  try {
    const registry = await Registry.findOne({
      patient: patient_id
    }).populate('patient', ['name', 'email']);

    if (!registry) {
      return res.status(400).json({ msg: 'Registro não encontrado' });
    }

    res.json(registry);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'patient_id') {
      return res.status(400).json({ msg: 'Registro não encontrado' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/registry
// @desc     Delete prescription by prescription ID
// @access   Private
router.delete('/prescription/:id', auth, async (req, res) => {
  try {
    // Remove profile
    // Remove user
    const foundRegistry = await Registry.findOne(req.patient);
    
    foundRegistry.prescription = foundRegistry.prescription.filter(
      (p) => p._id.toString() !== req.params.id
    );
    
    await foundRegistry.save();
    return res.status(200).json(foundRegistry);    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/// @route    PUT api/registry/prescription
// @desc     Add profile prescription
// @access   Private
router.put(
  '/prescription/:id',

  // check('title', 'Title is required').notEmpty(),
  // check('company', 'Company is required').notEmpty(),

  async (req, res) => {
    // destructure the request
    const {
      genericName,
      commercialName,
      producer,
      description,
      ...rest
    } = req.body;

    try {

      // id registry
      const registry = await Registry.findById(req.params.id);

      await console.log('registry', registry);


      registry.prescription.genericName = req.body.genericName,
      registry.prescription.commercialName = req.body.commercialName,
      registry.prescription.producer = req.body.producer
      registry.prescription.description = req.body.description
      
      registry.prescription.unshift(req.body) || '';
      
      console.log('req.body', req.body);


      await registry.save();

      res.json(registry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
