// =========================================================
// SWAHILI PROVERBS APP
// Navigation + Proverbs + Browse + Quiz + Stats
// =========================================================

let proverbs = [];

let currentQuestion = 0;
let quizScore = 0;
let quizQuestions = [];
let quizFinished = false;


// =========================================================
// LOAD PROVERBS
// =========================================================

async function loadProverbs() {
  try {
    const response = await fetch("proverbs.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch proverbs.json: ${response.status}`);
    }
    proverbs = await response.json();
    renderProverbOfTheDay();
  } catch (err) {
    console.error("Error loading proverbs:", err);

    document.getElementById(
      "proverb-of-the-day"
    ).innerHTML = `
      <p class="loading">
        Could not load proverbs. Please refresh.
      </p>
    `;

    document.getElementById(
      "proverb-list"
    ).innerHTML = `
      <p class="loading">
        Could not load proverbs.
      </p>
    `;
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
      <strong>${proverb.proverb}</strong>
    </p>

    <p class="proverb-meaning">
      ${proverb.meaning}
    </p>
  `;
}


// =========================================================
// BROWSE
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
          proverb => {

            const text =
              String(
                proverb.proverb || ""
              ).toLowerCase();

            const meaning =
              String(
                proverb.meaning || ""
              ).toLowerCase();

            return (
              text.includes(query) ||
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

  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.getAttribute(
            "data-view"
          );

        switchView(target);

        buttons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        // Start quiz when Quiz is opened
        if (target === "quiz") {
          startQuiz();
        }

      }
    );

  });
}


// =========================================================
// VIEW SWITCHING
// =========================================================

function switchView(viewName) {

  document
    .querySelectorAll(".view")
    .forEach(section => {

      section.classList.add("hidden");

    });

  const target =
    document.getElementById(
      `view-${viewName}`
    );

  if (target) {

    target.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
}


// =========================================================
// HOME BUTTONS
// =========================================================

function setupViewButtons() {

  const buttons =
    document.querySelectorAll(
      "[data-view]"
    );

  buttons.forEach(button => {

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

        document
          .querySelectorAll(".nav-btn")
          .forEach(navButton => {

            navButton.classList.toggle(
              "active",
              navButton.getAttribute(
                "data-view"
              ) === view
            );

          });

        if (view === "quiz") {
          startQuiz();
        }

      }
    );

  });
}


// =========================================================
// START QUIZ
// =========================================================

function startQuiz() {

  if (!proverbs.length) {
    return;
  }

  // Use up to 10 questions
  quizQuestions = shuffle(
    [...proverbs]
  ).slice(
    0,
    Math.min(10, proverbs.length)
  );

  currentQuestion = 0;

  quizScore = 0;

  quizFinished = false;

  showQuestion();
}


// =========================================================
// SHOW QUESTION
// =========================================================

function showQuestion() {

  const container =
    document.getElementById(
      "quiz-container"
    );

  if (!container) return;

  const proverb =
    quizQuestions[currentQuestion];

  if (!proverb) {
    finishQuiz();
    return;
  }


  // Generate answer choices
  const answers =
    generateAnswers(proverb);


  container.innerHTML = `

    <div class="quiz-progress">

      QUESTION
      ${currentQuestion + 1}
      /
      ${quizQuestions.length}

    </div>


    <div class="quiz-question">

      "${proverb.proverb}"

    </div>


    <p class="quiz-prompt">

      What does this proverb mean?

    </p>


    <div class="quiz-options">

      ${answers.map(
        (answer, index) => `

          <button
            class="quiz-option"
            data-answer="${encodeURIComponent(answer)}"
          >

            <span class="answer-letter">
              ${String.fromCharCode(65 + index)}
            </span>

            <span>
              ${answer}
            </span>

          </button>

        `
      ).join("")}

    </div>

  `;


  // Add click listeners
  container
    .querySelectorAll(".quiz-option")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const answer =
            decodeURIComponent(
              button.dataset.answer
            );

          checkAnswer(
            answer,
            proverb,
            container
          );

        }
      );

    });

}


// =========================================================
// GENERATE ANSWERS
// =========================================================

function generateAnswers(correctProverb) {

  const correct =
    correctProverb.meaning;


  const otherMeanings =
    proverbs
      .filter(
        proverb =>
          proverb.meaning !== correct
      )
      .map(
        proverb =>
          proverb.meaning
      );


  const shuffledWrong =
    shuffle(otherMeanings)
      .slice(0, 3);


  const answers = [
    correct,
    ...shuffledWrong
  ];


  return shuffle(answers);
}


// =========================================================
// CHECK ANSWER
// =========================================================

function checkAnswer(
  selectedAnswer,
  proverb,
  container
) {

  const buttons =
    container.querySelectorAll(
      ".quiz-option"
    );


  buttons.forEach(button => {

    button.disabled = true;

  });


  const isCorrect =
    selectedAnswer ===
    proverb.meaning;


  if (isCorrect) {

    quizScore++;

  }


  buttons.forEach(button => {

    const answer =
      decodeURIComponent(
        button.dataset.answer
      );


    if (
      answer ===
      proverb.meaning
    ) {

      button.classList.add(
        "correct"
      );

    }


    if (
      answer ===
      selectedAnswer &&
      !isCorrect
    ) {

      button.classList.add(
        "incorrect"
      );

    }

  });


  const feedback =
    document.createElement(
      "div"
    );

  feedback.className =
    "quiz-feedback";


  feedback.innerHTML = isCorrect

    ? `
      <strong>✓ Correct</strong>
      <p>
        Well done. You understand
        this proverb.
      </p>
    `

    : `
      <strong>✕ Not quite</strong>
      <p>
        The correct meaning is:
        <br>
        <strong>
          ${proverb.meaning}
        </strong>
      </p>
    `;


  container.appendChild(
    feedback
  );


  const nextButton =
    document.createElement(
      "button"
    );

  nextButton.className =
    "solid-btn quiz-next";

  nextButton.textContent =
    currentQuestion ===
    quizQuestions.length - 1
      ? "See Results →"
      : "Next Question →";


  nextButton.addEventListener(
    "click",
    () => {

      currentQuestion++;

      if (
        currentQuestion >=
        quizQuestions.length
      ) {

        finishQuiz();

      } else {

        showQuestion();

      }

    }
  );


  container.appendChild(
    nextButton
  );

}


// =========================================================
// FINISH QUIZ
// =========================================================

function finishQuiz() {

  quizFinished = true;

  const total =
    quizQuestions.length;

  const percentage =
    Math.round(
      (quizScore / total) * 100
    );

  recordQuizResult(quizScore, total);

  const container =
    document.getElementById(
      "quiz-container"
    );


  container.innerHTML = `

    <div class="quiz-results">

      <div class="eyebrow">
        QUIZ COMPLETE
      </div>

      <div class="quiz-score">
        ${quizScore}
        <span>/ ${total}</span>
      </div>

      <div class="quiz-percentage">
        ${percentage}%
      </div>

      <p>
        ${
          percentage >= 80
            ? "Excellent. You know your Swahili wisdom."
            : percentage >= 50
              ? "Good work. Keep exploring the proverbs."
              : "Keep learning. There is more wisdom to discover."
        }
      </p>

      <div class="quiz-result-actions">

        <button
          class="solid-btn"
          id="retry-quiz"
        >
          Try Again →
        </button>

        <button
          class="outline-btn"
          id="browse-after-quiz"
        >
          Browse Proverbs ↗
        </button>

      </div>

    </div>

  `;


  document
    .getElementById(
      "retry-quiz"
    )
    .addEventListener(
      "click",
      startQuiz
    );


  document
    .getElementById(
      "browse-after-quiz"
    )
    .addEventListener(
      "click",
      () => {

        switchView("browse");

        document
          .querySelectorAll(
            ".nav-btn"
          )
          .forEach(button => {

            button.classList.toggle(
              "active",
              button.dataset.view ===
              "browse"
            );

          });

      }
    );


  updateStats();
}


// =========================================================
// SHUFFLE
// =========================================================

function shuffle(array) {

  return array.sort(
    () =>
      Math.random() - 0.5
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

  if (proverbCount) {

    proverbCount.textContent =
      proverbs.length;

  }


  const score =
    document.getElementById(
      "stat-score"
    );

  if (score) {

    if (quizQuestions.length) {

      const percentage =
        Math.round(
          (quizScore /
            quizQuestions.length) *
            100
        );

      score.textContent =
        `${percentage}%`;

    } else {

      score.textContent =
        "0%";

    }

  }


  const quizzes =
    document.getElementById(
      "stat-quizzes"
    );

  if (quizzes) {

    quizzes.textContent =
      quizQuestions.length
        ? quizQuestions.length
        : 0;

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