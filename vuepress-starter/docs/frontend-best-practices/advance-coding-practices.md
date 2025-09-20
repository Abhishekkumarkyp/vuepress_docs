---
title: Coding Practices (JS/TS)
---

# Coding Best Practices for JavaScript & TypeScript

A practical, framework-agnostic guide to writing **clean, scalable, and maintainable** code across **Vue, React, Angular, Next.js, and Nuxt**. Use this as a living reference for teams.

---

## Quick Principles

- **Prefer clarity over cleverness.**
- **Make things predictable:** same problems solved the same way.
- **Keep files small, functions focused, and modules cohesive.**
- **Automate style & quality** with ESLint/Prettier and tests.

---

## 1) General Conventions & Formatting

- **Indentation:** 2 spaces. No tabs.
- **Semicolons:** use them (`;`) consistently.
- **Line length:** ~100–120 chars; wrap long expressions.
- **Braces:** same-line opening brace. `if (ok) { ... }`
- **Spacing:** add spaces around operators and after commas.
- **Newlines:** end files with a newline. No trailing spaces.

**Example (good):**
```ts
function canProceed(score: number, min = 70): boolean {
  if (score >= min) {
    return true
  }

  return false
}
```

**Example (avoid):**
```ts
function canProceed(score,min=70){if(score>=min){return true}return false}
```

---

## 2) Naming Conventions

- **Variables/Functions:** `camelCase` → `userCount`, `fetchUsers`.
- **Classes/Components:** `PascalCase` → `UserCard`, `ShoppingCartService`.
- **Constants:** `UPPER_SNAKE_CASE` → `API_BASE_URL`.
- **Booleans:** read like questions → `isActive`, `hasAccess`.
- **Types/Interfaces (TS):** `PascalCase` → `UserProfile`, `OrderDTO`.
- **Avoid** cryptic abbreviations; prefer self-explanatory names.

**Example:**
```ts
const API_BASE_URL = '/api/v1'

interface UserProfile {
  id: string
  email: string
  isAdmin: boolean
}

function getUserEmail(user: UserProfile) {
  return user.email
}
```

---

## 3) File & Folder Naming

- **Be consistent:** choose kebab-case or PascalCase and stick to it.
- **One main entity per file** (component/class/module).
- **Match names:** file name mirrors the primary export.

**Examples:**
```text
// Feature-first (recommended for scale)
src/
  features/
    auth/
      components/
        LoginForm.tsx
      services/
        auth.service.ts
      hooks/
        useAuth.ts
    dashboard/
  shared/
    components/ (Button, Modal)
    utils/      (date, string, number)
```

```text
// Type-first (ok for small apps)
src/
  components/
  pages|views/
  services/
  utils/
```

**Angular tip:** use suffixes → `user-profile.component.ts`, `auth.guard.ts`, `orders.module.ts`.

**Next/Nuxt:** follow file‑based routing → `pages/`, `app/` (Next 13+), `pages/` (Nuxt 3).

---

## 4) Type Safety (TypeScript)

- Enable **strict mode** in `tsconfig.json`.
- Prefer **`const`** by default; use `let` if reassigned; **never** `var`.
- Avoid **`any`**; use `unknown`, unions, interfaces, or generics.
- Type **function signatures** and **public APIs** explicitly.
- Model domains with **interfaces/types**, not loose objects.

**Example:**
```ts
// Good: explicit, narrow types
type Role = 'admin' | 'user' | 'guest'

interface User {
  id: string
  email: string
  role: Role
}

function canEdit(user: User): boolean {
  return user.role === 'admin'
}
```

**Runtime inputs:** validate server/JSON data at runtime (e.g., with zod/Joi).

---

## 5) Immutability & Pure Functions

- Do **not mutate** inputs/state; return **new values**.
- Prefer **pure functions** (same input → same output, no side effects).
- Isolate side effects (API calls, DOM) in dedicated layers/hooks.

**Examples:**
```ts
// Immutable array update
const next = [...current, item]

// Immutable object update
const updated = { ...user, email: newEmail }
```

```ts
// Pure function
export const toTitle = (s: string) =>
  s.trim().replace(/\s+/g, ' ').replace(/(^|\s)\S/g, m => m.toUpperCase())
```

---

## 6) Async/Await & Error Handling

- Prefer **async/await** over deep `.then()` chains.
- **Always** handle errors (`try/catch` or `.catch()`).
- Run independent tasks in **parallel** with `Promise.all`.
- Return **safe fallbacks** where reasonable; log unexpected errors.

**Examples:**
```ts
// Sequential (when dependent)
try {
  const user = await api.getUser(id)
  const orders = await api.getOrders(user.id)
  return { user, orders }
} catch (err) {
  console.error('Load failed', err)
  return { user: null, orders: [] }
}
```

```ts
// Parallel (when independent)
const [profile, settings] = await Promise.all([
  api.getProfile(id),
  api.getSettings(id),
])
```

---

## 7) Clean Code Principles

- **DRY:** extract shared logic (utils/composables/hooks/services).
- **KISS:** keep solutions simple; avoid premature abstraction.
- **YAGNI:** don’t build features you “might” need later.
- **SOLID:** small focused modules; depend on abstractions; keep contracts small.

