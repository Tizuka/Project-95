const mongoose = require("mongoose");
const SystemLog = require("../4-models/system.log.model.js"); 

const logs = [
    {
        message: "SYSTEM CHECK COMPLETE"
    },
    {
        message: "ALL LABORATORY SYSTEMS ONLINE"
    },
    {
        message: "RADIATION LEVELS STABLE"
    },
    {
        message: "BACKUP SYSTEMS VERIFIED"
    },
];

async function seedSystemLogs() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/classified");

        await SystemLog.deleteMany({});

        await SystemLog.insertMany(logs);

        console.log("System logs seeded successfully!");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding system logs:", error);
        await mongoose.disconnect();
    }
}

seedSystemLogs();