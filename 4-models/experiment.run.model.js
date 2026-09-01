const mongoose = require('mongoose');

const experimentRunSchema = new mongoose.Schema({
    name: String,
    experimentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experiment' },
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' },
    status: {
        type: String,
        enum: ['stopped', 'running', 'completed', 'failed'],
        // o status failed eh um state trazido do telemtry
        default: 'pending'
    },
    startedAt: Date,
    endedAt: Date
});


module.exports = mongoose.model('ExperimentRun', experimentRunSchema);