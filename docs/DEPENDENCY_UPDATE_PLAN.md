# Dependency Update Plan

Plan for updating all dependencies in basketcase-react. Work in small PRs on **Node 22** (see `.nvmrc`), then move to **Node 24** as a final step once the toolchain is modern.

## Current state

Most runtime deps are already at the latest **within their major** (React 18.3, MUI 5.18, React Router 6.30). The main gaps are major-version jumps across the toolchain and a few libraries that have not been migrated yet.

| Area | Current | Latest | Risk |
|------|---------|--------|------|
| Build / test | Vite 4, Vitest 0.33 | Vite 8, Vitest 4 | High |
| Data fetching | `react-query` v3 | `@tanstack/react-query` v5 | Medium |
| API mocking | MSW 1 (`rest`) | MSW 2 (`http`) | Medium |
| Routing | React Router 6.30 | React Router 7.18 | Medium |
| UI | MUI 5 | MUI 9 | High |
| React | 18 | 19 | Medium–High |
| Lint / format | ESLint 8 + `.eslintrc.cjs`, Prettier 2 | ESLint 10 flat config, Prettier 3 | Medium |
| E2E | Cypress 12 | Cypress 15 | Medium |

**Constraint:** Use Node 22 via `.nvmrc` until PR 7. Node 24 triggers a known unit-test issue with jsdom + React Router navigation (see [Node 24](#pr-7--node-24) below).

---

## Approach

Six dependency PRs on Node 22, then a Node 24 PR. One major migration per PR. Each PR must pass:

```bash
nvm use
npm run lint
npm test
npm run test:cypress
npm run build   # where applicable
```

CI already reads Node from `.nvmrc` (`.github/workflows/ci.yml`).

---

## PR 1 — Safe in-range updates

**Goal:** Fresh lockfile, no API changes.

```bash
nvm use
npm update
npm run lint && npm test && npm run test:cypress
```

**Expected:** Minor/patch bumps only (axios, emotion, fontsource, etc.).

**Watch for:** Surprises like the MUI Select `combobox` role change — covered by existing unit tests.

**Effort:** ~30 min

---

## PR 2 — Toolchain: Vite + Vitest + jsdom

**Target versions (suggested):** Vite 6.x, Vitest 3.x, `@vitejs/plugin-react` 4.x, jsdom 26.x.

(Vite 8 / Vitest 4 are available but a bigger jump; Vite 6 + Vitest 3 is a sensible middle step.)

**Files likely touched:**

- `package.json`
- `vite.config.js` (Vitest config API changes across 0.33 → 3.x)
- Possibly `src/setupFiles.js`

**Checklist:**

- [ ] `npm run dev` / `npm run build`
- [ ] Unit tests pass on Node 22
- [ ] No new jsdom `AbortSignal` warnings

**Effort:** 2–4 hrs

**Note:** This PR is the main enabler for [Node 24](#pr-7--node-24) — newer Vitest may fix jsdom `AbortController` overrides that break React Router navigation in tests.

---

## PR 3 — MSW 2 migration

**Why separate:** MSW 1 → 2 is a contained API rewrite.

**Changes:**

- `src/mocks/handlers.js`: `rest.post(...)` → `http.post(...)` + `HttpResponse.json(...)`
- `src/mocks/server.js`: verify `setupServer` import path
- [MSW 2 migration guide](https://mswjs.io/docs/migrations/1.x-to-2.x)

**Checklist:**

- [ ] Unit tests (MSW-backed) pass
- [ ] Search mock still returns paginated/sorted fixtures

**Effort:** 1–2 hrs

---

## PR 4 — TanStack Query v5

**Why separate:** Package rename + hook API changes.

**Changes:**

- `react-query` → `@tanstack/react-query`
- Update imports in `main.jsx`, `App.test.jsx`, `use-search.js`, `use-is-active.js`
- `useMutation(doSearch, options)` → `useMutation({ mutationFn: doSearch, ...options })`
- v5 deprecates `onSuccess` / `onError` on mutations — refactor `use-search.js` / `App.jsx` to handle side effects via `mutate` callbacks or `useEffect` on mutation state

**Checklist:**

- [ ] Search + infinite scroll still work
- [ ] Loading indicator (`useIsFetching`) still behaves correctly

**Effort:** 2–3 hrs

---

## PR 5 — React Router 7

**Why now:** App already opts into `v7_startTransition` via `src/router-future.js`.

**Changes:**

- Bump `react-router-dom` to v7
- Remove obsolete `future` flags if v7 makes them default
- Re-check `@ahooksjs/use-url-state` compatibility (peer dep is `react-router ^6`; may still work — verify URL sync tests)

**Checklist:**

- [ ] All unit tests (especially URL ↔ UI sync)
- [ ] Cypress happy path
- [ ] No router deprecation warnings

**Effort:** 1–2 hrs

---

## PR 6 — ESLint 9+ flat config + Prettier 3

**Why last:** Touches lint config globally; unrelated to runtime.

**Changes:**

- Replace `.eslintrc.cjs` with `eslint.config.js` (flat config)
- Bump `eslint`, `eslint-config-prettier`, plugins together (`eslint-plugin-cypress` 6.x for ESLint 9+)
- Prettier 2 → 3 (expect formatting diffs)
- Update lint script: drop `--ext js,jsx` (not used in flat config)

**Checklist:**

- [ ] `npm run lint` clean
- [ ] Cypress + Vitest ESLint plugins still work

**Effort:** 3–5 hrs

---

## PR 7 — Node 24

**When:** After PRs 1–6 (or trial after PR 2 to see if Vitest fixes the test env issue early).

**Why last:** Node 24 + jsdom + React Router `navigate()` causes `AbortSignal` incompatibility in unit tests. This is a test-environment issue, not an app bug. Node 22 works with standard `jsdom`.

**Changes:**

- `.nvmrc`: `22` → `24`
- CI already uses `node-version-file: ".nvmrc"` — no workflow change needed
- Local: `nvm install 24 && nvm use`

**Verification gate:**

```bash
nvm use
npm clean-install
npm run lint
npm test          # critical — Node 24 usually fails here first
npm run test:cypress
npm run build
```

**If unit tests fail with `AbortSignal`:**

| Option | Pros | Cons |
|--------|------|------|
| **A. Upgrade Vitest further** (try latest 4.x) | Clean, no custom code | Depends on upstream fix being released |
| **B. Custom vitest environment** (preserve Node's `AbortController`) | Reliable | Extra test infrastructure |
| **C. Stay on Node 22 until Vitest catches up** | Zero test hacks | Delays Node 24 |

Try **A** first; fall back to **B** if needed. **C** is fine — Node 22 LTS is supported until April 2027.

**Checklist:**

- [ ] `.nvmrc` → `24`
- [ ] `npm clean-install` on Node 24
- [ ] Unit tests pass (especially “UI state is reflected in the URL state”)
- [ ] No unhandled `AbortSignal` rejections in Vitest output
- [ ] Cypress + deploy job green in CI

**Effort:** 1–2 hrs (if Vitest 4 resolves the issue); longer if a test workaround is needed

---

## Optional / deferred

### Cypress 12 → 15

Can ride with PR 2 or be its own PR. Check `cypress.config.js` and `cypress-io/github-action` in CI.

### React 19

Often paired with MUI 6+ and React Router 7. App is small enough to migrate; verify:

- Strict-mode behaviour with `useInfiniteScroll` (already uses `useRef`)
- Any deprecated React 18 APIs

### MUI 5 → 6+ (latest: 9.x)

Largest UI migration. Run [MUI codemods](https://mui.com/material-ui/migration/migration-v5/), audit `SortBy`, `FilterPanel`, layout components. Only when new MUI features are wanted — not required for toolchain health.

**Effort:** 1–2 days

---

## Recommended order

```
PR 1 (in-range update)
  → PR 2 (Vite + Vitest)
  → PR 3 (MSW 2)
  → PR 4 (TanStack Query v5)
  → PR 5 (React Router 7)
  → PR 6 (ESLint + Prettier)
  → PR 7 (Node 24)

Optional: trial Node 24 after PR 2 to validate Vitest before larger migrations.
```

---

## Guardrails

1. **`nvm use`** before every install and test run.
2. **One major migration per PR** — avoid debugging MSW + MUI + ESLint failures together.
3. **Test gate on every PR:** lint → unit → Cypress → manual smoke (`npm run dev`).
4. **Pin intentionally** if a peer dep blocks progress (e.g. `@ahooksjs/use-url-state` + React Router 7) — document and revisit.
5. **Avoid `npm audit fix --force`** — it jumps majors unpredictably.

---

## Effort summary

| PR | Effort | Value |
|----|--------|-------|
| 1 — In-range update | ~30 min | Lockfile hygiene |
| 2 — Vite + Vitest | 2–4 hrs | Modern build/test; Node 24 enabler |
| 3 — MSW 2 | 1–2 hrs | Supported mocking API |
| 4 — TanStack Query v5 | 2–3 hrs | Supported data-fetching library |
| 5 — React Router 7 | 1–2 hrs | Supported routing major |
| 6 — ESLint + Prettier | 3–5 hrs | ESLint no longer EOL |
| 7 — Node 24 | 1–2+ hrs | Latest Node runtime |
| Optional: MUI + React 19 | 1–2 days | Modern UI stack |

---

## Known issues (reference)

Issues encountered during a prior `npm update` session — documented so future updates do not re-discover them:

| Issue | Cause | Fix applied |
|-------|-------|-------------|
| Unit test: “Unable to find role button” | MUI 5.18 Select uses `role="combobox"` | `test-helpers.js` uses combobox / native input |
| Unit test: infinite re-render on sort change | `useInfiniteScroll` ref callback called `setState` | Switched to `useRef` |
| React Router future flag warning | `v7_startTransition` not set | `src/router-future.js` + `future` prop on router |
| `act(...)` warnings in tests | MUI Select menu transitions | Native input change in test helper |
| Node 24 + jsdom + RR navigate | `AbortSignal` mismatch in test env | Stay on Node 22; address in PR 7 |
