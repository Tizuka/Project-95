const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    value: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Experiment', experimentSchema);