---
title: Component Design
---

# Component Design

Components are the **building blocks** of a Vue application. Well-designed components are reusable, testable, and easy to maintain.

---

## General Principles

- **Single Responsibility** → a component should do **one thing well**.  
- **Reusability** → extract logic into components/composables when repeated.  
- **Clarity** → keep component APIs (props, emits, slots) simple and predictable.  
- **Consistency** → follow naming conventions and patterns across the app.  

---

## Naming & Structure

- Use **PascalCase** for component names → `UserCard.vue`.  
- Use **kebab-case** in templates → `<user-card />`.  
- Prefix **base components** with `Base` or `App` → `BaseButton.vue`, `AppModal.vue`.  
- Place reusable UI components in `src/components/`.  
- Feature-specific components live inside their feature folder (`views/feature-name/`).

---

## Props

- Define props with **types and defaults**.  
- Keep prop names **descriptive** and **camelCase**.  
- Avoid deeply nested objects → prefer simple props or use a single `config` object.  

```ts
props: {
  title: { type: String, required: true },
  isActive: { type: Boolean, default: false }
}

## Events (Emits)
- Use `emits: ['update:modelValue', 'submit']` for explicit event definitions.
- Follow naming convention: use `update:*` for two-way binding.
- Document emitted events in comments.

## Slots
- Use slots for flexible layouts.
- Prefer **named slots** when multiple sections exist.
- Example:
  ```vue
  <BaseCard>
    <template #header>Profile</template>
    <template #default>User info here</template>
    <template #footer>Actions</template>
  </BaseCard>
  ```

## Composition vs. Options API
- Use **Composition API** for reusable logic and scalability.
- For small/simple apps, **Options API** is fine — stay consistent.
- Extract common logic into **composables** (`/composables/`).

## Performance Practices
- Break large components into smaller ones → improves reusability and rendering speed.
- Use `v-if` vs `v-show` appropriately:
  - `v-if` → conditional rendering (element **not** in DOM).
  - `v-show` → toggle visibility (element **always** in DOM).
- Use **lazy loading** for route-based components.

## Testing & Maintainability
- Keep components under **300 lines** → split if growing too large.
- Write **unit tests** for components with critical logic.
- Document **props, events, and slots** in the code or a Storybook-like tool.

## Benefits of Good Component Design
- **Reusability** → saves time by reducing duplication.
- **Scalability** → easy to add new features without rewriting.
- **Readability** → smaller, focused components are easier to understand.
- **Performance** → optimized rendering and smaller DOM trees.
- **Maintainability** → modular code is easier to debug and extend.
- **Collaboration** → clear contracts (props, emits) reduce confusion in teams.

## Key Takeaway
Components are contracts: clear inputs (**props**), outputs (**events**), and **slots**.  
A well-designed component can be reused across projects, saving development time and effort.
