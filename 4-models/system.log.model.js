const mongoose = require('mongoose');

const systemLogSchema = new mongoose.Schema({

    message: {
        type: String,
        required: true
    },

    level: {
        type: String,
        enum: [
            "INFO",
            "WARNING",
            "CRITICAL",
            "EMERGENCY"
        ],
        default: "INFO"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('SystemLog', systemLogSchema);