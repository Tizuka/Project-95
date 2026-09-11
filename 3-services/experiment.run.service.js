
const experimentRun = require('../4-models/experiment.run.model.js');


async function startExperiment(experimentRunData) {
    const newExperimentRun = new experimentRun(experimentRunData);
    return await newExperimentRun.save();
}


async function loadAllExperimentRuns() {
    return await experimentRun.find();
}


module.exports = {
    startExperiment,loadAllExperimentRuns
};