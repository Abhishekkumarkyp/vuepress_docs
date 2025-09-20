---
title: Project Structure (Framework-Agnostic)
---

# Frontend Project Structure Best Practices

A clear, intentional structure makes code **discoverable**, **scalable**, and **easy to maintain**—no matter whether you use **Vue, React, Angular, Next.js, or Nuxt 3**.

---

## Quick Overview

- Organize by **concern** (UI, logic, state, routes) and/or by **feature** (auth, billing).
- Keep **shared** pieces (components, utils, assets) centralized and named consistently.
- Prefer **clarity over cleverness**; shallow, predictable trees beat deep nesting.
- Co-locate tests and styles with their component when it improves readability.
- Plan for **growth** (SSR/SSG/CSR, monorepo, microfrontends) from day one.

---

## Universal Principles

### Separation of concerns
- **UI** (components, pages) separate from **logic** (composables/hooks/services), **state**, **routing**, and **styles**.
- Framework-agnostic utilities live in `utils/` (pure functions, no framework imports).

### Predictability & consistency
- Decide naming once; apply everywhere:
  - **Files/Folders:** `kebab-case` (`user-profile/`, `order-history.vue`)
  - **Components:** `PascalCase` (`UserCard.vue`, `PrimaryButton.tsx`)
  - **Variables/Functions:** `camelCase` (`fetchUser`, `userId`)
  - **Constants/Enums:** `UPPER_SNAKE_CASE` (`API_BASE_URL`)
- Keep folder roles consistent across the codebase.

### Scalability
- Prefer **feature/domain folders** as apps grow:
  ```
  src/
    features/
      auth/
      dashboard/
      reports/
    shared/        # truly reusable UI, hooks, utils
  ```
- Extract cross-feature logic into `shared/` (or `components/`, `composables/`/`hooks/`, `utils/`).

### Reuse & co-location
- Reuse via **shared** folders; co-locate **tests** and **styles** next to components when helpful:
  ```
  Button/
    Button.vue|tsx
    Button.test.ts
    Button.module.scss
  ```

---

## A Generic, Cross-Framework Skeleton

Use as a mental model; adapt per framework section below.

```text
src/
  app/              # app shell / root setup (optional alias)
  assets/           # images, fonts, raw styles (processed by bundler)
  components/       # reusable UI (shared across features)
  features/         # feature (domain) folders; each owns its UI/logic
  pages|views/      # route-level screens (if not auto-routed by framework)
  router/           # routing config (if not file-based)
  store/            # global state (Pinia/Vuex/Redux/Zustand/NgRx)
  services/         # API clients, http instance, interceptors
  composables|hooks/# Vue Composables / React Hooks (reusable logic)
  utils/            # pure helpers (dates, numbers, parsing)
  styles/           # tokens, global css/scss, themes
  directives/       # Vue/Angular directives (if used)
  types/            # TS types & interfaces
main.ts|js          # entry
App.vue|tsx         # app root
```

---

## Vue 3 (SPA) Structure

```text
src/
  main.ts
  App.vue
  assets/
  components/        # shared UI
  views/             # route pages
  router/            # Vue Router (index.ts, guards.ts)
  store/             # Pinia stores (auth.ts, settings.ts)
  services/          # axios instance, API modules
  composables/       # useAuth.ts, useFetch.ts (logic reuse)
  utils/
  styles/            # tokens.scss, theme.css
  directives/
  types/
```

**Notes**
- Use **Pinia** for global state; keep **state normalized** (flat objects, ids).
- Place **feature-specific** components under `features/<feature>/components` if you adopt a feature-first layout.
- Keep `App.vue` lean (layout shell + `<router-view/>`).

---

## React (SPA) Structure

**Option A — Feature-first (recommended for scale)**

```text
src/
  features/
    auth/
      components/
      hooks/
      services/
      index.ts
    dashboard/
  shared/
    components/      # Button, Modal, FormField
    hooks/           # useDebounce, useMediaQuery
    services/        # http client, analytics
    utils/
  pages/             # route endpoints (if using React Router)
  store/             # Redux/Zustand setup (optional)
  styles/
  App.tsx
  main.tsx
```

**Option B — Components + pages (small/medium apps)**

```text
src/
  components/        # shared UI (with subfolders per component)
  pages/             # route components
  hooks/
  services/
  utils/
  styles/
```

**Notes**
- Co-locate `Component.tsx`, `Component.test.tsx`, `Component.module.scss`.
- Add `index.ts` “barrels” for nicer imports where helpful.

---

## Angular Structure (CLI + Modules)

```text
src/app/
  core/              # singletons: layout, auth guard, interceptors, logger
    core.module.ts
  shared/            # shared UI: components, directives, pipes (no services)
    shared.module.ts
  features/
    products/
      components/
      services/
      products.module.ts
      products-routing.module.ts
    account/
  store/             # NgRx (actions/reducers/selectors per slice) (optional)
  app.module.ts
  app-routing.module.ts
```

**Notes**
- **CoreModule**: import **once** in `AppModule`.
- **SharedModule**: declare/export UI bits used across features.
- Feature modules are **lazy-loadable**; keep services close to where used.

---

## Next.js Structure

### Pages Router (classic)

```text
pages/
  index.tsx
  about.tsx
  blog/
    [slug].tsx
  api/               # serverless endpoints
components/
lib|utils/
styles/
public/              # served at site root
```

### App Router (Next 13+)

