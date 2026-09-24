const systemLog = document.getElementById("system-log");
const homeLogList = document.querySelector(".home-log-list");

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

window.loadSystemLogs = async function () {

    console.log("1 - LOAD SYSTEM LOGS");

    console.log("HOME LOG:", homeLogList);

    const response = await fetch(
        "http://127.0.0.1:3000/systemLog"
    );

    console.log("2 - RESPONSE:", response);

    const logs = await response.json();

    console.log("3 - LOGS:", logs);
    console.log("4 - NUMBER OF LOGS:", logs.length);

    homeLogList.innerHTML = "";

    for (let i = 0; i < logs.length; i++) {

        console.log("5 - WAITING FOR LOG:", i);

        if (i === 0) {
            await wait(5000);
        } else {
            await wait(10000);
        }

        console.log("6 - SHOWING LOG:", logs[i]);

        const log = logs[i];

        const p = document.createElement("p");
        const span = document.createElement("span");

        const date = new Date();

        span.textContent = `[${date.toLocaleTimeString("en-US", {
            hour12: false
        })}]`;

        p.appendChild(span);
        p.append(` ${log.message}`);

        homeLogList.appendChild(p);
    }

    console.log("7 - FINISHED");
};

loadSystemLogs();