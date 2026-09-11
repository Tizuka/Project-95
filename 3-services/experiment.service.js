// define a funcao que vai buscar todos os experiments

const experiment = require('../4-models/experiment.model.js');

async function getExperiments() {
    return await experiment.find();
}

async function getExperimentFromId(experimentId) {
    return await experiment.find({_id:experimentId});

}


module.exports = {
    getExperiments,
    getExperimentFromId
};