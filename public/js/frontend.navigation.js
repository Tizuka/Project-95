
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

const navigationButtons = document.querySelectorAll(".nav-btn"); 
const initializingSound = document.getElementById("initializingSound");

let liveInitializationPlayed = false;
let machinesInitializationPlayed = false;

function playInitializingSound() {
    if (!initializingSound) return;

    initializingSound.volume = 0.18;
    initializingSound.currentTime = 0;

    initializingSound.play().catch(() => {});
}

navigationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageId =
            button.dataset.page;
if (
    pageId === "live" &&
    !liveInitializationPlayed
) {
    playInitializingSound();
    liveInitializationPlayed = true;
}

if (
    pageId === "machines" &&
    !machinesInitializationPlayed
) {
    playInitializingSound();
    machinesInitializationPlayed = true;
}

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



/* =========================
   Expand on see details
========================= */
const detailButtons = document.querySelectorAll(
    ".experiment-card .align-running-details button"
);

detailButtons.forEach(button => {
    button.addEventListener("click", () => {

        const card = button.closest(".experiment-card");

        const isExpanded = card.classList.toggle("expanded");

        button.textContent = isExpanded
            ? "〈 HIDE DETAILS 〉"
            : "〈 VIEW DETAILS 〉";

    });
});

