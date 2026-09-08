const mongoose = require('mongoose');

const Machine = require('./4-models/machine.model.js');

const machines = [
    {
        name: "Thermal Chamber",
        value: "thermal-chamber",
        status: "IDLE"
    },
    {
        name: "Pressure Chamber",
        value: "pressure-chamber",
        status: "IDLE"
    },
    {
        name: "Cryogenic Chamber",
        value: "cryogenic-chamber",
        status: "IDLE"
    },
    {
        name: "Radiation Chamber",
        value: "radiation-chamber",
        status: "IDLE"
    }
];


async function createMachines() {

    await mongoose.connect('mongodb://127.0.0.1:27017/classified');

    console.log("MongoDB connected");

    await Machine.deleteMany({});

    console.log("Old machines deleted");

    await Machine.insertMany(machines);

    console.log("Machines created");

    await mongoose.disconnect();
}

createMachines();