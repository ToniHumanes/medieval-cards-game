---
name: web-components-react-migration-prep
description: Prepare a native Web Components TypeScript app for migration to the latest React. Use when Codex needs to audit custom elements, Shadow DOM styles, manual routing, DOM events, model/data reuse, build tooling, migration risks, estimates, and phased readiness work before writing React code.
---

# Web Components React Migration Prep

## Overview

Use this skill before starting a React migration. The goal is to produce a factual readiness package: current behavior, reusable code, rewrite scope, risk list, phased migration plan, and validation checklist.

For this repository, read `references/medieval-cards.md` after this file. It records the current native Web Components architecture and known migration boundaries.

## Workflow

1. Confirm the app type.
   - Treat the source as native Web Components unless the dependency graph proves otherwise.
   - Do not call it Angular because files use `*.module.ts`; this repo's modules manually register custom elements and routes.

2. Establish the baseline.
   - Inspect `package.json`, build config, entrypoint, router, pages, custom elements, styles, models, JSON data, and assets.
   - Run available local build/test commands if dependencies are installed.
   - If dependencies are missing and installation requires network, request approval before installing.
   - Record any current build/runtime failures as migration inputs, not React migration regressions.

3. Inventory the migration surface.
   - List pages, custom elements, custom events, global objects, Shadow DOM usage, direct DOM manipulation, imported templates, imported SCSS strings, model classes, data files, and image assets.
   - Identify code that can be reused unchanged versus code that should be rewritten in React.
   - Map each custom element to a future React component.

4. Define the React target.
   - Verify the latest stable React version at migration time from npm or official React docs.
   - Prefer a modern TypeScript React setup with Vite unless the project constraints require another bundler.
   - Decide whether routing needs `react-router` or simple in-app state. For this app, either can work; choose the smaller option unless future pages are expected.

5. Plan style migration before component migration.
   - Shadow DOM component SCSS will not carry over automatically.
   - Decide whether to keep SCSS modules, flatten into component SCSS with BEM classes, or move shared tokens/utilities into global SCSS.
   - Preserve global `src/styles/styles.scss` tokens/utilities when they are still useful.

6. Convert events into state flows on paper first.
   - Replace `document.addEventListener`, bubbling custom events, and `window.ROUTER` with React props, callbacks, state, and route/navigation helpers.
   - Document the expected state transitions for create character, train, convert, finish game, and reset.

7. Produce preparation artifacts.
   - Create or update a repo doc with: inventory, component mapping, reusable code list, rewrite list, risks, decisions, phased migration plan, validation checklist, and hour estimate.
   - Do not start React implementation in the prep step unless the user explicitly asks.

## Best Practices

- Incremental Migration: Do not migrate everything at once. Define small phases with a buildable, reviewable state after each phase.
- Test Thoroughly: Validate behavior at each step with automated tests where practical and explicit manual QA where tests do not exist yet.
- Use Codemods: Use codemods or scripted transforms for repetitive, mechanical changes after proving the pattern manually on a small sample.
- Start Simple: Begin with leaf components that have minimal dependencies, then move upward into pages and app-level state.
- Leverage StrictMode: Enable React `StrictMode` early to expose lifecycle, side-effect, and compatibility issues during development.
- Monitor Performance: Measure relevant behavior before and after migration so performance changes are visible instead of assumed.
- Document Changes: Keep a migration log with decisions, changed behavior, known issues, and validation results.

## Output Checklist

Before claiming migration prep is complete, ensure the repo has a documented answer for:

- Current architecture and baseline status.
- Component/page mapping from Web Components to React.
- State and event mapping.
- Styling strategy.
- Build tool strategy.
- Data/assets reuse strategy.
- Risk list and unknowns.
- Validation plan.
- Phased implementation order.
- Updated effort estimate.
