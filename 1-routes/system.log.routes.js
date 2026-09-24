const express = require('express');
const router = express.Router();

const systemLog = require('../4-models/system.log.model.js');

router.get('/', async (req, res) => {
    try {
        const logs = await systemLog
            .find()
            .sort({ createdAt: -1 })
            .limit(20);

        res.json(logs);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to load system logs"
        });
    }
});

module.exports = router;