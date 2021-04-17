const mongoose = require('mongoose');
const AppointmentsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date,
    },
});

module.exports = User = mongoose.model('appointments', AppointmentsSchema);