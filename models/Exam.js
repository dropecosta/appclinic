const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('exam', ExamSchema);