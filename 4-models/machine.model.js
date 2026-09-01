const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({

    name: String,

    status: {
        type: String,
        enum: ['IDLE', 'RUNNING', 'COMPLETED', 'FAILED'],
        default: 'IDLE'
    },

    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment'
    }

});

module.exports = mongoose.model('Machine', machineSchema);