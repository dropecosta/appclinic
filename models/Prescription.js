const mongoose = require('mongoose');
const PrescriptionSchema = new mongoose.Schema({
    medicaments: {
        type: [String],
        required: true
      },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('prescription', PrescriptionSchema);