const mongoose = require("mongoose");


const telemetrySchema = new mongoose.Schema({

    experimentRunId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExperimentRun",
        required: true
    },

    experimentName: {
        type: String,
        required: true
    },

    sensor: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        required: true
    },

    unit: {
        type: String,
        required: true
    },

    min: {
        type: Number,
        required: true
    },

    max: {
        type: Number,
        required: true
    },

    warning: {
        type: Number,
        required: true
    },

    critical: {
        type: Number,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model(
    "Telemetry",
    telemetrySchema
);