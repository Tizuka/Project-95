
const experimentRun = require('../4-models/experiment.run.model.js');
const machine = require('../4-models/machine.model.js');



async function startExperiment(experimentRunData) {
    const newExperimentRun = new experimentRun(experimentRunData);
    return await newExperimentRun.save();
}


async function completeExperiment(experimentId,machineName) {

    console.log("completeExperiment service");
    console.log("ID RECEIVED:", experimentId);

    const updatedExperiment = await experimentRun.findByIdAndUpdate(
        experimentId,
        { $set: { status: "COMPLETED" } },
        { new: true }
    );
    const findMachine = await machine.findOneAndUpdate(
    { name: machineName },
    { $set: { status: "IDLE" } },
    { new: true }
);

    console.log("UPDATED EXPERIMENT:", updatedExperiment);

    return {
        experiment: updatedExperiment,
        machine: findMachine
    };
}

async function loadAllExperimentRuns() {
    return await experimentRun.find();
}


module.exports = {
    startExperiment,loadAllExperimentRuns,completeExperiment
};