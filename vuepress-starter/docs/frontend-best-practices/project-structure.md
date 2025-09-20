---
title: Project Structure
---

# Project Structure

Organizing your project well ensures **discoverability**, **scalability**, and **team collaboration**. A clear directory structure helps new developers onboard faster and reduces technical debt.

## Recommended Directory Layout

```text
src/
  assets/        # images, fonts, icons
  language/      # i18n JSON files (en.json, hi.json, etc.)
  components/    # reusable UI components
  views/         # route-level pages (mapped to router)
  router/        # application routes
  store/         # Vuex/Pinia modules
  services/      # API clients, axios instances, interceptors
  utils/         # helper functions
  styles/        # global CSS/SCSS, design tokens, variables
  directives/    # reusable Vue directives
  composables/   # Vue 3 composition utilities
App.vue
main.ts
