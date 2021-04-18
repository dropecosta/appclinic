const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Registry = require('../../models/Registry');
const Patient = require('../../models/Patient');

// const Prescription = require('../../models/Prescription');
// const Exam = require('../../models/Exam');

// @route    GET api/registry/patient
// @desc     Get current patient registry
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const registry = await Registry.findById(req.params.id);

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
