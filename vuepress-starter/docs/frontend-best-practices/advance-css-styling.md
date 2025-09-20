---
title: CSS Styling & Theming
---

# CSS Styling and Theming Best Practices in Modern Frontend Frameworks

Modern frontend development demands **scalable, maintainable CSS** that works consistently across frameworks like **Vue, React, Angular, Next.js, and Nuxt**. This guide outlines best practices for styling and theming – from organizing CSS and naming classes to theming for light/dark modes – with practical tips and examples.

## Overview of CSS Styling Strategies

- **Global Styles**: Useful for base elements but risk conflicts.
- **Scoped/Encapsulated Styles**: Use `<style scoped>` in Vue, Angular’s ViewEncapsulation, etc.
- **Modular CSS**: CSS Modules that generate unique class names.
- **Utility-First CSS**: e.g. Tailwind classes for rapid styling.
- **CSS-in-JS**: Styled-components, Emotion for dynamic styles.

---

## Naming Conventions and Methodologies

- **BEM (Block Element Modifier)** – `card`, `card__img`, `card--featured`.
- **SMACSS** – Base, Layout, Module, State, Theme.
- **Atomic Design** – Atoms, Molecules, Organisms, Templates, Pages.

---

## Best Practices for Component-Level Styles

- Encapsulate styles with components (SFCs, CSS Modules).
- Keep global styles minimal (base resets, typography).
- Use framework features for isolation (scoped, encapsulation).
- Share variables and tokens (CSS vars, SCSS variables).
- Keep selectors simple and avoid deep nesting.

---

## Using CSS Variables and Custom Properties for Theming

- Define tokens in `:root`:
```css
:root {
  --color-primary: #3FE79E;
  --color-bg: #0F0235;
  --color-text: #F5F5F3;
}
```
- Switch themes with `.dark` class or `prefers-color-scheme` media query.
- Override at component level with variables for contextual theming.

---

## Theming Strategies (Light/Dark Mode, Tokens)

- Use design tokens as source of truth.
- Light/dark mode via CSS vars + `prefers-color-scheme`.
- Multiple themes with root classes (`.theme-default`, `.theme-ocean`).
- For libraries, expose CSS variables instead of scoped styles.

---

## Scalable CSS Architecture

- Choose methodology (BEM, SMACSS, ITCSS).
- Modularize by feature/component.
- Layer styles: Settings → Tools → Base → Layout → Components → Utilities.
- Use build tools: PostCSS (autoprefixer, cssnano).
- Maintain design systems for consistency across apps.

---

## Framework-Specific Tips

### Vue.js
- Use `<style scoped>` in SFCs.
- Global styles only in `App.vue` or layouts.
- CSS Modules with `<style module>` or separate `.module.css`.

### React
- Use CSS Modules in CRA/Next.
- CSS-in-JS (styled-components, Emotion) for dynamic styles.
- Tailwind integrates seamlessly.

### Angular
- Default ViewEncapsulation is recommended.
- Global styles only for resets, tokens.
- Avoid `::ng-deep` (deprecated).

### Next.js
- Global CSS via `_app.js` or layouts.
- Use `.module.css` for components.
- Built-in styled-jsx, Tailwind, SCSS support.

### Nuxt.js
- Configure global styles in `nuxt.config.js`.
- Scoped `<style>` for components, unscoped loads only when component is used.
- Style-resources for global SCSS injection.

---

## Preprocessors (SCSS, PostCSS)

- **Sass/SCSS**: variables, nesting, mixins for DRY code.
- **PostCSS**: autoprefixer, postcss-preset-env for modern features.
- Use Stylelint for consistent code quality.

---

## Accessibility and Responsive Design

- **Focus indicators** must be visible.
- Maintain color contrast.
- Use flexible units (`rem`, `vw`, `%`) for responsive design.
- Prefer mobile-first media queries.
- Respect `prefers-reduced-motion`.

---

## Code Examples

### BEM Example
```html
<div class="card card--featured">
  <h2 class="card__title">Article Title</h2>
  <button class="card__button card__button--disabled">Read</button>
</div>
```

### CSS Variables for Theming
```css
:root { --bg: #fff; --text: #000; }
.dark { --bg: #121212; --text: #e0e0e0; }
body { background: var(--bg); color: var(--text); }
```

### Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

### Accessibility: Focus
```css
:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

---

## Key Takeaways

- Keep CSS **scoped, modular, and token-driven**.
- Use CSS variables for **theming and adaptability**.
- Follow consistent methodologies (BEM, SMACSS).
- Test for **a11y and responsive design**.
- Adapt to each framework’s styling features.
