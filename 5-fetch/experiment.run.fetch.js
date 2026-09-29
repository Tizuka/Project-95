export async function startExperiment(experimentRun) {
    const request = await fetch('http://127.0.0.1:3000/experimentRun/startExperiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(experimentRun) 
    });
    const savedRun  = await request.json();


    return savedRun;
}
export async function loadAllExperimentRuns() {
    const response = await fetch('http://127.0.0.1:3000/experimentRun/loadAllExperimentRuns');
    const experimentRuns = await response.json();
    console.log("ALLL EXPERIMENT RUNS:", experimentRuns);


    return experimentRuns;
}
export async function statusComplete(experimentId, experimentName){
    const response = await fetch(
        `http://127.0.0.1:3000/experimentRun/${experimentId}/${experimentName}/complete`,
        {
            method: "PATCH"
        }
    );

    const statusCompleted = await response.json();

    console.log("statusComplete");

    return statusCompleted;
}
export async function stopExperimentRun(
    experimentId,
    experimentName
) {

    const response = await fetch(
        `http://127.0.0.1:3000/experimentRun/${experimentId}/${experimentName}/stop`,
        {
            method: "PATCH"
        }
    );

    const stoppedRun =
        await response.json();

    console.log(
        "stopExperimentRun:",
        stoppedRun
    );

    return stoppedRun;
}
export async function loadSystemLogs() {

    const response = await fetch(
        'http://127.0.0.1:3000/systemLog'
    );

    const logs = await response.json();

    console.log("SYSTEM LOGS:", logs);

    return logs;
}
export async function statusFailed(experimentId, experimentName) {

    const response = await fetch(
        `http://127.0.0.1:3000/experimentRun/${experimentId}/${experimentName}/failed`,
        {
            method: "PATCH"
        }
    );

    const statusFailed = await response.json();

    console.log(
        "statusFailed:",
        statusFailed
    );

    return statusFailed;
}
export async function createTelemetryLog(message, level) {

    const response = await fetch(
        "http://127.0.0.1:3000/experimentRun/telemetry-log",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message,
                level
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        console.error(
            "TELEMETRY LOG ERROR:",
            response.status,
            errorText
        );

        throw new Error(
            `Telemetry log failed: ${response.status}`
        );
    }

    const log = await response.json();

    console.log("Telemetry log created:", log);

    return log;
}