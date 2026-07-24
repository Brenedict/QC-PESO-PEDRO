## Overview

This document consists of the steps and guidelines on how to contribute to this repository. For a guide in how to contribute/use storybook, refer to [>> STORYBOOK_GUIDE.md](/docs/STORYBOOK_GUIDE.md).

---

## How to Contribute to this repository?

### 1. Tasks and Issues Creation

- All issues must first be reviewed from **🟢 Backlog** to **🔵 Ready** before anyone can start working on them!
- Designated people must first review the backlogs for issues.
- Do not do tasks/issues that are within the **🟢 Backlog** column. You can only start working on tasks in the **🔵 Ready** column
- Who can create issues? Anyone (created issues must first go to **🟢 Backlog**)

---

### 2. Issue Assignment & Board Alignment:

- Don’t immediately start writing code! Pick a task to - work on from the **🟢 Ready**.
- Assign Yourself: You assign your GitHub username to the issue so two developers don't accidentally work on the same thing.
- After assigning yourself, move the task to **🟡 In Progress**. This allows you to notify the team that you have started working on that task

---

### 3. Branch Naming & Automation:

- How to begin coding on your task? First you must create your very own branch so that you don’t mess with the Main branch.
- Branch naming format...

```bash
# Format:
<type>/#<issue-number>-<short-description>

# Examples:
feat/#42-user-authentication
fix/#108-navbar-overlap
```

---

### 4. Writing Commits

- When you finish a task or a subtask, the usual git workflow is:

```bash
# Example:
git add <file/files>
git commit -m “<type>(optional scope): <description>”
```

---

### 5. Pushing Changes

- When you finish a task/issue, you push your branch to the repository.

```bash
# Example Branch Name:
feat/#42-user-authentication

# Example Push:
git push origin feat/#42-user-authentication
```

---

### 6. Pull Request Semantics & Linking

- Once you have pushed your branch, create a new pull request where: `base: development` and `compare: <your-branch>`.
- Follow PR Title Semantics: Just like commits, the PR title often mirrors proper convention.

```bash
# Syntax:
<type>(optional scope): <description>

# Example:
feat(auth): add Google OAuth login
```

- When creating a Pull Request (PR), you should be greeted with a template. Fill out the necessary details (remove details if you feel they don't fit).
- Make sure to include `Resolves #<linked issue>` so that when your PR is accepted, it automatically closes the issue.
