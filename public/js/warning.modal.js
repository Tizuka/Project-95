/* =========================
   WARNING MODAL + SOUND FX
========================= */

const warningModal =
    document.getElementById("warningModal");

const warningText =
    document.getElementById("warningText");

const doNotClick =
    document.getElementById("doNotClick");

const closeWarning =
    document.getElementById("closeWarning");

const warningMusic =
    document.getElementById("warningMusic");

const errorSound =
    document.getElementById("errorSound");

const typingSound =
    document.getElementById("typingSound");

const glitchSound =
    document.getElementById("glitchSound");

let warningTimers = [];
let glitchTimer = null;


/* =========================
   SOUND HELPERS
========================= */

function playSound(audio, volume = 1) {

    if (!audio) return;

    audio.volume = volume;
    audio.currentTime = 0;

    audio.play().catch(() => {
        // Browser autoplay restrictions are expected on some devices.
    });
}


/* =========================
   INITIALIZING SOUND
========================= */



/* =========================
   RANDOM GLITCH SOUND
========================= */

function scheduleRandomGlitch() {

    const delay =
        25000 + Math.random() * 50000;

    glitchTimer = setTimeout(() => {

        if (!warningModal.classList.contains("active")) {

            playSound(glitchSound, 0.16);

            document.body.classList.add("screen-glitch");

            setTimeout(() => {

                document.body.classList.remove(
                    "screen-glitch"
                );

            }, 220);

        }

        scheduleRandomGlitch();

    }, delay);

}

scheduleRandomGlitch();


/* =========================
   PAUSE
========================= */

function warningPause(ms) {

    return new Promise(resolve => {

        const timer = setTimeout(resolve, ms);

        warningTimers.push(timer);

    });

}


/* =========================
   TYPE WARNING LINE
========================= */

async function typeWarningLine(
    text,
    speed = 35
) {

    const cursor =
        document.createElement("span");

    cursor.textContent = "█";

    cursor.classList.add(
        "warning-waiting-cursor"
    );

    warningText.appendChild(cursor);

    await warningPause(1000);

    cursor.remove();

    const line =
        document.createElement("div");

    warningText.appendChild(line);

    /*
     * Typing sound starts when the typing effect begins.
     * It is intentionally played once per line rather than
     * once per character, avoiding an unpleasant overlapping loop.
     */

    playSound(typingSound, 0.28);

    for (const character of text) {

        line.textContent += character;

        await warningPause(speed);

    }

    typingSound.pause();
    typingSound.currentTime = 0;

}


/* =========================
   SHOW WARNING
========================= */

export async function showWarning(
    machineSelected,
    experimentSelected
) {

    warningText.innerHTML = "";

    /*
     * Error sound happens as the warning opens.
     */

    playSound(errorSound, 0.45);

    warningModal.classList.add(
        "active"
    );


    const machineStatus =
        machineSelected
            ? "> MACHINE: READY"
            : "> MACHINE: NOT SELECTED";


    const experimentStatus =
        experimentSelected
            ? "> EXPERIMENT: READY"
            : "> EXPERIMENT: NOT SELECTED";


    await typeWarningLine(
        "> SYSTEM CHECK:",
        10
    );


    await typeWarningLine(
        machineStatus,
        10
    );


    await typeWarningLine(
        experimentStatus,
        10
    );


    if (
        !machineSelected &&
        !experimentSelected
    ) {

        await typeWarningLine(
            "> REQUEST DENIED.",
            25
        );

        await typeWarningLine(
            "> SELECT BOTH PARAMETERS.",
            10
        );

    }

    else if (!machineSelected) {

        await typeWarningLine(
            "> REQUEST DENIED.",
            10
        );

        await typeWarningLine(
            "> SELECT A MACHINE.",
            10
        );

    }

    else if (!experimentSelected) {

        await typeWarningLine(
            "> REQUEST DENIED.",
            10
        );

        await typeWarningLine(
            "> SELECT AN EXPERIMENT.",
            10
        );

    }

}


/* =========================
   DO NOT CLICK
========================= */

doNotClick.addEventListener(
    "click",
    async () => {

        playSound(errorSound, 0.45);

        warningModal.classList.add(
            "active"
        );


        warningMusic.currentTime = 0;

        warningMusic.play().catch(error => {

            console.log(
                "Music could not start:",
                error
            );

        });


        warningText.innerHTML = "";


        const waitingCursor =
            document.createElement("span");

        waitingCursor.textContent = "█";

        waitingCursor.classList.add(
            "warning-waiting-cursor"
        );

        warningText.appendChild(
            waitingCursor
        );


        await warningPause(2000);


        waitingCursor.remove();


        await typeWarningLine(
            "> FACILITY STATUS:",
            10
        );


        await warningPause(1300);


        await typeWarningLine(
            "> CONTAINMENT: FAILED",
            10
        );


        await warningPause(1300);


        await typeWarningLine(
            "EXTERNAL COMMUNICATION: LOST",
            10
        );


        await warningPause(1300);


        await typeWarningLine(
            "> POWER GRID: UNSTABLE",
            10
        );


        await warningPause(1000);


        await typeWarningLine(
            "...",
            20
        );


        await warningPause(1300);


        await typeWarningLine(
            "RADIO SIGNAL DETECTED.",
            10
        );


        await typeWarningLine(
            "PLAYING ARCHIVED BROADCAST...",
            10
        );


        console.log(
            "WARNING MESSAGE COMPLETE"
        );

    }
);


/* =========================
   CLOSE WARNING
========================= */

function closeWarningModal() {

    warningTimers.forEach(
        timer => clearTimeout(timer)
    );

    warningTimers = [];


    warningModal.classList.remove(
        "active"
    );


    warningMusic.pause();

    warningMusic.currentTime = 0;

    typingSound.pause();
    typingSound.currentTime = 0;

    warningText.innerHTML = "";

}


closeWarning.addEventListener(
    "click",
    closeWarningModal
);


/* =========================
   CLOSE WITH ESC
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            warningModal.classList.contains("active")
        ) {

            closeWarningModal();

        }

    }
);


/* =========================
   CLOSE OUTSIDE
========================= */

warningModal.addEventListener(
    "click",
    event => {

        if (event.target === warningModal) {

            closeWarningModal();

        }

    }
);
