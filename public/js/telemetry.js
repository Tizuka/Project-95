 import { loadTelemetry } from "../../5-fetch/telemetry.fetch.js";

const telemetryIntervals = new Map();

export function startTelemetry(
    experimentRunId,
    experimentName,
    onTelemetry
) {

    const key = String(experimentRunId);

    if (telemetryIntervals.has(key)) {
        return;
    }

    async function updateTelemetry() {

        try {

            const telemetry =
                await loadTelemetry(
                    experimentRunId,
                    experimentName
                );

            onTelemetry(telemetry);

        } catch (error) {

            console.error(
                `Telemetry error for ${experimentName}:`,
                error
            );

        }
    }

    updateTelemetry();

    const interval =
        setInterval(
            updateTelemetry,
            1000
        );

    telemetryIntervals.set(
        key,
        interval
    );
}

export function stopTelemetry(
    experimentRunId
) {

    const key =
        String(experimentRunId);

    const interval =
        telemetryIntervals.get(key);

    if (!interval) {
        return;
    }

    clearInterval(interval);

    telemetryIntervals.delete(key);
}