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
