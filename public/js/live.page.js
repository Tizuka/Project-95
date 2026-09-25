// 1. ADD EXPERIMENT BUTTON
// 1.1 "SELECT MACHINE" e SELECT EXPERIMENT
import { loadIdleMachines, updateStatus, loadMachines } from '../../5-fetch/machine.fetch.js';
import { loadExperiments } from '../../5-fetch/experiments.fetch.js';
import { stopExperimentRun,startExperiment,loadAllExperimentRuns, statusComplete,loadSystemLogs } from '../../5-fetch/experiment.run.fetch.js';
import { showWarning } from './warning.modal.js';
import {startTelemetry,stopTelemetry} from './telemetry.js';


// experimentRuns
// console.log("1 - SCRIPT START");
const telemetryHistory = new Map();
// console.log("2 - EXPERIMENT RUNS LOADED", experimentRuns);
const livePageButton = document.getElementById("live-page-button");
const experimentList = document.querySelector(".experiment-list");
// Open Experiment
const experiments = await loadExperiments();
// console.log("3 - EXPERIMENTS LOADED", experiments);
const openExperimentModal =
    document.getElementById("open-experiment-modal");
let machines = await loadIdleMachines();
const allMachines = await loadMachines();
// console.log("4 - MACHINES LOADED", machines);// ELEMENTS
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
//  console.log("5 dentro de renderMachines")
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
//  console.log("6 fora de renderMachines, antes da criacao dos cards")


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
//  console.log("7 dentro de render experiments")

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
function renderExperimentCards(experimentRuns) {
    experimentList.innerHTML = "";
    const activeExperiments = experimentRuns.filter(
         experimentRun => experimentRun.status === "RUNNING"
    );

    if (activeExperiments.length === 0) {
        experimentList.innerHTML = `
            <div class="no-experiments">
                <span> --- NO ACTIVE EXPERIMENTS --- </span>
            </div>
        `;
    }
    
    activeExperiments.forEach((experimentRun, index) => {

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

        status.classList.add(
            "status",
            experimentRun.status
        );

        status.dataset.experimentId = experimentRun._id;

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
        WAITING FOR DATA...
    </p>
`;

        // =========================
        // CHART
        // =========================

const chart = document.createElement("div");
chart.classList.add("chart");

chart.innerHTML = `
    <svg
        class="telemetry-chart"
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
    >

        <line
            class="chart-reference max-line"
            x1="35"
            y1="5"
            x2="300"
            y2="5"
        ></line>

        <line
            class="chart-reference warning-line"
            x1="35"
            y1="5"
            x2="300"
            y2="5"
        ></line>

        <line
            class="chart-reference critical-line"
            x1="35"
            y1="5"
            x2="300"
            y2="5"
        ></line>

        <line
            class="chart-reference min-line"
            x1="35"
            y1="95"
            x2="300"
            y2="95"
        ></line>

        <polyline
            class="telemetry-chart-line"
            points=""
            fill="none"
        ></polyline>

        <text
            class="chart-label max-label"
            x="8"
            y="5"
            font-size="5"
        >
            MAX
        </text>

        <text
            class="chart-label warning-label"
            x="8"
            y="5"
            font-size="5"
        >
            WARNING
        </text>

        <text
            class="chart-label critical-label"
            x="8"
            y="5"
            font-size="5"
        >
            CRITICAL
        </text>

        <text
            class="chart-label min-label"
            x="8"
            y="95"
            font-size="5"
        >
            MIN
        </text>

    </svg>

    <div class="chart-summary">
        LAST 30s
        <span class="chart-min-value">MIN --</span>
        <span class="chart-max-value">MAX --</span>
    </div>
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

            STARTED: ${new Date(experimentRun.startedAt).toDateString()}
    ${new Date(experimentRun.startedAt).toLocaleTimeString("en-US", { hour12: false })}
             -

            END:  ${new Date(experimentRun.endedAt).toDateString()}
    ${new Date(experimentRun.endedAt).toLocaleTimeString("en-US", { hour12: false })}    `;


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

stopButton.addEventListener("click", async () => {

    console.log(
        "STOP EXPERIMENT:",
        experimentRun._id,
        experimentRun.name
    );

    stopTelemetry(experimentRun._id);

    const stoppedExperiment =
        await stopExperimentRun(
            experimentRun._id,
            experimentRun.name
        );

    console.log(
        "stoppedExperiment:",
        stoppedExperiment
    );

    experimentRun.status =
        stoppedExperiment.experiment.status;

    status.textContent =
        `[${experimentRun.status}]`;

});

        // =========================
        // APPEND CARD
        // =========================

        expArticle.appendChild(cardHead);
        expArticle.appendChild(experimentContent);
        expArticle.appendChild(meta);
        expArticle.appendChild(actions);
        experimentList.appendChild(expArticle);

        startTelemetry(
            experimentRun._id,
            experimentName,
            (telemetryData) => {

                updateTelemetryDisplay(
                    telemetry,
                    telemetryData
                );

                updateTelemetryChart(
                    chart,
                    experimentRun._id,
                    telemetryData
                );

            }
        );

    });
}
function updateTelemetryDisplay(
    telemetryElement,
    telemetry
) {

    telemetryElement.innerHTML = `
        <span>
            LIVE TELEMETRY
        </span>

        <p>
            ${telemetry.sensor.toUpperCase()}
            <b>
                ${telemetry.value} ${telemetry.unit}
            </b>
        </p>
    `;
}
function updateTelemetryChart(
    chartElement,
    experimentRunId,
    telemetry
) { console.log("CHART TELEMETRY:", telemetry);
console.log("CHART MIN:", telemetry.min);
console.log("CHART MAX:", telemetry.max);

    const key = String(experimentRunId);

    if (!telemetryHistory.has(key)) {
        telemetryHistory.set(key, []);
    }

    const history = telemetryHistory.get(key);

    history.push({
        value: telemetry.value,
        timestamp: new Date(telemetry.timestamp)
    });

    // Keep only the latest 30 seconds
    if (history.length > 30) {
        history.shift();
    }

    const values = history.map(point => point.value);

    // =================================
    // FIXED EXPERIMENT RANGE
    // =================================

   const chartMin = Number(telemetry.min);
const chartMax = Number(telemetry.max);

const chartRange = chartMax - chartMin;

const top = 12;
const bottom = 78;

function valueToY(value) {

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return bottom;
    }

    const normalized =
        (numericValue - chartMin) / chartRange;

    const clamped =
        Math.max(0, Math.min(1, normalized));

    return bottom -
        (clamped * (bottom - top));
}
    // =================================
    // TELEMETRY LINE
    // =================================

    const width = 300;

    const points = history.map((point, index) => {

        const x =
            history.length === 1
                ? width / 2
                : 35 +
                  (index / (history.length - 1)) *
                  (width - 35);

        const y = valueToY(point.value);

        return `${x},${y}`;

    }).join(" ");

    const line =
        chartElement.querySelector(
            ".telemetry-chart-line"
        );

    line.setAttribute("points", points);

    // =================================
    // REFERENCE LINES
    // =================================

    chartElement
        .querySelector(".max-line")
        .setAttribute("y1", valueToY(chartMax));

    chartElement
        .querySelector(".max-line")
        .setAttribute("y2", valueToY(chartMax));

    chartElement
        .querySelector(".warning-line")
        .setAttribute("y1", valueToY(telemetry.warning));

    chartElement
        .querySelector(".warning-line")
        .setAttribute("y2", valueToY(telemetry.warning));

    chartElement
        .querySelector(".critical-line")
        .setAttribute("y1", valueToY(telemetry.critical));

    chartElement
        .querySelector(".critical-line")
        .setAttribute("y2", valueToY(telemetry.critical));

    chartElement
        .querySelector(".min-line")
        .setAttribute("y1", valueToY(chartMin));

    chartElement
        .querySelector(".min-line")
        .setAttribute("y2", valueToY(chartMin));

    // =================================
    // LABEL POSITIONS
    // =================================

    chartElement
        .querySelector(".max-label")
        .setAttribute("y", valueToY(chartMax) + 3);

    chartElement
        .querySelector(".warning-label")
        .setAttribute("y", valueToY(telemetry.warning) + 3);

    chartElement
        .querySelector(".critical-label")
        .setAttribute("y", valueToY(telemetry.critical) + 3);

    chartElement
        .querySelector(".min-label")
        .setAttribute("y", valueToY(chartMin) + 3);

    // =================================
    // LAST 30s MIN / MAX
    // =================================

    const observedMin =
        Math.min(...values);

    const observedMax =
        Math.max(...values);

    chartElement
        .querySelector(".chart-min-value")
        .textContent =
        `MIN ${chartMin} ${telemetry.unit}`;

    chartElement
        .querySelector(".chart-max-value")
        .textContent =
        `MAX ${chartMax} ${telemetry.unit}`;
    }

async function refreshMachines() {
    machines = await loadIdleMachines();
    console.log("MACHINES UPDATED:", machines);
}
async function checkExperiments() {

    const experiments = await loadAllExperimentRuns();

    for (const experiment of experiments) {

        if (
            experiment.status === "RUNNING" &&
            new Date() >= new Date(experiment.endedAt)
        ) {

            console.log("EXPERIMENT TIME ENDED:", experiment._id);
            stopTelemetry(experiment._id);
            await statusComplete(
                experiment._id,
                experiment.name
            );
            refreshMachines();
            await window.loadSystemLogs();
            const status = document.querySelector(
                `[data-experiment-id="${experiment._id}"]`
            );

            if (status) {
                status.innerHTML = "[COMPLETED]";
                status.classList.remove("running");
                status.classList.add("completed");
            }

            await loadSystemLogs();

            console.log("EXPERIMENT COMPLETED AUTOMATICALLY:", experiment._id);
        }
    }
}




// 1.4 OPEN EXPERIMENT MODAL
openExperimentModal.addEventListener("click", async () => {
//  console.log("8 dentro de openExperimentModal.addEventListener")
    renderMachines();
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

try {

    const savedRun = await startExperiment(experimentRunObject);

    console.log("Experiment run started:", savedRun);

    const updatedMachine = await updateStatus(selectedMachineId);

    console.log("Machine status updated:", updatedMachine);

    window.location.reload();

} catch (error) {

    console.error("Error starting experiment:", error);

}

  


});

/* =========================
   ExperimentRun Display on live page
========================= */

livePageButton.addEventListener('click', async () => {
    await refreshMachines();
    experimentList.innerHTML = "";
    const experimentRuns = await loadAllExperimentRuns();
    renderExperimentCards(experimentRuns);


});

setInterval(checkExperiments, 1000);
