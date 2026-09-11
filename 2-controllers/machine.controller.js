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


async function updateStatusController(req, res) {

    console.log("machine controller received update status");

    try {

        console.log("REQ.BODY:", req.body);

        const { machineId } = req.body;

        console.log("MACHINE ID:", machineId);
        console.log("TYPE:", typeof machineId);

        const savedStatus =
            await machineService.updateStatus(machineId);

        res.json(savedStatus);

        console.log("savedStatus machine:", savedStatus);

    } catch (error) {

        console.error("UPDATE STATUS ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
}


async function loadMachines(req, res) {
    
    try {
        const machines = await machineService.loadMachines();

        res.json(machines);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}


module.exports = {
    getIdleMachines,updateStatusController,loadMachines
};