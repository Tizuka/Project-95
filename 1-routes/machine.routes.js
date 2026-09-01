// aqui literalmente so joga pro controller
const express = require('express');
const machineController = require('../2-controllers/machine.controller');
const router = express.Router();


router.get('/idle', machineController.getIdleMachines);

module.exports = router;