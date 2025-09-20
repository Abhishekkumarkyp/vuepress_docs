---
title: CSS Styling & Theming
---

# CSS Styling & Theming

CSS defines the **look and feel** of your application. A consistent, scalable styling approach ensures your UI is professional, maintainable, and adaptable across devices.

---

## General Principles

- Follow a **design system** → colors, typography, spacing, and components should be standardized.  
- Prefer **utility-first or token-based styles** over ad-hoc inline styles.  
- Keep **global styles minimal** → most styles should live with components.  
- Use **class-based styling**, avoid using IDs for styling.  

---

## CSS Architecture

- Organize styles using one of these approaches:  
  - **BEM (Block Element Modifier)** → predictable class naming.  
  - **Atomic/Utility CSS** → Tailwind-like, or custom utility classes.  
  - **Scoped Component Styles** → keep styles close to the component in `.vue` files.  

- Maintain **design tokens** in a central place (`styles/tokens.scss` or `:root` CSS variables).  
  - Colors (`--color-primary`, `--color-secondary`)  
  - Typography (`--font-size-sm`, `--font-size-lg`)  
  - Spacing (`--spacing-sm`, `--spacing-lg`)  

---

## Theming

- Use **CSS variables** (`:root { --brand: #042b6c; }`) for theming.  
- Support **light/dark mode** via variable overrides.  
- Keep theme definitions in **separate files** (e.g., `theme-light.css`, `theme-dark.css`).  
- Use a **ThemeProvider component** or global class toggle (`.theme-dark`) to apply themes.

---

## Responsiveness

- Always design **mobile-first** → use `min-width` media queries.  
- Use **relative units** (`em`, `rem`, `%`) instead of fixed `px` where possible.  
- Define **breakpoints** consistently (e.g., 640px, 960px, 1200px).  
- Use **flexbox & grid** for layouts → avoid floats.  

---

## CSS in Vue

- Prefer **scoped styles** to avoid unintended side effects.  
- Use **CSS Modules** or **PostCSS** for large-scale projects.  
- Import global tokens/utilities in `main.ts`.  
- Use `:deep()` for styling child components selectively.  

---

## Performance Best Practices

- Remove unused CSS (tree-shaking via PurgeCSS or Vite plugins).  
- Avoid large background images → compress or replace with SVG.  
- Minimize use of animations on **layout-affecting properties** (e.g., `top`, `left`) → prefer `transform` and `opacity`.  
- Leverage **browser caching** for static assets.  

---

## Benefits of Good CSS Practices

- **Consistency** → UI looks uniform across pages and components.  
- **Scalability** → new themes and styles can be added easily.  
- **Maintainability** → well-structured styles reduce conflicts and overrides.  
- **Performance** → optimized CSS improves load times and responsiveness.  
- **Accessibility** → correct contrast ratios and responsive design support all users.

---

## Key Takeaway

> Treat CSS as a **system**, not decoration.  
> A consistent styling strategy leads to a UI that is professional, accessible, and easy to maintain.
