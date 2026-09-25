 const Telemetry = require("../4-models/telemetry.model.js");

const {
    generateTelemetry
} = require("../3-services/telemetry.service.js");


async function getTelemetry(req, res) {

    try {

        const {
            experimentRunId,
            experimentName
        } = req.params;


        if (!experimentRunId || !experimentName) {

            return res.status(400).json({
                message:
                    "experimentRunId and experimentName are required"
            });

        }


        const telemetry =
            generateTelemetry(
                experimentRunId,
                experimentName
            );


        // Save telemetry
        await Telemetry.create(telemetry);


        // Return the generated telemetry directly
        res.status(200).json(telemetry);


    } catch (error) {

        console.error(
            "Error generating telemetry:",
            error
        );

        res.status(500).json({
            message:
                "Error generating telemetry",

            error:
                error.message
        });

    }

}


module.exports = {
    getTelemetry
};