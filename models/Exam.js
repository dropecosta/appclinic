const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
    registry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registry',
    },
    completed: {
        type: Boolean,
        default: false,
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