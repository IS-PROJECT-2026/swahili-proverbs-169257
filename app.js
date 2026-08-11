// =========================================================
// SWAHILI PROVERBS APP
// Stage: basic load + navigation only
// =========================================================

let proverbs = [];

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
  // Placeholder: picks the first proverb for now.
  // Date-seeded selection logic is implemented in Issue #9.
  const proverb = proverbs[0];
  container.innerHTML = `
    <p class="proverb-text"><strong>${proverb.proverb}</strong></p>
    <p class="proverb-meaning">${proverb.meaning}</p>
  `;
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