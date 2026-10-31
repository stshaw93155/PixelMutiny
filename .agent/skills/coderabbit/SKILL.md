---
name: coderabbit
description: "AI-powered code review, pull request analysis, and pre-merge check configurations based on CodeRabbit. Includes enterprise YAML blueprints, tone instructions, security reviews, and custom path-based review rules."
category: code-review
risk: safe
source: official
source_repo: coderabbitai/awesome-coderabbit
date_added: "2026-10-31"
author: CodeRabbit AI
license: Apache-2.0
license_source: "https://github.com/coderabbitai/awesome-coderabbit/blob/main/LICENSE"
tags:
  - coderabbit
  - code-review
  - pull-requests
  - linting
  - security-audit
  - pre-merge-checks
tools:
  - claude-code
  - antigravity
  - cursor
  - gemini-cli
  - codex-cli
---

# CodeRabbit (AI-Powered Code Review & PR Automation)

CodeRabbit is the leading AI-powered code review system designed to detect subtle bugs, enforce engineering guidelines, verify security invariants, and accelerate PR review cycles.

_Source: [coderabbitai/awesome-coderabbit](https://github.com/coderabbitai/awesome-coderabbit) (Apache-2.0)._

## When to Use This Skill

- When configuring `.coderabbit.yaml` for a repository, mono-repo, or CI/CD pipeline.
- When setting up pre-merge check packs: data privacy, security, high-performance, fintech compliance, or PR hygiene.
- When defining customized path-based review instructions (e.g., frontend React/Next.js rules, backend database queries, test suite assertions).
- When tuning review tone (`chill`, `assertive`, `concise`, or domain-specialized).
- When auditing incoming pull requests or diffs against production standards.

## Pre-Merge Check Catalog (`configs/pre-mergechecks/`)

The skill includes copyable policy templates for common engineering risk vectors:

1. **`.coderabbit-security.yaml`**: Secret scanning, injection defense (SQLi, XSS), authentication boundaries, and permission validation.
2. **`.coderabbit-performance.yaml`**: Detection of N+1 database queries, unmemoized expensive computations, blocking operations in async handlers, and layout thrashing.
3. **`.coderabbit-data-privacy.yaml`**: PII handling, telemetry consent, and GDPR/CCPA storage compliance.
4. **`.coderabbit-testing.yaml`**: Assertion density, coverage gaps, avoiding sleep/wait antipatterns in Playwright/Cypress/Vitest.
5. **`.coderabbit-pr-hygiene.yaml`**: Conventional commit standards, branch naming, breaking change documentation, and small review-unit enforcement.

## Standard `.coderabbit.yaml` Blueprint

```yaml
# yaml-language-server: $schema=https://coderabbit.ai/integrations/schema.v2.json
language: "en-US"
early_access: false
tone_instructions: >
  You are an expert senior code reviewer. You work in an enterprise software
  engineering team, providing concise, actionable, and clear advice. You prioritize
  correctness, security, and performance over cosmetic style.

reviews:
  profile: "chill"
  request_changes_workflow: false
  high_level_summary: true
  poem: false
  review_status: true
  collapse_walkthrough: false
  auto_review:
    enabled: true
    drafts: false
    base_branches: ["main", "master", "release/*"]
  path_instructions:
    - path: "app/**/*.{js,jsx,ts,tsx}"
      instructions: |
        - Verify Next.js App Router conventions and React Server Component boundaries
        - Prevent unnecessary client-side bundle bloat
        - Ensure responsive layout, accessible semantic HTML, and correct hydration safety
    - path: "tests/**/*.{test,spec}.*"
      instructions: |
        - Ensure AAA (Arrange-Act-Assert) pattern is followed
        - Avoid brittle sleep/wait calls; rely on condition-based polling or event awaits

chat:
  auto_reply: true
```

## Directory Assets

- `schema.v2.json` — Complete JSON Schema validation for all `.coderabbit.yaml` properties.
- `configs/` — Language-specific starter templates for TypeScript, React, Node.js, Python, Go, Rust, and multi-language repositories.
