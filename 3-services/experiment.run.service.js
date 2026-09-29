const experimentRun = require('../4-models/experiment.run.model.js');
const machine = require('../4-models/machine.model.js');
const systemLog = require('../4-models/system.log.model.js');
var experimentName = "";

async function startExperiment(experimentRunData) {

    const newExperimentRun = new experimentRun(experimentRunData);
    const savedExperiment = await newExperimentRun.save();

    await systemLog.create({
        message: `${experimentRunData.name}: ${experimentRunData.experimentName} started.`
    });
    experimentName = experimentRunData.experimentName;
    return savedExperiment;
}
async function completeExperiment(experimentId, machineName) {

    console.log("completeExperiment service");
    console.log("ID RECEIVED:", experimentId);
    console.log("machineName:", machineName);

    const updatedExperiment = await experimentRun.findOneAndUpdate(
        {
            _id: experimentId,
            status: "RUNNING"
        },
        {
            $set: {
                status: "COMPLETED",
                completedAt: new Date()
            }
        },
        {
            new: true
        }
    );

    const findMachine = await machine.findOneAndUpdate(
        { name: machineName },
        {
            $set: {
                status: "IDLE"
            }
        },
        {
            new: true
        }
    );

    if (updatedExperiment) {
        await systemLog.create({
            message: `${machineName}: ${updatedExperiment.experimentName} completed successfully.`
        });

    }

    return {
        experiment: updatedExperiment,
        machine: findMachine
    };
}
async function stopExperiment(experimentId, machineName) {

    console.log("stopExperiment service");
    console.log("ID RECEIVED:", experimentId);
    console.log("machineName:", machineName);

    const updatedExperiment = await experimentRun.findOneAndUpdate(
        {
            _id: experimentId,
            status: "RUNNING"
        },
        {
            $set: {
                status: "STOPPED"
            }
        },
        {
            new: true
        }
    );

    const findMachine = await machine.findOneAndUpdate(
        {
            name: machineName
        },
        {
            $set: {
                status: "IDLE"
            }
        },
        {
            new: true
        }
    );

    if (updatedExperiment) {

        await systemLog.create({
            message:
                `${machineName}: ${updatedExperiment.experimentName} stopped.`
        });

    }

    return {
        experiment: updatedExperiment,
        machine: findMachine
    };
}
async function loadAllExperimentRuns() {

    return await experimentRun.aggregate([
        {
            $addFields: {
                statusOrder: {
                    $cond: [
                        { $eq: ["$status", "RUNNING"] },
                        0,
                        1
                    ]
                }
            }
        },
        {
            $sort: {
                statusOrder: 1,
                startedAt: -1
            }
        }
    ]);

}
async function loadSystemLogs() {

    return await systemLog.find()
        .sort({ createdAt: -1 })
        .limit(20);

}
async function failedExperiment(experimentId, machineName) {

    console.log("failedExperiment service");
    console.log("ID RECEIVED:", experimentId);
    console.log("machineName:", machineName);

    const updatedExperiment = await experimentRun.findOneAndUpdate(
        {
            _id: experimentId,
            status: "RUNNING"
        },
        {
            $set: {
                status: "FAILED"
            }
        },
        {
            new: true
        }
    );

    const findMachine = await machine.findOneAndUpdate(
        {
            name: machineName
        },
        {
            $set: {
                status: "IDLE"
            }
        },
        {
            new: true
        }
    );

    if (updatedExperiment) {

        await systemLog.create({
            message:
                `${machineName}: ${updatedExperiment.experimentName} FAILED.`,
            level: "EMERGENCY"
        });

    }

    return {
        experiment: updatedExperiment,
        machine: findMachine
    };
}
async function createTelemetryLog(message, level) {

    return await systemLog.create({
        message,
        level
    });

}

module.exports = {
    startExperiment,
    loadAllExperimentRuns,
    completeExperiment,
    stopExperiment,
    failedExperiment,
    loadSystemLogs,     
    createTelemetryLog
    
};

