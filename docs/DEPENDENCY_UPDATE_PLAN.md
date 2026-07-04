# Dependency Update Plan

Plan for bringing **all** dependencies to their latest versions. Work in small PRs on **Node 22** (see `.nvmrc`). **Node 24 is last** — after everything else is green.

---

## Completed (baseline)

These migrations are already on `main`:

| Area | Was | Now |
|------|-----|-----|
| Data fetching | `react-query` v3 | `@tanstack/react-query` v5 |
| API mocking | MSW 1 (`rest`) | MSW 2 (`http`) |
| Routing | React Router 6 | React Router 7 |
| Lint / format | ESLint 8 + `.eslintrc.cjs`, Prettier 2 | ESLint 9 flat config, Prettier 3 |
| Build / test (first pass) | Vite 4, Vitest 0.33, jsdom 22 | Vite 6, Vitest 3, jsdom 26 |
| Node | — | 22 via `.nvmrc`; CI reads it |

**Pinned workaround:** `package.json` `overrides` forces a single `react-router@7` for `@ahooksjs/use-url-state` (peer dep still lists `react-router ^6`).

---

## Current vs latest (March 2026)

Locked versions from `npm outdated` / `npm view`. Packages not listed are already at latest within their semver range (or latest overall).

### Runtime

| Package | Installed | Latest | Gap |
|---------|-----------|--------|-----|
| `react` / `react-dom` | 18.3.1 | 19.2.7 | Major |
| `@mui/material` | 5.18.0 | 9.2.0 | Major (×4) |
| `@mui/icons-material` | 5.18.0 | 9.2.0 | Major (×4) |
| `@types/react` | 18.3.31 | 19.2.17 | Major |
| `@types/react-dom` | 18.3.7 | 19.2.3 | Major |
| `@tanstack/react-query` | 5.101.2 | 5.101.2 | ✓ |
| `react-router-dom` | 7.18.1 | 7.18.1 | ✓ |
| `@ahooksjs/use-url-state` | 3.5.1 | 3.5.1 | ✓ (peer dep stale) |
| `axios` | ^1.4.0 → 1.x | 1.18.1 | In-range |
| `@emotion/react` | ^11.11.1 → 11.14 | 11.14.0 | In-range |
| `@emotion/styled` | ^11.11.0 → 11.14 | 11.14.1 | In-range |
| `@fontsource/roboto` | ^5.0.3 → 5.2 | 5.2.10 | In-range |
| `prop-types` | 15.8.1 | 15.8.1 | ✓ |

### Toolchain & test

| Package | Installed | Latest | Gap |
|---------|-----------|--------|-----|
| `vite` | 6.4.3 | 8.1.3 | Major (×2) |
| `vitest` | 3.2.6 | 4.1.9 | Major |
| `@vitejs/plugin-react` | 4.7.0 | 6.0.3 | Major (×2) |
| `jsdom` | 26.1.0 | 29.1.1 | Major |
| `msw` | 2.14.6 | latest 2.x | In-range |
| `cypress` | 12.17.4 | 15.18.0 | Major (×3) |
| `@testing-library/react` | 14.3.1 | 16.3.2 | Major (×2) |
| `@testing-library/jest-dom` | 5.17.0 | 6.9.1 | Major |
| `@testing-library/cypress` | 9.0.0 | 10.1.3 | Major |
| `@testing-library/user-event` | ^14.4.3 → 14.6 | 14.6.1 | In-range |
| `@vitest/eslint-plugin` | 1.6.21 | 1.6.21 | ✓ |

### Lint & deploy

| Package | Installed | Latest | Gap |
|---------|-----------|--------|-----|
| `eslint` | 9.39.4 | 10.6.0 | Major |
| `@eslint/js` | 9.39.4 | 10.0.1 | Major |
| `eslint-config-prettier` | 10.1.8 | 10.1.8 | ✓ |
| `eslint-plugin-cypress` | 6.4.2 | 6.4.2 | ✓ |
| `eslint-plugin-prettier` | 5.5.6 | 5.5.6 | ✓ |
| `eslint-plugin-react` | 7.37.5 | 7.37.5 | ✓ |
| `eslint-plugin-react-hooks` | 7.1.1 | 7.1.1 | ✓ |
| `eslint-plugin-react-refresh` | 0.5.3 | 0.5.3 | ✓ |
| `prettier` | 3.9.4 | latest 3.x | ✓ |
| `globals` | 17.7.0 | latest | In-range |
| `gh-pages` | 5.0.0 | 6.3.0 | Major |

### Node

| | Current | Target |
|---|---------|--------|
| `.nvmrc` | 22 | **24 (last PR)** |

---

## Approach

- **One major migration per PR** where possible.
- **Node 22** until the final PR.
- **Test gate on every PR:**

