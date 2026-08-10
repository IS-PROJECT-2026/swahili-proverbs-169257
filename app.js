// =========================================================
// app.js
// Navigation, proverb loading, browse and basic statistics
// =========================================================

let proverbs = [];

let quizScore = 0;
let quizAttempts = 0;


// =========================================================
// LOAD PROVERBS
// =========================================================

async function loadProverbs() {

  try {

    const response = await fetch("proverbs.json");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch proverbs.json: ${response.status}`
      );
    }

    proverbs = await response.json();

    renderProverbOfTheDay();
    renderBrowse();
    updateStats();

  } catch (err) {

    console.error(
      "Error loading proverbs:",
      err
    );

    const home = document.getElementById(
      "proverb-of-the-day"
    );

    const browse = document.getElementById(
      "proverb-list"
    );

    if (home) {
      home.innerHTML = `
        <p class="loading">
          Could not load proverbs. Please refresh.
        </p>
      `;
    }

    if (browse) {
      browse.innerHTML = `
        <p class="loading">
          Could not load proverbs.
        </p>
      `;
    }

  }

}


// =========================================================
// PROVERB OF THE DAY
// =========================================================

function renderProverbOfTheDay() {

  const container =
    document.getElementById(
      "proverb-of-the-day"
    );

  if (!container) return;


  if (!proverbs.length) {

    container.innerHTML = `
      <p class="loading">
        No proverbs available.
      </p>
    `;

    return;
  }


  const proverb = proverbs[0];


  container.innerHTML = `

    <p class="proverb-text">
      <strong>
        ${proverb.proverb}
      </strong>
    </p>

    <p class="proverb-meaning">
      ${proverb.meaning}
    </p>

  `;
}


// =========================================================
// BROWSE PROVERBS
// =========================================================

function renderBrowse(list = proverbs) {

  const container =
    document.getElementById(
      "proverb-list"
    );

  if (!container) return;


  if (!list.length) {

    container.innerHTML = `
      <p class="loading">
        No proverbs found.
      </p>
    `;

    return;
  }


  container.innerHTML = list.map(
    (proverb, index) => `

      <article class="proverb-card">

        <div class="eyebrow">
          ${String(index + 1).padStart(2, "0")}
        </div>

        <p class="proverb-text">
          <strong>
            ${proverb.proverb}
          </strong>
        </p>

        <p class="proverb-meaning">
          ${proverb.meaning}
        </p>

      </article>

    `
  ).join("");

}


// =========================================================
// SEARCH
// =========================================================

function setupSearch() {

  const searchInput =
    document.getElementById(
      "search-input"
    );

  if (!searchInput) return;


  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .toLowerCase()
          .trim();


      if (!query) {

        renderBrowse(proverbs);

        return;
      }


      const filtered =
        proverbs.filter(
          (proverb) => {

            const proverbText =
              String(
                proverb.proverb || ""
              ).toLowerCase();


            const meaning =
              String(
                proverb.meaning || ""
              ).toLowerCase();


            return (
              proverbText.includes(query) ||
              meaning.includes(query)
            );

          }
        );


      renderBrowse(filtered);

    }
  );

}


// =========================================================
// NAVIGATION
// =========================================================

function setupNav() {

  const buttons =
    document.querySelectorAll(
      ".nav-btn"
    );


  buttons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const target =
            button.getAttribute(
              "data-view"
            );


          switchView(target);


          buttons.forEach(
            (btn) => {

              btn.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );

        }
      );

    }
  );

}


// =========================================================
// SWITCH VIEW
// =========================================================

function switchView(viewName) {

  document
    .querySelectorAll(".view")
    .forEach(
      (section) => {

        section.classList.add(
          "hidden"
        );

      }
    );


  const target =
    document.getElementById(
      `view-${viewName}`
    );


  if (target) {

    target.classList.remove(
      "hidden"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

}


// =========================================================
// CLICKABLE HOME BUTTONS
// =========================================================

function setupViewButtons() {

  const buttons =
    document.querySelectorAll(
      "[data-view]"
    );


  buttons.forEach(
    (button) => {

      /*
       * Don't attach this handler to
       * the main navigation buttons.
       */

      if (
        button.classList.contains(
          "nav-btn"
        )
      ) {
        return;
      }


      button.addEventListener(
        "click",
        () => {

          const view =
            button.getAttribute(
              "data-view"
            );


          switchView(view);


          const navButtons =
            document.querySelectorAll(
              ".nav-btn"
            );


          navButtons.forEach(
            (navButton) => {

              navButton.classList.toggle(
                "active",
                navButton.getAttribute(
                  "data-view"
                ) === view
              );

            }
          );

        }
      );

    }
  );

}


// =========================================================
// STATS
// =========================================================

function updateStats() {

  const proverbCount =
    document.getElementById(
      "stat-proverbs"
    );

  const score =
    document.getElementById(
      "stat-score"
    );

  const quizzes =
    document.getElementById(
      "stat-quizzes"
    );


  if (proverbCount) {

    proverbCount.textContent =
      proverbs.length;

  }


  if (score) {

    const percentage =
      quizAttempts > 0
        ? Math.round(
            (quizScore /
              quizAttempts) *
              100
          )
        : 0;


    score.textContent =
      `${percentage}%`;

  }


  if (quizzes) {

    quizzes.textContent =
      quizAttempts;

  }

}


// =========================================================
// INITIALISE
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupNav();

    setupSearch();

    setupViewButtons();

    loadProverbs();

  }
);