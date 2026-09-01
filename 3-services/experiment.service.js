// define a funcao que vai buscar todos os experiments

import experiment from '../4-models/experiment.model.js';

export async function getExperiments() {
    return await experiment.find();
}
