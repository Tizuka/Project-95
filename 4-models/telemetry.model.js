const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
    name: String,
    status: String,
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
    temperature: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Telemetry', telemetrySchema);
