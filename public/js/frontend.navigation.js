
/* =========================
WARNING POPUP + MUSIC
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


let typedInstance = null;


/* =========================
   OPEN WARNING
========================= */

doNotClick.addEventListener("click", () => {

    /*
     * Open popup
     */
    warningModal.classList.add("active");


    /*
     * Restart music from
     * the beginning
     */
    warningMusic.currentTime = 0;

    warningMusic.play().catch(error => {
        console.log("Music could not start:", error);
    });


    /*
     * Clear previous text
     * so the animation restarts
     */
    warningText.innerHTML = "";


    /*
     * Start Typed.js
     */
    typedInstance = new Typed("#warningText", {

        strings: [
            `FACILITY STATUS: 

CONTAINMENT: FAILED
EXTERNAL COMMUNICATION: LOST
POWER GRID: UNSTABLE

...

RADIO SIGNAL DETECTED.

PLAYING ARCHIVED BROADCAST...`
        ],

        typeSpeed: 35,

        startDelay: 300,

        showCursor: true,

        cursorChar: "█",

        autoInsertCss: true,

        onComplete: () => {

            console.log(
                "WARNING MESSAGE COMPLETE"
            );

        }

    });

});


/* =========================
   CLOSE WARNING
========================= */

function closeWarningModal() {

    /*
     * Close popup
     */
    warningModal.classList.remove("active");


    /*
     * Stop music
     */
    warningMusic.pause();


    /*
     * Reset music position
     * so it starts from the
     * beginning next time
     */
    warningMusic.currentTime = 0;


    /*
     * Destroy Typed.js instance
     * so the text animation
     * also starts from zero
     */
    if (typedInstance) {

        typedInstance.destroy();

        typedInstance = null;

    }

}


/* =========================
   CLOSE BUTTON
========================= */

closeWarning.addEventListener(
    "click",
    closeWarningModal
);


/* =========================
   CLOSE WITH ESC
========================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        warningModal.classList.contains("active")
    ) {

        closeWarningModal();

    }

});


/* =========================
   CLOSE WHEN CLICKING
   OUTSIDE THE WINDOW
========================= */

warningModal.addEventListener("click", (event) => {

    if (event.target === warningModal) {

        closeWarningModal();

    }

});
/*
 * ADD EXPERIMENT MODAL
 */

const experimentModal =
    document.getElementById("experiment-modal");

const openExperimentModal =
    document.getElementById("open-experiment-modal");

const closeExperimentModal =
    document.getElementById("close-experiment-modal");

const cancelExperiment =
    document.getElementById("cancel-experiment");


/*
 * OPEN MODAL
 */

openExperimentModal.addEventListener("click", () => {

    experimentModal.classList.add("active");

});


/*
 * CLOSE MODAL
 */

function closeModal() {

    experimentModal.classList.remove("active");

}


closeExperimentModal.addEventListener(
    "click",
    closeModal
);


cancelExperiment.addEventListener(
    "click",
    closeModal
);


/*
 * CLOSE WHEN CLICKING OUTSIDE
 */

experimentModal.addEventListener("click", (event) => {

    if (event.target === experimentModal) {

        closeModal();

    }

});


/*
 * CLOSE WITH ESCAPE
 */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        experimentModal.classList.contains("active")
    ) {

        closeModal();

    }

});
/*
 * PAGE NAVIGATION
 */

const navigationButtons =
    document.querySelectorAll(".nav-btn");


navigationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageId =
            button.dataset.page;


        /*
         * Hide every page
         */

        document
            .querySelectorAll(".page")
            .forEach(page => {

                page.classList.remove(
                    "active-page"
                );

            });


        /*
         * Show selected page
         */

        const selectedPage =
            document.getElementById(pageId);


        if (selectedPage) {

            selectedPage.classList.add(
                "active-page"
            );

        }


        /*
         * Update active navigation button
         */

        navigationButtons.forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


        document
            .querySelectorAll(
                `.nav-btn[data-page="${pageId}"]`
            )
            .forEach(btn => {

                btn.classList.add(
                    "active"
                );

            });

    });

});



/*
 * LIVE CLOCK
 */

function updateClock() {

    const currentTime =
        new Date()
            .toLocaleTimeString(
                "en-US",
                {
                    hour12: false
                }
            );


    document
        .getElementById("clock")
        .textContent = currentTime;

}


updateClock();


setInterval(
    updateClock,
    1000
);

