---
title: UI Theming
---

# UI Theming

Theming defines the **visual identity** of your application. A consistent theme ensures brand alignment, accessibility, and a professional look across the product.

---

## General Principles

- Define **design tokens** (colors, typography, spacing, shadows) in a central place.  
- Support **light and dark modes** via CSS variables.  
- Use **semantic naming** for tokens (`--color-primary`, `--color-success`) instead of raw color names.  
- Keep themes **scalable** so new brand guidelines can be applied easily.  

---

## Folder Structure

```text
src/
  styles/
    tokens.scss      # design tokens
    theme-light.scss # light mode
    theme-dark.scss  # dark mode
```

Design Tokens
```css
:root {
  --color-primary: #042b6c;
  --color-secondary: #ff9800;
  --color-success: #4caf50;
  --font-family-base: 'Inter', sans-serif;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}
```
Light/Dark Mode Support

```css
:root.theme-light {
  --color-bg: #ffffff;
  --color-text: #000000;
}

:root.theme-dark {
  --color-bg: #121212;
  --color-text: #ffffff;
}
```

Component-Level Theming

```vue
<template>
  <button class="btn">{{ label }}</button>
</template>

<style scoped>
.btn {
  background-color: var(--color-primary);
  color: var(--color-text);
  padding: var(--spacing-md);
}
</style>
```
