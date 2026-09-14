// o controller esta handling a request e chama o servico

const experimentService = require('../3-services/experiment.service');

async function getExperiments(req, res) {
    try {
        const experiments = await experimentService.getExperiments();
        console.log("FROM DATABASE:", experiments);
        res.json(experiments);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: error.message
        });
    }
}


async function getExperimentFromId(req, res) {
    try {
        const { experimentId } = req.body;
        console.log("getExperimentFromId Controller try", req);
        const experimentName = await experimentService.getExperimentFromId(experimentId);
        console.log("experimentName",experimentName);
        res.json(experimentName);


    } catch (error) {
        console.error("UPDATE STATUS ERROR:", error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getExperiments,getExperimentFromId
};