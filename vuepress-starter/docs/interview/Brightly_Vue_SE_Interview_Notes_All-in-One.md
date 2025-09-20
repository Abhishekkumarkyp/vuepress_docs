# Brightly Vue Software Engineer — Interview Notes (All‑in‑One)

# Brightly (Siemens) — Company & Role Overview

## Company snapshot (what to know for intros)
- **Domain:** Intelligent Asset Management (CMMS/EAM, Strategic Asset Management, IoT monitoring, Sustainability).
- **Customers:** Public sector (education, government), healthcare, utilities, manufacturing, etc.
- **Pitch in one line (say this):** “Brightly builds SaaS to manage the full asset lifecycle—work orders, reliability, and sustainability—at scale.”
- **Implication for frontend work:** Data‑heavy UIs, complex filters/tables/forms, offlineish/slow network scenarios, accessibility, and reliability.

## The role (what the JD emphasizes)
- **Frontend core:** Vue 3 + strong JS/TS, state (Vuex/Pinia), UI kit (Vuetify/Bootstrap/Material), responsive layouts.
- **API & async:** REST integration, pagination/filtering, debouncing, cancellation, retries/backoff, idempotency.
- **Quality:** Unit tests (Jest/Vue Test Utils), a light e2e smoke (Cypress/Playwright), code review hygiene.
- **DevOps mindset:** CI/CD, logging/monitoring, error budgets, performance budgets, Docker/K8s/OpenShift basics.
- **DX & tooling:** Git, npm/yarn, bundlers (Vite/webpack), code‑splitting, tree‑shaking.
- **Non‑negotiables:** Accessibility (WCAG), solid CS/OOP/SOLID, good comms and ownership for production incidents.

## How to map your projects to the JD
- **Feature delivery:** Show a List → Detail → Edit flow with cached state, optimistic updates, rollback.
- **Reliability:** Show Axios service with retries + exponential backoff, and AbortController cancel on typeahead.
- **Observability:** Show Sentry (or similar) + Web Vitals RUM; dashboards for error rate/latency/retries.
- **A11y:** Custom modal with focus trap, keyboard nav, labels + aria‑describedby, high‑contrast theme check.
- **Perf:** Route‑level code‑split, virtualized table, memoized computed lists, Lighthouse ≥ 90 in Perf & A11y.

## One‑minute “Why me”
> “I build resilient, accessible Vue apps. I’ve shipped data‑heavy views with Pinia/Vuex, Axios layers with retry + cancel, and CI pipelines that gate on tests, bundle size, and Lighthouse. I’m comfortable owning incidents end‑to‑end—triage, rollback, and prevention.”


---

# Technical Preparation Guide (Frontend‑heavy, JD‑aligned)

## 1) Vue 3 + TypeScript
- **Core patterns:** Composition API (setup, refs/reactive, computed vs watch), props/emit/slots, Suspense, Teleport.
- **Reactivity gotchas:** Unstable identities in templates; deep reactive trees → use `shallowRef/markRaw` for big blobs.
- **Architecture:** Feature folders, composables library (`useFetch`, `useDebounce`, `useThrottle`, `usePagination`).

### Snippets
**Debounce + cancel on search**
```ts
let ctrl: AbortController | null = null;
const search = async (q: string) => {
  if (ctrl) ctrl.abort();
  ctrl = new AbortController();
  return axios.get('/api/assets', { params: { q }, signal: ctrl.signal });
};
```
**Composable shell**
```ts
export function useFetch<T>(factory: () => any, opt={retries:2}) {
  const data = ref<T|null>(null), error = ref(), loading = ref(false);
  let ctrl: AbortController | null = null;
  const run = async () => {
    const cfg = factory(); if (!cfg) return;
    loading.value = true; error.value = null;
    if (ctrl) ctrl.abort(); ctrl = new AbortController();
    try { data.value = await http<T>(cfg, { signal: ctrl.signal, retries: opt.retries }); }
    catch (e) { error.value = e; } finally { loading.value = false; }
  };
  return { data, error, loading, run, cancel: () => ctrl?.abort() };
}
```

## 2) State management (Pinia/Vuex)
- **When global:** auth, user profile, feature flags, server cache reused across routes.
- **When local:** view‑only UI state (modals, inputs).
- **Patterns:** `byId + ids` normalization; selectors via getters; cache TTL; optimistic updates with rollback.

