const express = require('express');
const router = express.Router();

const systemLog = require('../4-models/system.log.model.js');



const now = new Date();

const startOfDay = new Date(now);
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date(now);
endOfDay.setHours(23, 59, 59, 999);

const logs = await systemLog
    .find({
        createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    })
    .sort({ createdAt: -1 })
    .limit(20);

router.get('/', async (req, res) => {
    try {
        const now = new Date();

        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const logs = await systemLog
            .find({
                createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            })
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