**Refactor example (DRY):**
```ts
// Before: duplicated phone formatting
function fmtA(p: string) { /* ... */ }
function fmtB(p: string) { /* ... */ }

// After: single source of truth
export function formatPhone(p: string) { /* ... */ }
```

---

## 8) ESLint + Prettier (Recommended Setup)

**.eslintrc.json**
```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
```

**.prettierrc**
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

**package.json (husky + lint-staged)**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 9) Modularization & Reusable Utilities

- One **component/class** per file.
- Group utilities by domain: `date.ts`, `number.ts`, `string.ts` (avoid a mega `utils.ts`).
- Keep modules **small** and **cohesive**; hide internals; export a minimal API.

**Example structure:**
```text
shared/
  utils/
    date.ts        # formatDate, parseDate
    number.ts      # roundTo, clamp
    string.ts      # toTitle, slugify
```

---

## 10) Imports, Exports & Barrels

- Prefer **named exports**; default export for components/pages if framework expects it.
- Keep imports ordered: external → internal (blank line between groups).
- Use **barrel files** (`index.ts`) to present a clean public API—avoid deep imports.

**Example (barrel):**
```ts
// shared/utils/index.ts
export * from './date'
export * from './number'
export * from './string'
```

```ts
// usage
import { formatDate, toTitle } from '@/shared/utils'
```

> Tip: Don’t create deep “barrels of barrels” that hide dependencies or cause circular imports.

---

## 11) Framework Notes

### Vue (SFC) & Nuxt 3
- Use **SFCs** with `<script setup>` or standard `<script>` consistently.
- Define **`props`** (typed) and **`emits`**; keep templates clean (move logic to computed/methods).
- Reuse logic via **composables** (`/composables/useX.ts`). Use **Pinia** for global state.
- Nuxt: use `pages/` for routes, `server/api/` for server endpoints.

**Example (Vue SFC):**
```vue
<script setup lang="ts">
defineProps<{ label: string; disabled?: boolean }>()
</script>

<template>
  <button class="btn" :disabled="disabled">{{ label }}</button>
</template>

<style scoped>
.btn { padding: .75rem 1rem; }
</style>
```

### React & Next.js
- Prefer **function components + hooks**. Name components in **PascalCase**.
- Keep state local; lift only when shared. For global state use Redux/Zustand/Context.
- Next: avoid browser APIs in server components; put API logic in `app/api` or `pages/api`.

**Example (React):**
```tsx
type ButtonProps = { label: string; disabled?: boolean }

export function Button({ label, disabled }: ButtonProps) {
  return <button disabled={disabled}>{label}</button>
}
```

### Angular
- Follow **Angular Style Guide**: feature modules, clear suffixes (`.component.ts`, `.service.ts`).
- Use **services** for business logic and HTTP; components for presentation.
- Prefer **Observables**; unsubscribe or use `async` pipe.

**Example (Angular service):**
```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  getUser(id: string) {
    return this.http.get<User>(`/api/users/${id}`)
  }
}
```

---

## 12) Example: Putting It All Together

```ts
// src/shared/services/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10_000,
})
```

```ts
// src/features/profile/services/profile.service.ts
import { api } from '@/shared/services/api'

export interface Profile {
  id: string
  email: string
  name: string
}

export async function fetchProfile(id: string): Promise<Profile> {
  const { data } = await api.get<Profile>(`/profiles/${id}`)
  return data
}
```

```ts
// src/shared/utils/string.ts
export const toTitle = (s: string) =>
  s.trim().replace(/\s+/g, ' ').replace(/(^|\s)\S/g, m => m.toUpperCase())
```

```tsx
// src/features/profile/components/ProfileCard.tsx (React)
import type { Profile } from '../services/profile.service'

export function ProfileCard({ name, email }: Pick<Profile, 'name' | 'email'>) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{email}</p>
    </article>
  )
}
```

```vue
<!-- src/features/profile/components/ProfileCard.vue (Vue) -->
<script setup lang="ts">
defineProps<{ name: string; email: string }>()
</script>

<template>
  <article>
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
  </article>
</template>
```

---

## 13) Checklists

**On every PR**
- [ ] ESLint/Prettier clean; no unused code.
- [ ] Clear names; small focused functions; no duplication.
- [ ] Types explicit on public APIs; no `any` without reason.
- [ ] Async paths handle errors; tests updated if behavior changed.

**Before release**
- [ ] No deep imports; barrels or public APIs used.
- [ ] Module boundaries respected (UI vs logic vs state).
- [ ] Bundle size and accessibility checks passed.

---

## Key Takeaways

- Write **predictable**, **typed**, **small**, and **tested** code.
- Keep **UI**, **logic**, **state**, **routes**, and **styles** separated.
- Let tools (ESLint/Prettier) do the **consistency** work.
- Prefer **feature-first** layout and **reusable** utilities/composables/hooks.

Clean code is a **force multiplier**—it speeds onboarding, reduces bugs, and makes features faster to ship.