```bash
nvm use
npm clean-install   # or npm install after lockfile change
npm run lint
npm test
npm run test:cypress
npm run build
```

- **Do not** use `npm audit fix --force` (uncontrolled major jumps).
- Re-run `npm outdated` after each PR; in-range packages can ride along with `npm update`.

---

## Recommended PR order

```
PR A  In-range lockfile refresh
  → PR B  Vite 8 + Vitest 4 + jsdom 29
  → PR C  Cypress 15 (+ Testing Library Cypress 10)
  → PR D  ESLint 10
  → PR E  Testing Library (jest-dom 6, React 16)
  → PR F  React 19
  → PR G  MUI 9
  → PR H  gh-pages 6 (+ optional CI action bumps)
  → PR I  Node 24
```

PRs B–G can be reordered slightly (e.g. ESLint 10 before or after Cypress), but **keep MUI and React as separate PRs** and **Node 24 always last**.

---

## PR A — In-range lockfile refresh

**Goal:** Pull latest patches/minors within existing semver ranges. No API migrations.

```bash
nvm use
npm update
npm run lint && npm test && npm run test:cypress && npm run build
```

**Expected bumps:** `axios`, `@emotion/*`, `@fontsource/roboto`, `@testing-library/user-event`, transitive lockfile entries.

**Effort:** ~15 min

---

## PR B — Vite 8 + Vitest 4 + jsdom 29

**Target:** `vite` ^8, `vitest` ^4, `@vitejs/plugin-react` ^6, `jsdom` ^29.

**Files likely touched:**

