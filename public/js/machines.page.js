import { loadMachines } from '../../5-fetch/machine.fetch.js';

const machines = await loadMachines();

const machineButton = document.getElementById("machine-page-button");
const machineList = document.querySelector(".machines-list");

machineButton.addEventListener("click", async () => {

    machineList.innerHTML = "";

    machines.forEach(element => {

        const cardHead = document.createElement("div");

        cardHead.classList.add("card-head");


        const insideCardHeadSpan = document.createElement("span");

        insideCardHeadSpan.textContent = element.name;


        const insideCardHeadDiv = document.createElement("div");

        insideCardHeadDiv.classList.add(
            "align-running-details"
        );


        const insideDiv = document.createElement("b");

        insideDiv.classList.add("status.running");

        if (element.status === "IDLE") {
            insideDiv.classList.remove("status.running");
            insideDiv.classList.add("idle-status");
        } 



        insideDiv.textContent = `[${element.status}]`;


        insideCardHeadDiv.append(insideDiv);

        cardHead.append(insideCardHeadSpan);
        cardHead.append(insideCardHeadDiv);


        
        machineList.append(cardHead);

    });

});