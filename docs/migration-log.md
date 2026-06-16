# Migration Log

## React Migration

- Replaced Web Components runtime with React, React Router, Vite, and TypeScript.
- Added `react-hook-form`, Zod, and `@hookform/resolvers` for typed character form validation.
- Preserved the current game flow, route names, assets, and Spanish UI copy.
- Replaced Webpack and `node-sass` with Vite and Dart Sass.
- Added Vitest and Playwright coverage for validation, routing, training, conversion, and reset flows.

## Known Baseline Issues

- The legacy Webpack build failed on Node `v20.19.5` because `node-sass@6.0.1` did not support the runtime.
- Existing copy typos were preserved unless they blocked migration parity.

## Validation

- Passed: `npm run build`.
- Passed: `npm run test`.
- Passed: `npm run test:e2e`.
- Passed: `npm run preview` smoke check for `/` and direct `/about`.

## Follow-Up Notes

- Dart Sass reports deprecation warnings from the legacy SCSS `@import`, slash division, and `unitless()` usage. These do not block the migrated build, but should be cleaned up in a dedicated Sass modernization pass.
