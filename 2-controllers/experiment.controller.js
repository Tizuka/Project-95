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

    console.log("experiment controller received getExperimentFromId");

    try {

        console.log("REQ.BODY:", req.body);

        const { experimentId } = req.body;

        console.log("experimentId:", experimentId);
        console.log("TYPE:", typeof experimentId);

        const experimentName =
            await experimentService.getExperimentFromId(experimentId);

        res.json(experimentName);

        console.log("experimentName of experimentID:", experimentName);

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