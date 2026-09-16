import { loadAllExperimentRuns } from '../../5-fetch/experiment.run.fetch.js';
import {getExperimentFromId} from '../../5-fetch/experiments.fetch.js'

const historyPageButton = document.getElementById("history-page-button");
const experimentRun = await loadAllExperimentRuns();
const historyItem = document.getElementById("history-item");
var index =0;

function capitalizeWords(text) {
    return text
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
}

function formatDate(startedAt) {
    const date = new Date(startedAt);
    const now = new Date();

    const diff = now - date;
    const oneDay = 24 * 60 * 60 * 1000;

    if (date.toDateString() === now.toDateString()) {
        return `Today, ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}`;
    }

    const daysAgo = Math.floor(diff / oneDay);

    if (daysAgo < 7) {
        return `${daysAgo} days ago`;
    }

    return date.toLocaleDateString();
}

function getExperimentIcon(experimentValue) {
    if (experimentValue === "cryogenic") {
        return "❄";
    }

    if (experimentValue === "radiation") {
        return "☢";
    }

    if (experimentValue === "pressure") {
        return "⚗";
    }

    if (experimentValue === "thermal-stability") {
        return "⚗";
    }

    return "";
}

historyPageButton.addEventListener("click", async ()=>{
  historyItem.innerHTML = '';
  if (experimentRun.length === 0) {
    historyItem.textContent = "-- NO HISTORY AVAILABLE --";
    return;
}
  index = 0;
const reversedExperimentRun = [...experimentRun].reverse();
experimentRun.forEach(async element => {

const getExperimentName = await getExperimentFromId(element.experimentId);   
  const number = 1841 + reversedExperimentRun.length - index;
  index ++;
  const insideDivId = document.createElement("div");

  insideDivId.textContent = `${getExperimentIcon((getExperimentName[0].value.toLowerCase()))} #${number}`;
  const insideDivExperiment = document.createElement("div");
  insideDivExperiment.textContent = capitalizeWords(getExperimentName[0].name);
  console.log(getExperimentName.name);
  const insideDivMachine = document.createElement("div");
  insideDivMachine.textContent = element.name;
  const insideBStatus = document.createElement("b");
  insideBStatus.textContent = element.status;
insideBStatus.classList.add(element.status);
  const insideDivDate = document.createElement("div");
  insideDivDate.textContent = formatDate(element.startedAt);

  historyItem.append(insideDivId);
  historyItem.append(insideDivExperiment);
  historyItem.append(insideDivMachine);
  historyItem.append(insideBStatus);
  historyItem.append(insideDivDate);


});

});