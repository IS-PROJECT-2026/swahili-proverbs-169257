// =========================================================
// SWAHILI PROVERBS APP
// Stage: + basic quiz shell (naive answers, no scoring yet)
// =========================================================

let proverbs = [];
let currentQuestion = 0;
let quizQuestions = [];

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
    document.getElementById("proverb-of-the-day").innerHTML =
      "<p class='loading'>Could not load proverbs. Please refresh.</p>";
  }
}

function renderProverbOfTheDay() {
  const container = document.getElementById("proverb-of-the-day");
  if (!proverbs.length) {
    container.innerHTML = "<p class='loading'>No proverbs available.</p>";
    return;
  }
  const proverb = proverbs[0]; // date-seeded logic comes in Issue #9
  container.innerHTML = `
    <p class="proverb-text"><strong>${proverb.proverb}</strong></p>
    <p class="proverb-meaning">${proverb.meaning}</p>
  `;
}

// --- Quiz shell (Issue #5) ---

function startQuiz() {
  if (!proverbs.length) return;
  quizQuestions = [...proverbs].slice(0, Math.min(10, proverbs.length));
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  const proverb = quizQuestions[currentQuestion];
  if (!proverb) {
    container.innerHTML = "<p class='loading'>Quiz complete. Scoring logic coming in Issue #8.</p>";
    return;
  }

  // Naive answer set for now — first 3 other meanings + correct one,
  // no shuffling, no duplicate-avoidance yet. Upgraded in Issue #6.
  const wrongAnswers = proverbs
    .filter((p) => p.meaning !== proverb.meaning)
    .slice(0, 3)
    .map((p) => p.meaning);
  const answers = [proverb.meaning, ...wrongAnswers];

  container.innerHTML = `
    <div class="quiz-progress">QUESTION ${currentQuestion + 1} / ${quizQuestions.length}</div>
    <div class="quiz-question">"${proverb.proverb}"</div>
    <p class="quiz-prompt">What does this proverb mean?</p>
    <div class="quiz-options">
      ${answers.map((answer, index) => `
        <button class="quiz-option" data-answer="${encodeURIComponent(answer)}">
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
          <span>${answer}</span>
        </button>
      `).join("")}
    </div>
  `;

  // Clicking just advances for now — feedback/scoring land in Issues #7-8
  container.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      currentQuestion++;
      showQuestion();
    });
  });
}

function setupNav() {
  const buttons = document.querySelectorAll(".nav-btn, [data-view]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-view");
      switchView(target);
      document.querySelectorAll(".nav-btn").forEach((b) => {
        b.classList.toggle("active", b.getAttribute("data-view") === target);
      });
      if (target === "quiz") {
        startQuiz();
      }
    });
  });
}

function switchView(viewName) {
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.add("hidden");
  });
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  loadProverbs();
});