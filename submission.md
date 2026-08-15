# Project Submission Report

## 1. Student Details

- **Full Name:** Kimokoti Esther Nelima
- **GitHub Username:** Nelima-Esther
- **Email:** esther.kimokoti@strathmore.edu

---

## 2. Deployed Project Link

- **Live GitHub Pages URL:** https://is-project-2026.github.io/swahili-proverbs-169257/
  
---

## 3. Reflection — Grounded in Your Git History

> **Rules:** Every answer below **must include a direct link** to the specific commit, PR, issue, or branch in your repository that demonstrates what you are describing. Answers without working links will not be graded. Generic explanations that could apply to any project will receive zero marks.
>
> **Marks:** A (2 marks) · B (1 mark) · C (1 mark) · D (1 mark) = **5 marks total**

### A. Your Best Commit

Paste the URL of the commit in your history that you think best demonstrates clean conventional commit practice (good type tag, clear subject, meaningful body or footer).

- **Commit URL:** https://github.com/IS-PROJECT-2026/swahili-proverbs-169257/commit/7c2d297931cc19e00c774b0a213aaf6a49d94f50
- **Why this one?** It uses a clear `feat` type with scope, a subject line under 50 characters and a body that explains the structural "why" wiring quiz results into the localStorage utilities already built in an earlier issue rather than just restating what changed. The footer references the issue it closes.

### B. A Mistake or Struggle

Link to a commit, PR, or issue where something went wrong a bad commit message you had to fix, a branch you had to delete and recreate, a PR that needed rework, or a deployment that broke.

- **Link to the evidence:** https://github.com/IS-PROJECT-2026/swahili-proverbs-169257/pull/23
- **What happened and how did you recover?** This branch (`feat/5-quiz-component`) developed a merge conflict with `main` after related functionality had already landed there through a different pull request during an earlier conflict resolution. Instead of forcing a merge that would have duplicated or corrupted existing work, I verified that `main` already contained equivalent changes, then closed this PR without merging and updated the linked issues with comments explaining the actual merge path that had occurred.

### C. A Pull Request You're Proud Of

Paste the URL of the PR that best shows your self-review process — one where the description is clear, the issue linkage is correct and the diff tells a coherent story.

- **PR URL:** https://github.com/IS-PROJECT-2026/swahili-proverbs-169257/pull/27
- **What did you check before merging?** I reviewed the Files Changed diff to confirm the Stats view was correctly reading from persisted localStorage data rather than session-only variables and manually tested in the browser (via DevTools Application tab) that accuracy, quizzes taken, streak and recent history all displayed correctly and survived a page reload before merging.

### D. One Thing You Would Do Differently

If you had to restart this project from scratch with everything you know now, name one specific workflow decision you would change (not a code change — a Git/project management decision).

- **What would you change?** I would always create the actual GitHub issue first and confirm its real, assigned number before naming a branch or writing a commit message that references it. I initially assumed the next available issue number without checking, which caused a branch and commit to reference a number that had never actually been created.
- **Link to the evidence of the original decision:** https://github.com/IS-PROJECT-2026/swahili-proverbs-169257/issues/22

---

## 4. Screenshots of Key GitHub Features

Demonstrate your workflow mechanics by embedding your screenshots below.

> **CRITICAL FOR WORKING IMAGES:** Do not type manual folder paths. Edit this file directly on the GitHub web interface, click on the blank line below each prompt and **paste (Ctrl+V / Cmd+V)** your screenshot. GitHub will automatically upload the file and generate a permanent, working image link for you.

### A. Milestones and Issues
*Provide a screenshot showing your active milestone(s) and the granular tracking issues linked directly to them.*

<img width="731" height="266" alt="image" src="https://github.com/user-attachments/assets/6b56bf94-e5b2-45ab-8cc7-339d6084ac44" />


* **Caption:** Four milestones covering data/core logic, quiz functionality, browse/discovery features and polish/deployment, each with granular issues linked before development began.

### B. Project Board
*Provide a screenshot of your GitHub Project Board with your issues organized dynamically across columns (To Do, In Progress, Done).*

<img width="1566" height="784" alt="Screenshot 2026-08-15 074146" src="https://github.com/user-attachments/assets/67d0bdf3-0878-4b34-a367-b60325d8956b" />


