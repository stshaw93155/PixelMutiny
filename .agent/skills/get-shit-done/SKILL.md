---
name: get-shit-done
description: "A meta-prompting, context engineering, and spec-driven development (SDD) system for AI coding assistants. Eliminates context rot through phase-based workflows, sub-agent dispatch, planning documents, verification gates, and milestone tracking."
category: autonomous-agents
risk: safe
source: official
source_repo: gsd-build/get-shit-done
date_added: "2026-10-31"
author: TÂCHES
license: MIT
license_source: "https://github.com/gsd-build/get-shit-done/blob/main/LICENSE"
tags:
  - gsd
  - get-shit-done
  - spec-driven-development
  - context-engineering
  - planning
  - task-orchestration
tools:
  - claude-code
  - antigravity
  - cursor
  - gemini-cli
  - codex-cli
---

# Get Shit Done (GSD) — Spec-Driven Development & Context Engineering

Get Shit Done (GSD) is a comprehensive meta-prompting, context engineering, and spec-driven development (SDD) system built specifically to eliminate **context rot** (the degradation in code quality and hallucinations that occur when LLM context windows exceed 50%).

_Source: [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) (MIT)._

## When to Use This Skill

- When starting a brand-new project or significant feature that requires rigorous architecture, requirements analysis, and milestone planning.
- When organizing complex, multi-phase engineering tasks into atomic, verifiable phases (`.planning/phases/`).
- When executing development via specialized sub-agent roles (Planner, Researcher, Executor, Verifier, Debugger, Code Reviewer).
- When context degradation begins to affect reasoning and you need to reset context while persisting project state.

## Core SDD Workflow

GSD enforces a strict 4-stage development lifecycle:

1. **New Project / Milestone Discovery**:
   - Analyzes requirements, tech stack constraints, user journeys, and failure modes.
   - Generates `.planning/PROJECT.md`, `.planning/ROADMAP.md`, and `.planning/REQUIREMENTS.md`.

2. **Phase Planning (`/gsd-plan-phase`)**:
   - Breaks down a milestone into numbered, focused phases (e.g. `01-core-architecture`, `02-api-integration`).
   - Produces atomic tasks with measurable completion criteria.

3. **Phase Execution (`/gsd-execute-phase`)**:
   - Dispatches tasks to fresh, isolated sub-agent contexts.
   - Executes code modifications, unit tests, and smoke tests step-by-step.

4. **Phase Verification (`/gsd-verify-work`)**:
   - Inspects test results, git diffs, linting, and acceptance criteria.
   - Marks requirements complete in `.planning/REQUIREMENTS.md` and updates `.planning/STATE.md`.

## Installed Sub-Agent Personas & Skills

The local ecosystem includes the full library of GSD specialized skills and agents:
- `gsd-planner` — Breaks down complex goals into phased implementation blueprints.
- `gsd-executor` — Executes implementation plans step-by-step with TDD rigor.
- `gsd-verifier` — Validates acceptance criteria, test assertions, and regression safety.
- `gsd-debugger` — Diagnoses stack traces, error boundaries, and race conditions.
- `gsd-code-reviewer` — Analyzes security, performance, and code quality before merging.
- `gsd-roadmapper` & `gsd-milestone` — Maintains long-term roadmaps and milestone archives.

## Slash Commands Reference

- `/gsd-new-project` — Initialize a new project with structured planning files.
- `/gsd-plan-phase` — Create an actionable execution plan for the active phase.
- `/gsd-execute-phase` — Run implementation tasks sequentially with isolated contexts.
- `/gsd-verify-work` — Verify phase outputs against requirements.
- `/gsd-progress` — Check active phase completion status and next actions.
