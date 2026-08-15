# Swahili Proverbs

A dark, editorial-styled web app for exploring Swahili proverbs, browse the collection, test your knowledge with a matching quiz and track your learning progress over time.

**Live site:** https://is-project-2026.github.io/swahili-proverbs-169257/

## Features

- **Proverb of the Day** - a featured proverb that's the same for every visitor on a given day, selected deterministically by date.
- **Quiz** - match a Swahili proverb to its correct English meaning from four options, with instant feedback and a scored results screen.
- **Browse** - search the full collection by text or meaning and filter by category (patience, wisdom, unity, and more).
- **Stats** - overall accuracy, quizzes taken, current streak and a history of your five most recent quiz sessions, all persisted locally
in the browser via `localStorage`.

## Technologies Used

- HTML, CSS, vanilla JavaScript (ES6+)
- Browser `localStorage` for persisting quiz progress
- Static hosting via GitHub Pages, deployed from `main`

## Project Structure
├─ index.html # Page structure and view containers
├─ style.css # Dark editorial theme, layout, responsive rules
├─ app.js # Navigation, quiz, browse, filtering, stats logic
├─ utils.js # localStorage read/write utilities
├─ proverbs.json # The proverb dataset (30 entries)
├─ SCHEMA.md # Documents the proverb data structure
├─ CONTRIBUTING.md # Branch naming and commit conventions
├─ evidence/ # Merge conflict resolution evidence
└─ submission.md # Written assessment answers

## Development Workflow

This project was built using a full GitHub Agile workflow - milestones, issues linked to milestones, a Kanban project board, feature-branch
isolation with `main` protected behind required pull requests and Conventional Commits (`feat`, `fix`, `docs`, `style`, `chore`) throughout
the commit history.

## Running Locally

Since this is a static site with no build step, clone the repo and serve it with any local static server, for example:

```bash
git clone https://github.com/IS-PROJECT-2026/swahili-proverbs-169257.git
cd swahili-proverbs-169257
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## Author

Zhen — ICS 4E, Strathmore University