```text
app/
  layout.tsx
  page.tsx
  dashboard/
    layout.tsx
    page.tsx
    settings/
      page.tsx
components/
lib|utils/
styles/
public/
```

**Notes**
- Keep shared UI in `components/`, pure logic in `lib/|utils/`.
- Use **server components** where possible; isolate browser-only code to client components.
- API logic: `pages/api/*` or `app/api/*`.

---

## Nuxt 3 Structure

```text
app.vue               # root shell
pages/                # file-based routing
components/           # auto-imported shared UI (can nest)
layouts/              # default.vue, auth.vue,...
composables/          # auto-imported useX() logic
plugins/              # runs before app init (client/server variants)
middleware/           # route guards
assets/               # processed styles, images
public/               # static files (served as-is)
server/
  api/                # Nitro server routes
  middleware/
```

**Notes**
- Prefer **composables** for reusable logic; integrate **Pinia** for global state.
- Use `server/` for backend-ish code (DB, secure calls).

---

## Where to Put… (Quick Matrix)

| Concern                | Vue                         | React                         | Angular                      | Next.js                      | Nuxt 3                    |
|------------------------|-----------------------------|-------------------------------|------------------------------|------------------------------|---------------------------|
| Reusable UI            | `components/`               | `shared/components/` or `components/` | `shared/components/`         | `components/`                | `components/` (auto import) |
| Route pages            | `views/`                    | `pages/` (custom)             | feature `.../components/`    | `pages/` or `app/*/page.tsx` | `pages/`                  |
| Global state           | `store/` (Pinia)            | `store/` (Redux/Zustand)      | `store/` (NgRx)              | `store/` (if using Redux)    | Pinia stores/composables  |
| API/HTTP               | `services/`                 | `shared/services/`            | `apis/` or feature services  | `lib/` + `pages/app/api/`    | `server/api/` + composables |
| Reusable logic         | `composables/`              | `shared/hooks/`               | services/helpers             | `lib/` or hooks              | `composables/`            |
| Pure helpers           | `utils/`                    | `shared/utils/`               | `shared/utils/`              | `lib/` or `utils/`           | `utils/`                  |
| Theming/tokens         | `styles/`                   | `styles/`                     | global styles                | `styles/`                    | `assets/` + `styles`      |

---

## SSR, SSG, CSR — Structural Notes

- **CSR (SPA):** everything runs in the browser. Emphasize **code-splitting** and **lazy routes**.
- **SSR:** keep **server-only** code out of client bundles. Use framework-provided places:
  - Next: server components / `api/` routes
  - Nuxt: `server/api/`, `plugins/*.server.ts`
  - Angular: Universal (separate server entry)
- **SSG:** organize content sources (`content/`, markdown, CMS). Page files keep `getStaticProps`/`getStaticPaths` (Next) or Nuxt Content.

---

## Monorepo vs Polyrepo (Brief)

- **Monorepo**: one repo, many apps/packages (easier sharing, unified tooling). Use **Nx/Turborepo/Lerna**.  
  ```
  /apps/frontend
  /apps/admin
  /packages/ui           # shared component library
  /packages/utils        # shared helpers
  ```
- **Polyrepo**: separate repos per app/library (clear ownership, independent releases). Share via versioned packages.

**Rule of thumb:** lots of shared code & coordinated releases → **monorepo**. Independent lifecycles → **polyrepo**.

---

## Microfrontends (Brief)

- Split UI by **business domain** into independently deployable apps.
- Compose via **shell** (runtime Module Federation, iframes, or server composition).
- Enforce **isolation** (scoped CSS, no globals) and **contracts** (events, APIs).
- Keep UX cohesive via a **shared design system** (tokens, components).

---

## Recommended Checklists

### When starting a new repo
- [ ] Decide **feature-first** vs **type-first** layout.  
- [ ] Add `components/`, `services/`, `utils/`, `styles/` (and `composables/` or `hooks/`).  
- [ ] Set naming conventions and a lint/format config.

### As the app grows
- [ ] Extract cross-cutting logic to `shared/` (or `components/`/`composables/`).  
- [ ] Adopt **feature folders** for domains.  
- [ ] Keep routes lazy-loaded; monitor bundle size.

### Before release
- [ ] Structure review: no deep nesting, clear boundaries.  
- [ ] Shared tokens and themes centralized.  
- [ ] Server-only code kept out of client bundles (SSR).  

---

## SOLID 
In that line from the doc, SOLID refers to the five core object-oriented design principles:

S → Single Responsibility Principle (SRP)
A class/module should have one, and only one, reason to change.

O → Open/Closed Principle (OCP)
Software entities should be open for extension but closed for modification.

L → Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types without breaking correctness.

I → Interface Segregation Principle (ISP)
Many small, specific interfaces are better than one large, general-purpose interface.

D → Dependency Inversion Principle (DIP)
High-level modules shouldn’t depend on low-level modules—both should depend on abstractions.

👉 In your sentence “SOLID: small focused modules; depend on abstractions; keep contracts small”, it’s a summary interpretation of SRP + DIP + ISP in particular.



## Key Takeaways

- Favor **feature-first** for scale; keep a **shared** area for true reuse.  
- Separate **UI, logic, state, routes, and styles**.  
- Co-locate tests and styles with components when it aids clarity.  
- Plan early for **SSR/SSG/CSR**, **monorepos**, and optional **microfrontends**.  

**A clean structure is a multiplier**—it speeds onboarding, reduces bugs, and lets teams ship with confidence.

