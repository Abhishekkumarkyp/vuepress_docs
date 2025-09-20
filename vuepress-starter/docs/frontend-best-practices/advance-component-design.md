---
title: Component Design
---

# Component Design Best Practices (Vue · React · Angular · Next.js · Nuxt)

Designing components well leads to **reusability, scalability, and maintainability**. This guide distills cross‑framework best practices with examples and copy‑paste snippets. It’s formatted for VuePress (front‑matter + headings + code blocks).

---

## What Is a Component?

A component encapsulates UI (markup + styles) and its logic behind a clear interface.

**React (functional):**
```jsx
function HelloMessage({ name }) {
  return <div>Hello, {name}!</div>;
}
```

**Vue (Single File Component):**
```vue
<template>
  <div>Hello, {{ name }}!</div>
</template>

<script>
export default { props: { name: String } };
</script>
```

**Angular (class + template):**
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello-message',
  template: `<div>Hello, {{ name }}!</div>`
})
export class HelloMessageComponent {
  @Input() name!: string;
}
```

---

## 1) Component Architecture

### Single Responsibility
- Each component should represent **one coherent piece of UI**.
- If it grows large or handles multiple concerns, **split** into smaller subcomponents (e.g., `UserProfileHeader`, `UserProfileDetails`).

### Compose Hierarchically
- Build larger UIs by **composing** smaller components (tree of components).
- “Boxes on a wireframe” → each box can be a component.

### Presentational vs. Container
- **Presentational (UI)**: purely render based on inputs/props.
- **Container (Smart)**: fetch data, manage state, pass to presentational children.
- Works well in all frameworks (React, Vue, Angular) and meta‑frameworks (Next/Nuxt).

### Atomic Mindset
- Think **Atoms → Molecules → Organisms → Pages** to promote consistency and reuse.

### Prefer Composition Over Inheritance
- Reuse via **slots/children, hooks/composables, services, content projection** instead of subclassing.

---

## 2) Reusability

- **Encapsulate + Parametrize**: expose configuration via **props/inputs** and callbacks.
- **Slots / Children** for flexible layouts (e.g., `<Modal><Form/></Modal>`).
- **Avoid Premature Abstraction**: don’t over‑generalize until a real reuse emerges.
- **Extract Reusable Logic**:
  - React: custom **hooks**.
  - Vue: Composition API **composables**.
  - Angular: **services** (injectables), directives.
- **Document Components** (Storybook or docs) so others can discover and use them.

**Example (React & Vue table):**
```jsx
// React
<DataTable rows={rows} onRowSelect={setSelected} />
```

```vue
<!-- Vue -->
<DataTable :rows="rows" @row-select="onSelect" />
```

---

## 3) Scalability

- **Organize by Feature/Domain** (high cohesion):
  - `features/orders/`, `features/users/` each with components, services, tests.
- Or **Layered** for smaller apps (shared components, pages, store, services), but be consistent.
- **Avoid Deep Prop Drilling**: consider context/provide‑inject/store.
- **Lazy Load** heavy routes/components:
  - React/Next: `React.lazy` / dynamic import.
  - Vue/Nuxt: `defineAsyncComponent`, route code‑splitting.
  - Angular: router **lazy‑loaded modules**.
- **Plan State Management** early (Redux/Context, Pinia/Vuex, Angular services).
- **Watch Component Size**: if it’s getting big or many props → split or extract.

**Example feature‑first (generic):**
```
src/
  features/
    users/
      components/
      services/
      pages/
    orders/
      components/
      services/
      pages/
  shared/
    components/
    utils/
    styles/
```

---

## 4) Naming Conventions

- **PascalCase** for components (files and symbols): `UserProfileCard`.
- **Multi‑word names** (avoid `<Item>`): e.g., `TodoItem`, `AppHeader`.
- **Prefixes** when useful (Angular selector `app-…`, Vue `BaseButton`, `TheHeader`).
- **Props**: clear names; bools as adjectives (`isOpen`, `disabled`).
- **Events/outputs**: describe action (`submit`, `select`, `saveCompleted`).

---

## 5) Folder & File Organization

- **One component per file**.
- **Co‑locate** related files (TS/JS, template, style) per component.
- **Separate shared vs feature components** to avoid giant folders.

**Typical structure (Vue/React/Next/Nuxt):**
```
src/
  components/        # shared UI
  pages/ (or views/) # route-level
  layouts/
  store/             # state
  services/          # API/business
  utils/
  assets/
  styles/
```

**Angular (feature modules):**
```
src/app/
  users/
    users.module.ts
    components/
    services/
    pages/
  orders/
    orders.module.ts
    components/
    services/
    pages/
```

---

## 6) Props & Data Flow

### One‑Way Data (Props Down, Events Up)
- **Props/Inputs are read‑only** in children.
- Children **emit events / call callbacks** to notify parents.

**Vue example: controlled input**
```vue
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script>
export default { props: { modelValue: String } };
</script>
```

**React example: controlled input**
```jsx
function UsernameInput({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
```

**Angular example: child emits change**
```ts
@Output() valueChange = new EventEmitter<string>();
onInput(v: string) { this.valueChange.emit(v); }
```

### Tips
- Avoid **prop drilling** (use context/provide‑inject/store).
- Keep prop interfaces **minimal & typed** (TS, PropTypes, Vue prop options).
- Use two‑way binding **sparingly** (only for form‑like controls).

---

## 7) Separation of Concerns

- Keep components **UI‑focused**; move heavy logic to hooks/composables/services.
- Limit complex expressions in templates/JSX—compute in code, render simply.
- Use proper lifecycle hooks for side effects (fetching, subscriptions).
- Scope styles (scoped CSS, CSS Modules, Angular view encapsulation).

**Example (React, extract logic):**
```jsx
function useFilteredProducts(products, q, sort) {
  return useMemo(() => applyFilterAndSort(products, q, sort), [products, q, sort]);
}
```

---

## 8) Internal Code Organization

- Consistent order:
  - **React:** state/hooks → effects → handlers → render.
  - **Vue:** props → state → computed → methods → lifecycle → template.
  - **Angular:** inputs/outputs → DI/constructor → lifecycle → public → private.
- Name handlers by **intent** (`saveUser`, `submitForm`) not UI detail (`onBtnClick`).
- Break large functions into **small helpers**.
- Keep files tidy; refactor regularly.

---

## 9) Maintainability

- Enforce **team conventions** (ESLint/TS/Prettier + framework rules).
- Document props/events and edge states (loading, empty, error).
- **Test** components (RTL/Jest, Vue Test Utils, Angular TestBed).
- Optimize when needed (React `memo`, Angular `OnPush`, computed/memoized values)—avoid premature complexity.
- Review PRs for size, clarity, and adherence to patterns.

---

## Component Review Checklist

- [ ] Single responsibility, good name
- [ ] Clear props/inputs (typed), minimal surface
- [ ] One‑way data flow; events/callbacks well‑named
- [ ] Logic split into hooks/composables/services where appropriate
- [ ] Reasonable size; consider splitting if large
- [ ] Lazy‑loaded when heavy / route‑level
- [ ] Styles scoped; RTL and theming considered if applicable
- [ ] Tests for key behaviors and edge cases
- [ ] Docs/Storybook entry updated

---

## Conclusion

Across Vue, React, Angular, Next.js, and Nuxt, the essence of great component design is the same: **small, focused, composable components; clear data flow; consistent naming and structure; and separation of concerns**. Apply these patterns consistently and your UI will scale smoothly with your product and team.