- `package.json`
- `vite.config.js` (Vitest 4 config API, Vite 8 breaking changes — check [Vite migration guides](https://vite.dev/guide/migration))
- Possibly `src/setupFiles.js`

**Checklist:**

- [ ] `npm run dev` / `npm run build`
- [ ] Unit tests pass on Node 22
- [ ] `base: "/basketcase-react/"` still correct (asset URLs, Cypress `baseUrl`)
- [ ] No new jsdom / `AbortSignal` noise (note for PR I)

**Why early:** Modern Vitest/jsdom may fix the Node 24 unit-test issue; worth validating in PR I.

**Effort:** 2–4 hrs

---

## PR C — Cypress 15

**Target:** `cypress` ^15, `@testing-library/cypress` ^10.

**Files likely touched:**

- `package.json`
- `cypress.config.js` (if API changed)
- `.github/workflows/ci.yml` — consider `cypress-io/github-action@v6` (v5 targets older Cypress)

**Checklist:**

- [ ] `npm run test:cypress` locally
- [ ] CI e2e job green (`wait-on` + trailing slash on `/basketcase-react/`)
- [ ] `cy.visit("/")` still resolves against `baseUrl`

**Effort:** 1–3 hrs

---

## PR D — ESLint 10

**Target:** `eslint` ^10, `@eslint/js` ^10.

**Files likely touched:**

- `package.json`
- `eslint.config.js` — ESLint 10 drops legacy eslintrc entirely; flat config only (already migrated)

**Checklist:**

- [ ] `npm run lint` clean
- [ ] `eslint-plugin-cypress`, `@vitest/eslint-plugin`, `eslint-plugin-prettier` still compatible (verify peer deps)

**Effort:** 1–2 hrs

---

## PR E — Testing Library stack

**Target:** `@testing-library/jest-dom` ^6, `@testing-library/react` ^16.

**Changes:**

- jest-dom v6 import path may change — update `src/setupFiles.js` if needed
- React Testing Library 16 expects React 18+; full React 19 validation in PR F

**Checklist:**

- [ ] Unit tests pass (MSW, router, MUI Select helpers)
- [ ] Matchers (`toBeInTheDocument`, etc.) still work

**Effort:** 1–2 hrs

---

## PR F — React 19

**Target:** `react` / `react-dom` ^19, `@types/react` / `@types/react-dom` ^19.

**Watch:**

- Strict Mode + effects (`App.jsx` search effect, infinite scroll)
- MUI 5 on React 19 — verify before PR G; may need MUI bump first if issues appear
- `@testing-library/react` 16 (PR E) should already be in place

**Checklist:**

- [ ] Unit + Cypress green
- [ ] Manual smoke: sort, facets, infinite scroll, URL sync

**Effort:** 2–4 hrs (longer if MUI 5 incompatibility forces reorder with PR G)

---

## PR G — MUI 9

**Target:** `@mui/material` ^9, `@mui/icons-material` ^9.

**Largest remaining migration.** MUI 5 → 9 spans multiple majors (Grid2, theme, deprecated APIs).

**Suggested approach:**

1. Read [MUI migration guides](https://mui.com/material-ui/migration/migration-v5/) (v5→v6, v6→v7, etc.) or run [MUI codemods](https://mui.com/material-ui/migration/migration-v5/#codemods).
2. Audit: `SortBy`, `FilterPanel`, `LayoutBig` / `LayoutSmall`, `Select`, `Snackbar`, theme/breakpoints.
3. Re-check unit test helpers (`combobox` / native input) after any Select API changes.

**Checklist:**

- [ ] Visual parity (layouts, facets, sort, toast)
- [ ] Unit + Cypress green
- [ ] No new a11y regressions on interactive controls

**Effort:** 1–2 days

**Alternative:** Split into PR G1 (MUI 6) and PR G2 (MUI 9) if a single PR is too large.

---

## PR H — gh-pages 6 + CI housekeeping

**Target:** `gh-pages` ^6.

**Optional in same PR:**

- `actions/checkout@v4`, `actions/setup-node@v4`
- `peaceiris/actions-gh-pages@v4` (if compatible with deploy flow)

**Checklist:**

- [ ] `npm run build` + deploy path unchanged (tag-triggered job only)

**Effort:** ~30 min

---

## PR I — Node 24 (last)

**When:** After PRs A–H.

**Changes:**

- `.nvmrc`: `22` → `24`
- CI already uses `node-version-file: ".nvmrc"` — no workflow change required

**Verification gate:**

```bash
nvm install 24 && nvm use
npm clean-install
npm run lint
npm test          # critical — historically fails here first
npm run test:cypress
npm run build
```

**Known issue:** Node 24 + jsdom + React Router `navigate()` can trigger `AbortSignal` errors in unit tests (“UI state is reflected in the URL state”). This is a **test-environment** issue, not an app bug. Node 22 is fine.

**If unit tests fail on Node 24:**

| Option | Notes |
|--------|--------|
| **A. Vitest 4 + jsdom 29** (PR B) | Try first — may already be fixed upstream |
| **B. Custom Vitest environment** | Preserve Node’s native `AbortController` |
| **C. Stay on Node 22** | Valid until April 2027 (LTS); document and revisit |

**Effort:** 1–2 hrs if green; longer if a test workaround is needed

---

## Optional / follow-up

| Item | Notes |
|------|--------|
| Replace `@ahooksjs/use-url-state` | Peer dep still `react-router ^6`; override works today. Consider `useSearchParams` + small helper if package is abandoned. |
| React Compiler ESLint rules | `eslint-plugin-react-hooks` v7 `recommended` preset adds `set-state-in-effect`, `refs`, etc. Opt in deliberately after React 19 / MUI stable. |
| Cypress 15 + Mocha/Chai ESLint | `eslint-plugin-cypress` 6 docs show optional `eslint-plugin-mocha` / `chai-friendly` — only if lint noise appears. |
| `npm audit` | Review manually; avoid `--force`. |

---

## Guardrails

1. **`nvm use`** before every install and test run.
2. **One major per PR** — don’t combine MUI 9 + Vite 8 + React 19 in one branch.
3. **Keep the `react-router` override** until `@ahooksjs/use-url-state` declares React Router 7 support (or the lib is removed).
4. **Document surprises** in this file’s “Known issues” table when you hit them.

---

## Known issues (reference)

| Issue | Cause | Fix / status |
|-------|-------|----------------|
| MUI Select `role="combobox"` in tests | MUI 5.18+ | `test-helpers.js` uses combobox / native input |
| Infinite re-render on sort | `useInfiniteScroll` ref + `setState` | Refactored to `useRef` |
| Vite 6 `base` without trailing slash | Asset 404s | `base: "/basketcase-react/"` + `publicAssetUrl()` |
| Cypress CI 404 on `/basketcase-react` | Vite strict `base` | Trailing slash in `wait-on` + `baseUrl` |
| Duplicate `react-router` with RR7 | `@ahooksjs/use-url-state` pulls v6 | `overrides` in `package.json` |
| Node 24 + jsdom + RR navigate | `AbortSignal` in test env | **Deferred to PR I** |
| Toast context + Fast Refresh | `react-refresh/only-export-components` | `toast-context.js` split |

---

## Effort summary

| PR | Effort | Value |
|----|--------|-------|
| A — In-range update | ~15 min | Lockfile hygiene |
| B — Vite 8 + Vitest 4 | 2–4 hrs | Latest build/test toolchain |
| C — Cypress 15 | 1–3 hrs | Supported E2E runner |
| D — ESLint 10 | 1–2 hrs | Current linter major |
| E — Testing Library | 1–2 hrs | Modern test utils |
| F — React 19 | 2–4 hrs | Current React major |
| G — MUI 9 | 1–2 days | Current UI major |
| H — gh-pages + CI | ~30 min | Deploy + Actions freshness |
| I — Node 24 | 1–2+ hrs | Latest Node runtime |

**Total remaining (estimate):** ~2–4 days of focused work, dominated by MUI 9.
