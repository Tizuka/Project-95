// define a funcao que vai buscar as maquinas idle no banco de dados

const Machine = require('../4-models/machine.model.js');

async function getIdleMachines() {
    return await Machine.find({ status: 'IDLE' });
}


async function updateStatus(machineId) {
    return await Machine.findByIdAndUpdate(
        machineId,
        { status: 'RUNNING' },
        { new: true }
    );

}


async function loadMachines() {
    return await Machine.find();
}


module.exports = {
    getIdleMachines,
    updateStatus,loadMachines
};
