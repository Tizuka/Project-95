
// 1.ADD EXPERIMENT BUTTON 
// 1.1 "SELECT MACHINE" e SELECT EXPERIMENT 
import { loadIdleMachines } from '../../5-fetch/machine.fetch.js';
import { loadExperiments } from '../../5-fetch/experiments.fetch.js'

// Open Experiment Modal
const experiments = await loadExperiments();
const openExperimentModal = document.getElementById("open-experiment-modal");


openExperimentModal.addEventListener("click", async () => {
    const machines = await loadIdleMachines();
    console.log("MACHINES:", machines);

    // renderizar machines
    machines.forEach(machine => {
        // Select Machines
        const machineSelection =
            document.querySelector(".machine-selection");
        const machineOption =
            document.createElement("label");

        machineOption.classList.add("machine-option");

        const machineInputElement = document.createElement("input");
        machineInputElement.setAttribute("type", "radio");
        machineInputElement.setAttribute("name", "machine");
        machineInputElement.setAttribute("value", machine.name);

        const machineOptionContent = document.createElement("div");
        machineOptionContent.setAttribute(
            "class",
            "machine-option-content"
        );
        const insideDiv = document.createElement("div");

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

    // renderizar experiments
    experiments.forEach(experiment => {
        // Select Experiment
        const selectExperiment = document.getElementById('experiment-type');
        const experimentOption = document.createElement('option')
        experimentOption.setAttribute("value", experiment.value); experimentOption.textContent = experiment.name;
        selectExperiment.appendChild(experimentOption);

    });

    const experimentDetailsDescription = document.querySelector('.experiment-details-description');
    const experimentTypeSelect = document.getElementById('experiment-type');
    experimentTypeSelect.addEventListener('change', (event) => {
        const experimentSelected = experiments.find(experiment => event.target.value === experiment.value);
        experimentDetailsDescription.textContent = experimentSelected ? experimentSelected.description : 'Select an experiment type to see its details and requirements.';
    });

});


