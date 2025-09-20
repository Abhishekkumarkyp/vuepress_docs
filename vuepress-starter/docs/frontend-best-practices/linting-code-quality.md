---
title: Linting & Code Quality
---

# Linting & Code Quality

Linting and formatting tools help maintain **consistent, readable, and error-free code** across the team. Code quality practices reduce bugs, improve collaboration, and keep technical debt under control.

---

## General Principles

- **Automate consistency** → don’t rely on developers remembering style rules.  
- **Fail fast** → catch issues before they reach production.  
- **Team-wide alignment** → everyone follows the same coding standards.  
- Integrate linting into **CI/CD pipelines** for continuous enforcement.  

---

## Tools & Setup

### ESLint
- Enforce JavaScript/TypeScript best practices.  
- Use official plugins:  
  - `eslint-plugin-vue` for Vue.  
  - `@typescript-eslint/eslint-plugin` for TypeScript.  

Example config (`.eslintrc.js`):
```js
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
