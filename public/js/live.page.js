// 1. ADD EXPERIMENT BUTTON
// 1.1 "SELECT MACHINE" e SELECT EXPERIMENT
import { loadIdleMachines, updateStatus } from '../../5-fetch/machine.fetch.js';
import { loadExperiments, getExperimentFromId } from '../../5-fetch/experiments.fetch.js';
import { startExperiment } from '../../5-fetch/experiment.run.fetch.js';
import { showWarning } from './warning.modal.js';
import { loadAllExperimentRuns } from '../../5-fetch/experiment.run.fetch.js';




// experimentRuns
console.log("1 - SCRIPT START");
const experimentRuns = await loadAllExperimentRuns();
console.log("2 - EXPERIMENT RUNS LOADED", experimentRuns);
const livePageButton = document.getElementById("live-page-button");
const experimentList = document.querySelector(".experiment-list");
// Open Experiment

const experiments = await loadExperiments();
console.log("3 - EXPERIMENTS LOADED", experiments);
const openExperimentModal =
    document.getElementById("open-experiment-modal");
const machines = await loadIdleMachines();
console.log("4 - MACHINES LOADED", machines);// ELEMENTS
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
    machineSelection.innerHTML = "";
function renderMachines() {
 console.log("5 dentro de renderMachines")

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
 console.log("6 fora de renderMachines, antes da criacao dos cards")


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
 console.log("7 dentro de render experiments")

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
// 1.4 OPEN EXPERIMENT MODAL
openExperimentModal.addEventListener("click", async () => {
 console.log("8 dentro de openExperimentModal.addEventListener")

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
         showWarning(
                machineSelected,
                experimentSelected
            );

            return;
    }

const experimentRunObject = {
    name: machineSelected,
    experimentId:experimentSelected._id,
    machineId:selectedMachineId,
    status:"RUNNING",
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

updateStatus(selectedMachineId)
    .then(savedRun => {
        window.location.reload();
        console.log("updateStatus started:", savedRun);
    })
    .catch(error => {
        console.error("Error starting updateStatus:", error);
    });
console.log("experimentSelected:", experimentSelected);
console.log("experimentSelected._id:", experimentSelected?._id);

  


});



function renderExperimentCards(experimentRuns) {
    experimentList.innerHTML = "";

    experimentRuns.forEach((experimentRun, index) => {

        const cardNumber = 1842 + index;

        const experimentFound = experiments.find(
            experiment =>
                String(experiment._id) === String(experimentRun.experimentId)
        );

        const experimentName = experimentFound?.name;

        const expArticle = document.createElement('article');
        expArticle.classList.add("experiment-card");


        // =========================
        // CARD HEAD
        // =========================

        const cardHead = document.createElement("div");
        cardHead.classList.add("card-head");

        const span = document.createElement("span");
        span.textContent = `#${cardNumber}`;

        const h3 = document.createElement("h3");
        h3.textContent = experimentName;

        const alignRunningDetails = document.createElement("div");
        alignRunningDetails.classList.add("align-running-details");

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "〈 VIEW DETAILS 〉";


        // =========================
        // VIEW DETAILS
        // =========================

        button.addEventListener("click", () => {

            expArticle.classList.toggle("expanded");

            if (expArticle.classList.contains("expanded")) {
                button.textContent = "〈 HIDE DETAILS 〉";
            } else {
                button.textContent = "〈 VIEW DETAILS 〉";
            }

        });


        const status = document.createElement("b");
        status.classList.add("status", "running");
        status.textContent = `[${experimentRun.status}]`;

        alignRunningDetails.appendChild(button);
        alignRunningDetails.appendChild(status);

        cardHead.appendChild(span);
        cardHead.appendChild(h3);
        cardHead.appendChild(alignRunningDetails);


        // =========================
        // EXPERIMENT CONTENT
        // =========================

        const experimentContent = document.createElement("div");
        experimentContent.classList.add("experiment-content");

        const telemetry = document.createElement("div");
        telemetry.classList.add("telemetry");

        telemetry.innerHTML = `
            <span>
                LIVE TELEMETRY
            </span>

            <p>
                TEMP
                <b>
                    74.2 °C
                </b>
            </p>

            <p>
                PRESS
                <b>
                    4.3 BAR
                </b>
            </p>

            <p>
                HUMID
                <b>
                    48 %
                </b>
            </p>
        `;


        // =========================
        // CHART
        // =========================

        const chart = document.createElement("div");
        chart.classList.add("chart");

        chart.innerHTML = `
            <span>
                90
            </span>

            <div class="chart-line"></div>

            <small>
                14:20&nbsp;&nbsp;
                14:30&nbsp;&nbsp;
                14:40&nbsp;&nbsp;
                14:50
            </small>
        `;

        experimentContent.appendChild(telemetry);
        experimentContent.appendChild(chart);


        // =========================
        // META
        // =========================

        const meta = document.createElement("div");
        meta.classList.add("meta");

        meta.innerHTML = `
            MACHINE: ${experimentRun.name}

            &nbsp;&nbsp;

            STARTED:  ${new Date(experimentRun.startedAt).toLocaleTimeString('pt-BR')}

            &nbsp;&nbsp;

            END: ${new Date(experimentRun.endedAt).toLocaleTimeString('pt-BR')}
        `;


        // =========================
        // ACTIONS
        // =========================

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const stopButton = document.createElement("button");
        stopButton.type = "button";
        stopButton.classList.add("danger");
        stopButton.textContent = "[ STOP EXPERIMENT ]";

        actions.appendChild(stopButton);


        // =========================
        // APPEND CARD
        // =========================

        expArticle.appendChild(cardHead);
        expArticle.appendChild(experimentContent);
        expArticle.appendChild(meta);
        expArticle.appendChild(actions);

        experimentList.appendChild(expArticle);

    });
}



/* =========================
   ExperimentRun Display on live page
========================= */

livePageButton.addEventListener('click', async () => {
   renderExperimentCards(experimentRuns);


});


