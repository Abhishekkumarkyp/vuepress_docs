# Vue 3 & Front‑End Foundations for the Brightly Interview

This document summarises the key front‑end topics you should understand for Brightly’s software‑engineer interview.  It emphasises modern Vue 3 idioms and broader UI concerns.

## Vue 3 concepts

### Composition API versus Options API

* **Composition API is the default** – as of 2025 the Vue community treats the Composition API as the standard approach for new codebases because it allows better modularity, re‑use and scalability.  A 2025 overview notes that by this time the Composition API has become the *de‑facto standard* for new Vue projects【787629814344079†L49-L55】.  Its syntax encourages grouping related logic in composables instead of scattering code across component options.  
* **Options API still has a role** – the same overview cautions that teams may keep Options‑API components in small or legacy parts of the codebase until a migration plan is in place【787629814344079†L49-L55】.  You may encounter both styles during maintenance work, so understand how props, data, methods and lifecycle hooks map to the new API.

### TypeScript integration

Vue 3 ships with built‑in typings and strong inference.  A 2025 performance article states that Vue’s TypeScript support is **robust** and integrated into IDE tooling【787629814344079†L58-L62】.  However, complex configurations or third‑party libraries can introduce type conflicts【787629814344079†L58-L62】.  When building projects:

* Enable `strict` mode and use `defineProps`/`defineEmits` to infer prop and event types.
* Check the typings of external libraries and provide `.d.ts` shims where necessary.
* Use `vue-tsc --noEmit` in your CI pipeline to catch type errors.

### State management (Pinia / Vuex)

The job description calls for expertise in Vuex; however Pinia is the officially recommended store for Vue 3.  Both provide a centralised reactive store that components can read from and dispatch actions/mutations to.  Key points to learn:

* **Pinia advantages** – smaller API surface, TypeScript‑friendly, supports multiple stores and hot‑module reloads, and integrates with devtools.
* **Module patterns** – organise state into modules (e.g., assets, work orders) with getters for derived data and actions for side effects.  Use persistent caches for API data and normalise lists (`ids` + `byId` maps).
* **When to use global state** – shared data (user profile, auth tokens, feature flags) or caches accessed by multiple pages.  Keep UI state local to components.

### New/experimental features

* **Vapor Mode** – an experimental compilation mode that removes the virtual DOM and writes DOM updates directly.  The 2025 article explains that Vapor Mode bypasses the virtual DOM for direct manipulations to reduce runtime overhead【787629814344079†L100-L110】.  It yields leaner bundles and faster updates in high‑frequency UIs but is marked experimental and does not yet support all Vue features【787629814344079†L102-L107】.  Treat it as a performance experiment rather than a default.
* **Vue DevTools & Nuxt Inspector** – modern devtools (v6+) visualise component hierarchies, Pinia state and performance metrics【787629814344079†L93-L95】.  Learn to profile component re‑renders and memory usage.

## UI frameworks & responsive design

Brightly’s JD mentions frameworks such as Vuetify and Bootstrap.  A few pointers:

* **Component libraries** – Vuetify implements the Material Design specification and provides ready‑made form elements, dialogs, data tables and layout grids.  Learn how to customise themes (light/dark, colours) and use slots for more control.  Bootstrap Vue or PrimeVue offer alternative ecosystems with prebuilt tables and forms.
* **Responsive layout** – master CSS Grid and Flexbox to build layouts that adapt from desktop to mobile.  Breakpoints, fluid grids and utility classes (e.g., Tailwind) allow you to respond to different screen sizes.  Component libraries often include grid systems.
* **Accessibility** – the JD calls out WCAG 2.1 compliance.  Use semantic HTML and ARIA roles where needed:
  - **Label every control** – W3C’s tutorial emphasises associating text with form controls using the `<label>` element; the `for` attribute should match the control’s `id`【203699859864384†L114-L129】.  This ensures assistive technologies can announce the purpose of each field【203699859864384†L119-L123】.
  - **Group related controls** – group radio buttons, checkboxes or related fields using `<fieldset>` with a `<legend>` heading【413774320386901†L110-L118】.  This helps users understand that the controls belong together and allows screen readers to announce group names.
  - **Instructions and errors** – link inline hints or error messages to inputs using `aria-describedby`.  Provide keyboard navigation (Tab order), visible focus indicators, and avoid relying on colour alone.  WCAG requires contrast ratios of at least 4.5:1 for normal text.

## Performance and best practices

* **Avoid unnecessary re‑renders** – stabilise object/array identities in templates, use `shallowRef` for large datasets, and employ virtual scrolling for large lists.
* **Code splitting** – configure Vite (or webpack) to split routes and heavy components into separate chunks.  Dynamic imports reduce initial bundle size.
* **Tree‑shaking** – import only the needed components from libraries (e.g., `import { VTextField } from 'vuetify/components'`) to avoid pulling in the whole bundle.
* **DevTools profiling** – learn to read Flame Charts and highlight slow components.  The `Performance` panel in Chrome DevTools shows timeline events and paints; the `Memory` panel helps detect leaks.

Understanding these concepts will help you speak confidently about building modern, accessible and performant front ends with Vue 3.