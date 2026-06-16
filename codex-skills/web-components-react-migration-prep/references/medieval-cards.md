# Medieval Cards Migration Reference

## Current Architecture

This project is a native Web Components app written in TypeScript. It is not Angular.

Entrypoint:

- `src/app/index.ts` imports global SCSS and creates `AppModule`.
- `src/app/app.module.ts` instantiates `ComponentModule`, `PageModule`, and `RouterModule`.
- `src/app/components/modules/component.module.ts` registers custom elements.
- `src/app/pages/modules/pages.module.ts` registers page custom elements.
- `src/app/router/router.manager.ts` writes page templates into `#content` and exposes navigation through `window.ROUTER`.

Build:

- `webpack.config.js` compiles TypeScript, imports HTML templates, imports component SCSS as strings, extracts global SCSS, and emits `dist`.
- `package.json` has Webpack tooling, TypeScript, `node-sass`, `sass-loader`, `html-loader`, and no React dependency yet.
- Baseline check: `npm run build` fails on Node `v20.19.5` because `node-sass@6.0.1` does not support runtime `115`.

## Custom Elements

Pages:

- `home-page`: main game flow, form, character creation, training, conversion, completion banner.
- `about-page`: static about/contact page.

UI elements:

- `wrs-header`: navigation buttons using `window.ROUTER`.
- `wrs-card`: character card, attack list, train/convert actions.
- `wrs-button`: styled button.
- `wrs-list`: attack list rendering.
- `wrs-input`: labeled text input.
- `wrs-select`: labeled select with JSON-encoded options.
- `wrs-banner-animation`: end-game banner and reset action.

## Reusable Code

Likely reusable with small import-path changes:

- Model classes in `src/app/models`.
- Interfaces in `src/app/interfaces`.
- Enums in `src/app/enums` and `src/app/shared/enums`.
- JSON attack data in `src/app/shared/localInfo`.
- Image assets in `assets/images`.
- Some global SCSS tokens, utilities, and mixins in `src/styles`.

## Rewrite Scope

Rewrite in React:

- All `HTMLElement` subclasses and `customElements.define` calls.
- Shadow DOM rendering via `innerHTML`.
- Imported HTML templates as component JSX.
- `BaseComponent` attribute parsing, unless a temporary compatibility layer is intentionally kept.
- Custom event wiring through `document.addEventListener`.
- Global `window.ROUTER` and manual route injection.
- Component SCSS string injection through `sass-to-string`.

## Behavior To Preserve

Home flow:

1. User enters character name and chooses type.
2. App validates required input/select fields.
3. App creates a level-one `Character`.
4. Train action advances through `Recruit`, `Soldier`, `Captain`, and `Boss`.
5. At level three, user can convert into `EvilWarrior`.
6. Completing the progression shows the banner.
7. Banner button restarts the home flow.

Navigation:

- Header can navigate between home and about.
- Reset currently calls `window.ROUTER.load("home")`.

## React Mapping

Recommended component mapping:

- `HomePage` -> `HomePage.tsx`.
- `AboutPage` -> `AboutPage.tsx`.
- `WrsHeader` -> `Header.tsx`.
- `WrsCard` -> `CharacterCard.tsx`.
- `WrsButton` -> `Button.tsx`.
- `WrsList` -> `AttackList.tsx`.
- `WrsInput` -> `TextField.tsx`.
- `WrsSelect` -> `SelectField.tsx`.
- `WrsBannerAnimation` -> `CompletionBanner.tsx`.

Recommended state mapping:

- `valuesForm` -> React form state.
- `levelUpEmmited` -> `levelStep` state.
- Custom train/convert/end-game events -> component callbacks.
- `window.ROUTER.load` -> router navigation or top-level view state.

## Preparation Risks

- Imported asset paths use absolute `/assets/...` imports in model files; verify the target bundler supports this or refactor to public asset paths.
- Component styles currently rely on Shadow DOM isolation; React styles may leak or be affected by global utility classes.
- Current event removal uses fresh `.bind(this)` calls, so cleanup is ineffective; treat current behavior as a baseline bug to avoid copying.
- `node-sass` is legacy and currently blocks builds on Node `v20.19.5`; prefer Dart Sass in a React/Vite target.
- No automated tests are present; manual behavior checks or new tests are needed before and after migration.

## Suggested Prep Deliverables

- Current-app inventory.
- Component mapping table.
- Event/state transition table.
- Style migration decision.
- Build tooling decision.
- Asset import decision.
- Risk register.
- Manual QA checklist.
- Phased estimate.
