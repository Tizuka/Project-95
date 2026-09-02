
import experimentRun from '../4-models/experiment.run.model.js';

export async function startExperiment(experimentRunData) {
    const newExperimentRun = new experimentRun(experimentRunData);
    return await newExperimentRun.save();
}
