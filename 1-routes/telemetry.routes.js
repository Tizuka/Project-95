const express = require("express");

const {
    getTelemetry
} = require("../2-controllers/telemetry.controller.js");

const router = express.Router();

router.get(
    "/:experimentRunId/:experimentName",
    getTelemetry
);

module.exports = router;