* **Caption:** Kanban board showing issues distributed across To Do, In Progress and Done as work progressed across multiple sessions.

### C. Branching Architecture
*Provide a screenshot showing your local or remote Git branch list, highlighting your use of conventional, issue-linked naming patterns (e.g., `feat/`, `fix/`, `style/`).*

<img width="913" height="442" alt="image" src="https://github.com/user-attachments/assets/c45c5e3b-ef3e-42f0-83ae-bd1e1492d69c" />


* **Caption:** Local branch list showing issue-linked naming conventions (feat/, fix/, style/, docs/) tied to specific issue numbers.

### D. Pull Requests & Traceability
*Provide a screenshot of a completed or open Pull Request (PR) on GitHub that clearly shows it is linked to a related development issue.*

<img width="704" height="395" alt="image" src="https://github.com/user-attachments/assets/d5d7380e-db9c-44c0-bb23-11611cea0cfc" />


* **Caption:** A merged pull request showing "Closes #12" in the description, linking it directly to its source issue.

---

## 5. Merge Conflict Evidence

You must engineer **three merge conflicts**, each triggered by a **different cause** from those covered in the lecture. For Conflict 1, document the full resolution lifecycle. For Conflicts 2 and 3, provide the conflict marker screenshot and identify the cause.

> **Marks:** Conflict 1 full chronology (2 marks) · Conflict 2 (1 mark) · Conflict 3 (1 mark) · All three use distinct causes (1 mark) = **5 marks total**

---

### Conflict 1 — Full Chronology

**What cause did you use?** Content conflict - two branches (branch-A and branch-B) independently modified the same line of the same file (`app.js`'s header comment).

#### Step 1: Generating the Clash
*Screenshot showing the merge attempt and the conflict warning.*

<img width="247" height="281" alt="image" src="https://github.com/user-attachments/assets/87f425f2-a9d1-4391-b766-8f38c60fec3c" />

* **Caption:** Attempting to merge branch-B into branch-A after both branches edited the same comment line differently, producing a CONFLICT (content) message in the terminal.

#### Step 2: Inside the Code Editor (Conflict Markers)
*Screenshot showing the raw, unresolved conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) in your editor.*

<img width="568" height="733" alt="conflict_evidence" src="https://github.com/user-attachments/assets/d0e5a333-785b-4164-94a6-f08a45530071" />

* **Caption:** Raw conflict markers in app.js showing branch-A's and branch-B's differing header comments. Resolved by combining both descriptions into a single coherent comment covering the app's full feature set.

#### Step 3: Resolution & Clean Merge
*Screenshot of your clean Git history or completed PR showing the conflict was resolved and merged.*

<img width="455" height="380" alt="image" src="https://github.com/user-attachments/assets/6e8f51c1-9794-404c-9716-beb4c6718f21" />

* **Caption:** Final resolved app.js with no conflict markers remaining, committed and merged into main via pull request.

---

### Conflict 2 — Different Cause

**What cause did you use?** Modify/delete conflict.

**Why does this cause trigger a conflict?** One branch (branch-C) modified SCHEMA.md by adding a version note, while another branch (branch-D) deleted SCHEMA.md entirely. Git cannot automatically determine whether the file should exist in the merged result, since one side says it should still exist (with changes) and the other says it should be gone.

<img width="493" height="709" alt="conflict_evidence_2" src="https://github.com/user-attachments/assets/bedce6f5-2a1e-4769-9656-713811505764" />

* **Caption:** Terminal output showing "deleted by them: SCHEMA.md" after merging branch-D into branch-C. Resolved by keeping the file with branch-C's update, since the schema documentation was still needed.

---

### Conflict 3 — Different Cause

**What cause did you use?** Add/add conflict.

**Why does this cause trigger a conflict?** Two branches (branch-E and branch-F), both created independently from main, each added a new file with the identical name (CONTRIBUTING.md) but different content. Git cannot determine which version was intended, since neither branch has history of the other's version to merge against.

<img width="543" height="945" alt="evidenceconflict_evidence_3" src="https://github.com/user-attachments/assets/d9022e1f-eca1-4081-bff1-2d2e83136a6f" />

* **Caption:** Conflict markers in CONTRIBUTING.md showing branch-E's and branch-F's differing content. Resolved by merging both sets of contribution guidance into a single coherent document.
