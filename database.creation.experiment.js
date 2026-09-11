const mongoose = require('mongoose');

const Experiment = require('./4-models/experiment.model.js');

const experiments = [

    {
        name: "THERMAL STABILITY TEST",
        value: "thermal-stability",
        description: "Tests material stability under controlled temperature conditions.",
        duration: 180
    },

    {
        name: "PRESSURE TEST",
        value: "pressure",
        description: "Tests structural resistance under extreme pressure.",
        duration: 120
    },

    {
        name: "CRYOGENIC TEST",
        value: "cryogenic",
        description: "Evaluates material behavior under extremely low temperatures.",
        duration: 300 
    },

    {
        name: "RADIATION TEST",
        value: "radiation",
        description: "Measures material resistance to controlled radiation.",
        duration: 240
    }

];

async function createExperiments() {

    await mongoose.connect('mongodb://127.0.0.1:27017/classified');

    console.log("MongoDB connected");

    await Experiment.deleteMany({});

    console.log("Old experiments deleted");

    await Experiment.insertMany(experiments);

    console.log("Experiments created");

    await mongoose.disconnect();

}

createExperiments();  