    const mongoose = require('mongoose');

    const Machine = require('../4-models/machine.model.js');

    const machines = [
        {
            name: "LAB-01",
            value: "lab-01",
            status: "IDLE"
        },
        {
            name: "LAB-02",
            value: "lab-02",
            status: "IDLE"
        },
        {
            name: "LAB-03",
            value: "lab-03",
            status: "IDLE"
        },
        {
            name: "LAB-04",
            value: "lab-04",
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