const API_URL = "http://127.0.0.1:3000/telemetry";

export async function loadTelemetry(
    experimentRunId,
    experimentName
) {

    try {

        const response = await fetch(
            `${API_URL}/${experimentRunId}/${encodeURIComponent(experimentName)}`
        );

        if (!response.ok) {

            throw new Error(
                `Telemetry request failed: ${response.status}`
            );

        }

        const telemetry =
            await response.json();

        return telemetry;

    } catch (error) {

        console.error(
            "Error loading telemetry:",
            error
        );

        throw error;
    }
}