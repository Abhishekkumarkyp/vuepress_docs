---
title: Coding Practices
---

# Coding Practices

Clean and consistent code is easier to read, debug, and maintain. Following a set of agreed-upon practices helps teams collaborate efficiently and reduces long-term technical debt.

---

## General Principles

- **Readability over cleverness**  
  Always prefer clear, self-explanatory code instead of “smart” but confusing tricks.

- **Consistency across the team**  
  Stick to the same style guides, naming conventions, and formatting rules.

- **Simplicity first**  
  Don’t over-engineer. Solve the problem with the simplest approach that works.

- **Fail fast**  
  Write defensive code that surfaces errors early, rather than hiding them.

---

## Naming Conventions

- **Variables & functions** → `camelCase`  
- **Components** → `PascalCase` (`UserCard.vue`)  
- **Constants & enums** → `UPPER_SNAKE_CASE`  
- **Directories & files** → `kebab-case` (`user-profile/`)  
- **Private methods** → prefix with `_` (only if team agrees)

---

## JavaScript & TypeScript

- Prefer **TypeScript** for type safety and maintainability.
- Use **ES6+ features**: arrow functions, template literals, destructuring.
- Avoid global variables → encapsulate in modules or composables.
- Use **async/await** instead of raw promises for readability.
- Always handle errors → `try/catch` around async logic.

---

## Vue-Specific Practices

- Keep components **small & focused** → each should do one thing well.
- Use **Props for input** and **Events/Emit for output**.  
- Prefer **Composition API (Vue 3)** for scalability, but stay consistent if the team uses Options API.  
- Separate **template, script, and style** clearly in `.vue` files.  
- Use **slots** for flexibility instead of hard-coding layouts.

---

## Comments & Documentation

- Comment **why**, not **what** (the code already shows “what”).  
- Use JSDoc/TSDoc for complex functions and APIs.  
- Keep comments updated during refactors — outdated comments are worse than none.

---

## Code Formatting & Tools

- Use **Prettier** for consistent formatting.  
- Use **ESLint** (with Vue/TS plugins) to enforce code standards.  
- Run linters and tests in CI/CD pipelines.  
- Use **Git hooks** (e.g., Husky) to prevent bad commits.

---

## Benefits of Good Coding Practices

- **Improved readability** → new developers can onboard faster.  
- **Fewer bugs** → type safety and linting catch issues early.  
- **Team alignment** → everyone writes code that looks familiar.  
- **Scalability** → easier to expand projects without confusion.  
- **Maintainability** → code can evolve without breaking everything.  
- **Professionalism** → clean code reflects well in audits and reviews.

---

## Key Takeaway

> Code is read more often than it is written. Prioritize **clarity, consistency, and simplicity** so your project remains healthy as it grows.
