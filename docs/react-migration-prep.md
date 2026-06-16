# React Migration Prep

This document prepares the native Web Components app for a React migration. It is a planning artifact, not the migration implementation.

## Current State

- App type: native Web Components with TypeScript.
- Entry: `src/app/index.ts`.
- Runtime composition: `AppModule` creates component, page, and router modules.
- Routing: custom router injects page templates into `#content` and exposes `window.ROUTER`.
- Build: Webpack with TypeScript, HTML imports, SCSS imports, and static image assets.
- Baseline build status: `npm run build` currently fails on Node `v20.19.5` because `node-sass@6.0.1` does not support runtime `115`.
- Tests: no automated test suite currently exists.

## Inventory

Pages:

- `home-page`: game flow and character progression.
- `about-page`: static about/contact page.

Custom elements:

- `wrs-header`
- `wrs-card`
- `wrs-button`
- `wrs-list`
- `wrs-input`
- `wrs-select`
- `wrs-banner-animation`

Reusable areas:

- Character and attack models.
- Interfaces/enums.
- JSON attack data.
- Image assets.
- Global SCSS tokens/utilities where still useful.

Rewrite areas:

- `HTMLElement` subclasses.
- Shadow DOM rendering.
- Manual DOM mutation and `innerHTML` templates.
- Custom document events.
- `window.ROUTER`.
- Component SCSS string injection.

## React Target

Recommended target:

- React latest stable at migration time.
- TypeScript.
- Vite.
- Sass via Dart Sass.
- React Router only if more route growth is expected; otherwise simple top-level view state is enough for the current two-page app.

Verify the exact latest React version when migration starts. Do not pin this document's date-sensitive estimate as the dependency source of truth.

## Component Mapping

| Current Web Component | React Component |
| --- | --- |
| `home-page` | `HomePage` |
| `about-page` | `AboutPage` |
| `wrs-header` | `Header` |
| `wrs-card` | `CharacterCard` |
| `wrs-button` | `Button` |
| `wrs-list` | `AttackList` |
| `wrs-input` | `TextField` |
| `wrs-select` | `SelectField` |
| `wrs-banner-animation` | `CompletionBanner` |

## State And Events

Replace current DOM/custom-event flow with React state and callbacks.

| Current behavior | React replacement |
| --- | --- |
| `valuesForm` property | `useState` form data |
| `levelUpEmmited` property | `useState` level step |
| `js-first-button` document event | `onTrain` callback |
| `js-second-button` document event | `onConvert` callback |
| `end-game-event` document event | derived completion state or `onComplete` callback |
| `button-banner` document event | `onReset` callback |
| `window.ROUTER.load(...)` | router navigation or top-level view state |

## Behavior Checklist

- Initial home page shows intro text, name field, type select, create button, and inactive completion banner.
- Empty name and unselected type show required-field errors.
- Creating a character hides the form and renders a card.
- Training advances the same named/type character through the expected levels.
- Convert action appears at the same level as today and renders the evil warrior.
- Completing the progression shows the completion banner.
- Reset returns to the starting home flow.
- Header navigation switches between home and about.
- About page content and email link remain available.

## Styling Plan

- Keep `src/styles` tokens/utilities initially.
- Convert Shadow DOM component styles into imported SCSS per React component.
- Watch for style leakage because Shadow DOM isolation will be removed.
- Replace `node-sass` with Dart Sass. This is required even before React if the app must build on the current Node runtime.
- Remove `sass-to-string` once no Web Component styles are injected as strings.

## Migration Phases

1. Baseline and QA notes: run/build the current app, capture current behavior, and list existing defects.
2. React scaffold: add React/Vite/TypeScript/Sass tooling without deleting reusable models/data/assets.
3. Static layout parity: implement routes/pages/components with hardcoded data where helpful.
4. Game state migration: implement form validation, character creation, training, conversion, completion, and reset.
5. Style parity: port component styles and verify responsive behavior.
6. Cleanup: remove obsolete Web Component registration, router, loaders, and dependencies.
7. Validation: build, run, and execute the manual behavior checklist.

## Estimate

- Preparation only: 3-5 hours.
- MVP React migration after prep: 12-16 hours.
- Clean production migration: 18-28 hours.
- Polished migration with tests and visual QA: 30-40 hours.

The estimate assumes the existing game behavior is preserved rather than redesigned.

## Main Risks

- Shadow DOM style isolation loss can create visual regressions.
- Current asset imports may need Vite-specific path changes.
- Current Webpack build fails because of `node-sass@6.0.1` on Node `v20.19.5`.
- Current cleanup of bound event handlers is flawed; avoid copying that pattern.
- No automated tests means manual QA must be explicit.
- The app text includes existing typos; decide separately whether the migration should preserve or fix copy.
