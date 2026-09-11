// aqui literalmente so joga pro controller
const express = require('express');
const experimentRunController = require('../2-controllers/experiment.run.controller');
const router = express.Router();


router.post('/startExperiment', experimentRunController.startExperimentController);
router.get('/loadAllExperimentRuns', experimentRunController.loadAllExperimentRunsController);

module.exports = router;
