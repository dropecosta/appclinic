const mongoose = require('mongoose');
const RegistrySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  description: {
    type: String,
  },
});

module.exports = User = mongoose.model('registry', RegistrySchema);
