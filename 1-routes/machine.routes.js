// aqui literalmente so joga pro controller
const express = require('express');
const machineController = require('../2-controllers/machine.controller');
const router = express.Router();


console.log("router received update status");
router.get('/idle', machineController.getIdleMachines);
router.get('/loadMachines', machineController.loadMachines);
router.post('/updateStatus', machineController.updateStatusController);

module.exports = router;