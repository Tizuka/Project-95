export async function loadExperiments() {
    const response = await fetch('http://127.0.0.1:3000/experiments/experiments');
    const experiments = await response.json();


    return experiments;
}



export async function getExperimentFromId(experimentId) {

    console.log("fecth received getExperimentFromId");
    const request = await fetch('http://127.0.0.1:3000/experiments/getExperimentFromId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({experimentId: experimentId}) 
    });
    const experimentName  = await request.json();


    return experimentName;
}
