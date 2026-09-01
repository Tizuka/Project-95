// aqui literalmente so joga pro controller
const express = require('express');
const experimentController = require('../2-controllers/experiment.controller');
const router = express.Router();


router.get('/experiments', experimentController.getExperiments);

module.exports = router;