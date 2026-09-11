// ====================
// MACHINES
// ====================


export async function loadIdleMachines() {
    const response = await fetch('http://127.0.0.1:3000/machines/idle');
    const machines = await response.json();
    console.log("MACHINES:", machines);


    return machines;
}


export async function updateStatus(machineId) {

    console.log("fecth received update status");
    const request = await fetch('http://127.0.0.1:3000/machines/updateStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({machineId: machineId}) 
    });
    const savedStatus  = await request.json();


    return savedStatus;
}



// loadExperiments();
// addExperiment();
// loadRunningExperiments();
// renderExperimentCard();