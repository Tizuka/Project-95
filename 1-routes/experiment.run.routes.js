// aqui literalmente so joga pro controller
const express = require('express');
const experimentRunController = require('../2-controllers/experiment.run.controller');
const router = express.Router();


router.post('/startExperiment', experimentRunController.startExperimentController);

router.get('/loadAllExperimentRuns', experimentRunController.loadAllExperimentRunsController);

router.patch('/:experimentId/:experimentName/complete',
    (req, res, next) => {
        console.log("PATCH ROUTE REACHED");
        console.log("PARAM:", req.params.experimentId, req.params.experimentName );
        next();
    },
    experimentRunController.completeExperimentController);

    router.patch(
'/:experimentId/:experimentName/stop',
experimentRunController.stopExperimentController
);

router.patch(
    '/:experimentId/:experimentName/failed',
    experimentRunController.failedExperimentController
);

module.exports = router;
