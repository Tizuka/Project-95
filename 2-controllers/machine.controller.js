// o controller esta handling a request e chama o servico

const machineService = require('../3-services/machine.service');

async function getIdleMachines(req, res) {
    try {
        const machines = await machineService.getIdleMachines();

        res.json(machines);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getIdleMachines
};