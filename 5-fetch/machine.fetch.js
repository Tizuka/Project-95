// ====================
// MACHINES
// ====================


export async function loadIdleMachines() {
    const response = await fetch('http://127.0.0.1:3000/machines/idle');
    const machines = await response.json();
    console.log("MACHINES:", machines);


    return machines;
}


// loadExperiments();
// addExperiment();
// loadRunningExperiments();
// renderExperimentCard();