## 3) UI kits & accessibility
- **Kits:** Vuetify/PrimeVue/Bootstrap—grid, forms, dialogs, DataTable (virtual scroll/pagination).
- **WCAG checklist:** labels + `for/id`, `aria-describedby` for errors/hints, `aria-invalid` on error, visible focus, tab/esc handling, color‑contrast.

## 4) API & async robustness
- **Retries/backoff:** Retry only idempotent requests (GET/PUT/DELETE) or use idempotency keys for POST. Exponential backoff + jitter.
- **Cancellation:** Always cancel stale requests on fast‑typing filters and route changes.
- **Resilience panel:** Log retry count, last error, and show user‑friendly toasts.

**Axios with retry & backoff (sketch)**
```ts
async function http<T>(cfg, {retries=3, base=300, signal}: any = {}) {
  for (let i=0;i<=retries;i++){
    try { return (await axios.request<T>({ ...cfg, signal })).data; }
    catch(e:any){
      const s = e?.response?.status;
      const last = i===retries, transient = [429,500,502,503,504].includes(s);
      if (e.code==='ERR_CANCELED' || !transient || last) throw e;
      const delay = base * 2**i + Math.random()*100; await new Promise(r=>setTimeout(r, delay));
    }
  }
}
```

## 5) Testing strategy
- **Unit & component:** Jest + Vue Test Utils; mock axios; cover success/error/cancel paths; snapshot variants (empty/loading/error).
- **e2e smoke:** Playwright/Cypress for login → list → detail happy path.
- **CI gates:** lint, typecheck, unit tests, bundle size check, build.

## 6) Performance
- **Rendering:** split “god components,” memoize heavy computed values, `v-memo`/`keep-alive` where fitting.
- **Network:** HTTP caching, CDN for static assets, lazy routes, code splitting.
- **Diagnostics:** Chrome DevTools Performance/Memory; Lighthouse/Web Vitals budgets.

## 7) DevOps & reliability
- **Docker image:** Nginx‑served SPA; env via `window.__APP_CONFIG__` or build‑time `VITE_*`.
- **K8s/OpenShift basics:** readiness/liveness probes; config via ConfigMaps/Secrets; horizontal autoscaling.
- **Observability:** Sentry (errors), Web Vitals RUM, logs for retries/cancels; synthetic checks post‑deploy.


---

# Interview Process & Behavioural Preparation

## Likely flow
1. **Online Assessment:** aptitude + coding (arrays/strings/maps; one medium DSA).
2. **Technical Round(s):** Vue/JS depth, state, async/API, testing, a11y, and scenario debugging.
3. **Dev Round / System Design Lite:** design a small module (e.g., searchable assets) and reason about scale/perf.
4. **Behavioural/HR:** ownership of incidents, teamwork, communication, change management.

## Technical prompts (answer frameworks)
- **Vue reactivity:** explain refs/reactive, computed vs watch; show how you prevent rerenders in a big table (normalize, virtualize, split rows, stable identities).
- **Async:** how you debounce + cancel stale calls; retries with backoff; when POST is safe (idempotency key).
- **Testing:** how you’d test a `useFetch` composable (success/error/cancel); mocking axios; coverage goals.
- **DevTools/perf:** read a flame chart; fix a re-render loop; code‑split a route and measure bundle diff.
- **A11y:** make a custom dialog accessible (roles, focus trap, keyboard support).

## Behavioural (STAR skeletons to rehearse)
**Production incident**
- **S/T:** Release caused search timeouts for APAC; P95 > 8s.
- **A:** Feature‑flag off typeahead; rollback; add client cancel + retry/backoff; canary gate; add dashboards.
- **R:** Error rate 6% → <0.5% in 20 minutes; sustained P95 < 600ms; added tests & synthetic checks.

**Driving quality**
- **S/T:** Bug‑prone form flow.
- **A:** Contract tests on API; component tests on validation; CI gates (lint, typecheck, unit, size‑limit, Lighthouse).
- **R:** 30% reduction in regressions; faster PR cycle; documented checklist.

## Rapid revision checklist (night before)
- Revisit **Axios retry + cancel** code.
- Practice **Pinia store + selectors** and a **virtualized table**.
- Walk through **WCAG a11y** for forms & modals.
- Run a **Lighthouse** and DevTools **Performance** pass on a demo app.
- Prepare 2–3 **STAR stories** (incident, conflict resolution, delivery under ambiguity).
