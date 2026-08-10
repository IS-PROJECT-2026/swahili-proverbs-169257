// utils.js
// Utility functions for reading and writing user progress to localStorage.
// Progress includes: quiz scores, streak count, last played date, and
// per-proverb history. Used across the quiz, browse, and stats features.

const STORAGE_KEY = "swahiliProverbsProgress";

/**
 * Returns the default shape of progress data for a first-time user.
 */
function getDefaultProgress() {
  return {
    totalScore: 0,
    quizzesTaken: 0,
    streak: 0,
    lastPlayedDate: null,
    history: [] // { date, score, total }
  };
}

/**
 * Reads progress from localStorage. If nothing exists yet (first-time
 * use) or the stored data is corrupted/unparseable, returns a fresh
 * default progress object instead of throwing.
 */
function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultProgress();
    }
    const parsed = JSON.parse(raw);
    // Basic shape check in case of corrupted/older data
    if (typeof parsed !== "object" || parsed === null) {
      return getDefaultProgress();
    }
    return { ...getDefaultProgress(), ...parsed };
  } catch (err) {
    console.error("Failed to read progress from localStorage:", err);
    return getDefaultProgress();
  }
}

/**
 * Writes the given progress object to localStorage.
 * Returns true on success, false if the write failed.
 */
function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (err) {
    console.error("Failed to save progress to localStorage:", err);
    return false;
  }
}

/**
 * Records the result of a completed quiz session: updates total score,
 * quiz count, history log, and recalculates the streak based on
 * whether the user played today vs their last recorded play date.
 */
function recordQuizResult(score, total) {
  const progress = getProgress();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  progress.totalScore += score;
  progress.quizzesTaken += 1;
  progress.history.push({ date: today, score, total });

  progress.streak = calculateStreak(progress.lastPlayedDate, today, progress.streak);
  progress.lastPlayedDate = today;

  saveProgress(progress);
  return progress;
}

/**
 * Determines the updated streak count given the last played date and
 * today's date. Increments if the user played yesterday, resets to 1
 * if they missed a day, and stays the same if already played today.
 */
function calculateStreak(lastPlayedDate, today, currentStreak) {
  if (!lastPlayedDate) {
    return 1; // first time ever playing
  }
  if (lastPlayedDate === today) {
    return currentStreak; // already played today, no change
  }

  const last = new Date(lastPlayedDate);
  const now = new Date(today);
  const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return currentStreak + 1; // played yesterday, streak continues
  }
  return 1; // missed a day or more, streak resets
}

/**
 * Clears all stored progress. Useful for a "reset progress" feature
 * or for manual testing.
 */
function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error("Failed to clear progress from localStorage:", err);
    return false;
  }
}