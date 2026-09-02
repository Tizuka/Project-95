// 1. ADD EXPERIMENT BUTTON
// 1.1 "SELECT MACHINE" e SELECT EXPERIMENT
import { loadIdleMachines } from '../../5-fetch/machine.fetch.js';
import { loadExperiments } from '../../5-fetch/experiments.fetch.js';
import { startExperiment } from '../../5-fetch/experiment.run.fetch.js';


// Open Experiment
const experiments = await loadExperiments();
const openExperimentModal =
    document.getElementById("open-experiment-modal");
const machines = await loadIdleMachines();
console.log("MACHINES:", machines);
// ELEMENTS
const machineSelection =
    document.querySelector(".machine-selection");
const experimentDetailsDescription =
    document.querySelector('.experiment-details-description');
const experimentTypeSelect =
    document.getElementById('experiment-type');
const experimentDuration =
    document.getElementById('experiment-duration');  
const addExperimentButton =
    document.getElementById("start-experiment");
let machineSelected = '';    
let experimentSelected = '';
let selectedMachineId = '';

function renderMachines() {

    machineSelection.innerHTML = "";

    machines.forEach(machine => {

        // Select Machines
        const machineOption =
            document.createElement("label");
        machineOption.classList.add("machine-option");
        const machineInputElement =
            document.createElement("input");

        machineInputElement.setAttribute("type", "radio");
        machineInputElement.setAttribute("name", "machine");
        machineInputElement.setAttribute("value", machine.name);
        machineInputElement.addEventListener("change", (event) => {
        console.log("MACHINE:", event.target.value);
        console.log("CHECKED:", event.target.checked);
        machineSelected = event.target.value;
        selectedMachineId = machine._id;
    });


        const machineOptionContent =
            document.createElement("div");
        machineOptionContent.setAttribute(
            "class",
            "machine-option-content"
        );
        const insideDiv =
            document.createElement("div");
        const machineName =
            document.createElement("strong");
        const machineType =
            document.createElement("span");
        machineType.textContent = "teste";
        machineName.textContent = machine.name;

        insideDiv.appendChild(machineName);
        insideDiv.appendChild(machineType);

        const status =
            document.createElement("b");
        status.textContent = `● ${machine.status}`;

        if (machine.status == 'IDLE') {
            status.classList.add("idle-status");
        }

        machineOption.appendChild(machineInputElement);
        machineOptionContent.appendChild(insideDiv);
        machineOptionContent.appendChild(status);
        machineOption.appendChild(machineOptionContent);
        machineSelection.appendChild(machineOption);

        

    });
}
function renderExperiments() {

    experimentTypeSelect.innerHTML = `
        <option value="">-- SELECT AN EXPERIMENT --</option>
    `;

    experiments.forEach(experiment => {

        // Select Experiment

        const selectExperiment =
            document.getElementById('experiment-type');

        const experimentOption =
            document.createElement('option');

        experimentOption.setAttribute(
            "value",
            experiment.value
        );

        experimentOption.textContent =
            experiment.name;

        selectExperiment.appendChild(experimentOption);

    });
}
function showWarning(message) {
    warningText.textContent = message;
    warningModal.classList.add("active");
}
// 1.4 OPEN EXPERIMENT MODAL
openExperimentModal.addEventListener("click", async () => {

    // renderizar machines

    renderMachines();

    // renderizar experiments

    renderExperiments();


    experimentDuration.textContent = '';

});
// 1.5 SELECT EXPERIMENT
experimentTypeSelect.addEventListener('change', (event) => {
     experimentSelected =
        experiments.find(
            experiment =>
                event.target.value === experiment.value
        );

    experimentDetailsDescription.textContent =
        experimentSelected
            ? experimentSelected.description
            : 'Select an experiment type to see its details and requirements.';

    // console.log("EXPERIMENT SELECTED:", experimentSelected);

    experimentDuration.textContent =
        experimentSelected
            ? `${experimentSelected.duration / 60}`
            : '';

});
// 1.6 ADD EXPERIMENT BUTTON 
addExperimentButton.addEventListener("click", async () => {
    const clickedAt = new Date();
    const endedAt = new Date(clickedAt);
    endedAt.setSeconds(
        endedAt.getSeconds() + experimentSelected.duration
    );
    console.log("machineselected", machineSelected );
    console.log("experimentselected", experimentSelected );
    if(!machineSelected || !experimentSelected) {
        // alert("Please select a machine and an experiment before starting.");
        showWarning("Please select a machine and an experiment before starting.");
        return;
    }

const experimentRunObject = {
    name: machineSelected,
    experimentId:experimentSelected._id,
    machineId:selectedMachineId,
    status:"running",
    experimentName: experimentSelected.name,
    experimentDuration: experimentSelected.duration,
    startedAt: clickedAt,
    endedAt:endedAt

};

startExperiment(experimentRunObject)
    .then(savedRun => {
        console.log("Experiment run started:", savedRun);
        // Optionally, you can update the UI or redirect the user to another page
    })
    .catch(error => {
        console.error("Error starting experiment run:", error);
        // Optionally, show an error message to the user
    });

});



