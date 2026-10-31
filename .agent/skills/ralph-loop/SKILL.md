---
name: ralph-loop
description: "Long-running AI agent loop implementation based on the Ralph Wiggum technique. Automates software development tasks iteratively via PRD and task lists, resetting context each iteration while preserving git history, steering, and progress logs."
category: autonomous-agents
risk: safe
source: official
source_repo: pageai-pro/ralph-loop
date_added: "2026-10-31"
author: PageAI (Dan Mindru)
license: MIT
license_source: "https://github.com/pageai-pro/ralph-loop/blob/main/LICENSE"
tags:
  - ralph-loop
  - autonomous-agents
  - iterative-development
  - spec-driven
  - prd
tools:
  - claude-code
  - antigravity
  - cursor
  - gemini-cli
  - codex-cli
---

# Ralph Loop (Ralph Wiggum Autonomous Agent Loop)

Ralph is a long-running AI agent loop designed to overcome context window degradation, memory saturation, and agent drift. Instead of keeping a single massive conversation context open, Ralph executes development tasks in a tight, iterative feedback loop: **one task per invocation**, committing verified progress to Git, logging telemetry, and terminating cleanly before restarting with a fresh context.

_Source: [pageai-pro/ralph-loop](https://github.com/pageai-pro/ralph-loop) (MIT)._

## When to Use This Skill

- When planning or executing a multi-step project overnight or across extended sessions without context rot.
- When transforming a raw requirement into a structured PRD with a granular, verifiable task list (`tasks.json`).
- When setting up iterative self-healing loops with clear stop conditions, promise tags, and human-in-the-loop steering.
- When configuring isolated test sandboxes (Playwright smoke tests, Vitest unit tests, ESLint/Prettier compliance).

## Core Principles

1. **One Task Per Invocation**: Complete exactly one task from `.agent/tasks.json`, run verification tests, commit, emit `<promise>TASK-{ID}:DONE</promise>`, and stop immediately.
2. **Fresh Context, Persistent Disk**: The agent restarts every iteration with zero context bloat, reading progress directly from `.agent/logs/LOG.md` and repository commits.
3. **Mid-Flight Steering**: You can add notes or directional changes to `.agent/STEERING.md` while the loop runs; the agent checks steering before picking up the next task.
4. **Verifiable Pass Criteria**: Each task in `.agent/tasks/TASK-{ID}.json` defines explicit input/output assertions, automated test commands, and UI screenshot captures.

## Directory Layout

```
.agent/
├── prd/
│   ├── PRD.md              # High-level product requirement specification
│   └── SUMMARY.md          # Architectural and stack overview
├── tasks.json              # Task lookup list: [{ id: 1, title: '...', passes: false }]
├── tasks/
│   └── TASK-1.json         # Granular implementation spec and test criteria
├── logs/
│   └── LOG.md              # Chronological progress log (newest at the top)
├── STEERING.md             # High-priority mid-flight guidance and overrides
└── screenshots/            # Playwright UI verification screenshots
```

## Promise Protocol & Stop Tags

The loop monitors stdout for structured `<promise>` tags to evaluate state transitions:

- `<promise>TASK-{ID}:DONE</promise>` — Task successfully built, tested, and committed. Triggers next iteration.
- `<promise>COMPLETE</promise>` — All tasks in `tasks.json` have `passes: true`. Terminates loop successfully.
- `<promise>BLOCKED:description</promise>` — Environment failure (network firewall, missing credentials) requiring human fix.
- `<promise>DECIDE:question (Option A vs B)</promise>` — Ambiguous requirement or design fork requiring human decision.

## Quick CLI Execution

Initialize or run via npm/npx:
```bash
npx @pageai/ralph-loop
```
Or execute directly inside a bash environment:
```bash
./ralph.sh --max-iterations 25
```
