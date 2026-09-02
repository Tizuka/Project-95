const mongoose = require('mongoose');

const experimentRunSchema = new mongoose.Schema({

    name: String,

    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment'
    },

    machineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine'
    },

    duration: Number,

    status: {
        type: String,
        enum: ['stopped', 'running', 'completed', 'failed'],
        default: 'pending'
    },

    // TODO: implement 'failed' state brought by telemetry

    startedAt: Date,
    endedAt: Date
});

module.exports = mongoose.model('ExperimentRun', experimentRunSchema);

