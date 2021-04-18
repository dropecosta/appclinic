const mongoose = require('mongoose');
const PrescriptionSchema = new mongoose.Schema({
    registry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registry',
    },
    prescription: [
        {
          genericName: {
            type: String,
            required: true
          },
          commercialName: {
            type: String,
            required: true
          },
          producer: {
            type: String
          },
          description: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now,
        },
        }
      ]
});

module.exports = User = mongoose.model('prescription', PrescriptionSchema);