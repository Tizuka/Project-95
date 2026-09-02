const experimentRunService = require('../3-services/experiment.run.service');

async function startExperimentController(req, res) {
    try {
        const savedRun = await experimentRunService.startExperiment(req.body);
        res.json(savedRun);
        console.log("FROM DATABASE savedrun:", savedRun);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    startExperimentController
};