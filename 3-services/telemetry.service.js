 const {
    generateNextValue,
    generateInitialValue
} = require("./telemetry.generator.service.js");


const TELEMETRY_CONFIG = {

    "THERMAL STABILITY TEST": {
        sensor: "temperature",

        config: {
            unit: "°C",
            min: 60,
            max: 100,
            step: 1,
            warning: 80,
            critical: 90
        }
    },


    "PRESSURE TEST": {
        sensor: "pressure",

        config: {
            unit: "BAR",
            min: 50,
            max: 150,
            step: 3,
            warning: 100,
            critical: 120
        }
    },


    "CRYOGENIC TEST": {
        sensor: "temperature",

        config: {
            unit: "°C",
            min: -180,
            max: -50,
            step: 2,
            warning: -80,
            critical: -60
        }
    },


    "RADIATION TEST": {
        sensor: "radiation",

        config: {
            unit: "mSv",
            min: 10,
            max: 100,
            step: 2,
            warning: 50,
            critical: 80
        }
    }

};


const telemetryStates = new Map();


function normalizeExperimentName(name) {

    return name
        .trim()
        .toUpperCase();

}


function getTelemetryConfig(experimentName) {

    const normalizedName =
        normalizeExperimentName(experimentName);

    return TELEMETRY_CONFIG[normalizedName];

}


function createTelemetryState(
    experimentRunId,
    experimentName
) {

    const telemetryConfig =
        getTelemetryConfig(experimentName);


    if (!telemetryConfig) {

        throw new Error(
            `Unknown experiment: ${experimentName}`
        );

    }


    const state = {

        experimentRunId,

        experimentName,

        sensor:
            telemetryConfig.sensor,

        value:
            generateInitialValue(
                telemetryConfig.config
            ),

        trend: "STABLE"

    };


    telemetryStates.set(
        String(experimentRunId),
        state
    );


    return state;

}


function generateTelemetry(
    experimentRunId,
    experimentName
) {

    const key =
        String(experimentRunId);


    let state =
        telemetryStates.get(key);


    if (!state) {

        state =
            createTelemetryState(
                experimentRunId,
                experimentName
            );

    } else {

        const telemetryConfig =
            getTelemetryConfig(experimentName);


        state.value =
            generateNextValue(
                state.value,
                telemetryConfig.config,
                state.trend
            );

    }


    const telemetryConfig =
        getTelemetryConfig(experimentName);


    return {

        experimentRunId,

        experimentName,

        sensor:
            state.sensor,

        value:
            state.value,

        unit:
            telemetryConfig.config.unit,

        min:
            telemetryConfig.config.min,

        max:
            telemetryConfig.config.max,

        warning:
            telemetryConfig.config.warning,

        critical:
            telemetryConfig.config.critical,

        timestamp:
            new Date()

    };

}


module.exports = {
    getTelemetryConfig,
    generateTelemetry
};