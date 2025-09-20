---
title: Accessible CSS Patterns
description: Design inclusive interfaces by focusing on contrast, motion preferences, color schemes, semantics, and focus management.
sidebarDepth: 2
tags:
  - css
  - accessibility
  - contrast
  - motion
  - color-scheme
---

# Accessible CSS Patterns

Accessibility is essential for inclusive design. This chapter explores how CSS can enhance or hinder accessibility, covering color contrast, motion, semantics, focus indicators, reduced transparency, and dark modes.

## Table of Contents
- [Color Contrast & Focus Indicators](#color-contrast--focus-indicators)
- [Motion & User Preferences](#motion--user-preferences)
- [Reduced Transparency & Contrast](#reduced-transparency--contrast)
- [Semantic Roles & Ordering](#semantic-roles--ordering)
- [Prefers Color Scheme & Themes](#prefers-color-scheme--themes)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Color Contrast & Focus Indicators

Ensure sufficient contrast ratios (AA or AAA) between text and background. Use tools or `color-contrast()` to compute accessible colors. Provide clear focus indicators using `outline` or `box-shadow`.

```css
.focusable {
  outline: none;
}
.focusable:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}

/* Use color-contrast() when supported */
.alert {
  color: color-contrast(white vs var(--alert-bg));
  background: var(--alert-bg);
  padding: 1rem;
}
```

```html
<button class="focusable">Focus Me</button>
<div class="alert" style="--alert-bg: #c00">High contrast alert</div>
```

## Motion & User Preferences

Reduce or disable animations for users with vestibular disorders using the `prefers-reduced-motion` media feature. Provide alternate transitions or static states【32771850075209†L190-L221】.

```css
@media (prefers-reduced-motion: reduce) {
  .animating {
    animation: none !important;
    transition: none !important;
  }
}

.animating {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

```html
<div class="animating">Spinning icon that stops when motion reduction is requested.</div>
```

## Reduced Transparency & Contrast

The `prefers-reduced-transparency` media feature indicates users prefer less transparency. Reduce blur/backdrop effects to avoid motion and readability issues. Similarly, `prefers-contrast` allows increasing contrast.

```css
@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: rgba(255,255,255,.9);
    backdrop-filter: none;
  }
}

@media (prefers-contrast: more) {
  :root { --contrast-factor: 1.2; }
}
```

```html
<div class="glass" style="backdrop-filter: blur(10px)">Frosted panel</div>
```

## Semantic Roles & Ordering

CSS should not change the semantic order: avoid reordering content visually using `order` or `grid-template-areas` without updating the DOM for assistive technologies. Use ARIA roles to indicate states (`role="alert"`) and ensure hidden content (`display:none`) is removed from accessibility tree.

```css
.reordered {
  display: flex;
  flex-direction: column;
}
@media (min-width: 40rem) {
  .reordered {
    flex-direction: row;
  }
}
```

```html
<div class="reordered">
  <main id="main">Main Content</main>
  <aside id="sidebar">Sidebar</aside>
</div>
```

The DOM order remains the same on both mobile and desktop. Avoid reordering via CSS alone because screen readers follow DOM order.

## Prefers Color Scheme & Themes

Use the `prefers-color-scheme` media feature to serve dark or light themes. Provide accessible color palettes for each mode and use `color-scheme` property to let the browser adjust form controls.

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --bg: #000;
    --fg: #eee;
  }
}
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
    --bg: #fff;
    --fg: #222;
  }
}

body {
  background: var(--bg);
  color: var(--fg);
}
```

```html
<body>Theme toggles automatically based on the user’s OS setting.</body>
```

## Gotchas & Best Practices
- Don’t rely solely on color to convey information; use icons or text labels.
- Provide focus outlines that stand out against the background.
- Avoid excessive use of animations; respect `prefers-reduced-motion`【32771850075209†L190-L221】.
- Keep DOM order consistent with visual order for assistive technologies.
- Test color themes with contrast checkers and in different lighting conditions.

## Quick Cheatsheet
- **Contrast**: meet WCAG 2.1 AA (4.5:1 for text) or AAA (7:1).
- **Focus**: use `:focus-visible` and avoid removing outlines.
- **Motion**: `@media (prefers-reduced-motion: reduce)`【32771850075209†L190-L221】.
- **Transparency**: `prefers-reduced-transparency: reduce`.
- **Color Scheme**: `prefers-color-scheme: dark | light` with `color-scheme` property.

## Practice Tasks
1. Implement a high-contrast mode toggle using CSS custom properties and test with color-contrast functions.
2. Add focus-visible styles to all interactive elements in a form.
3. Build a component that responds to `prefers-reduced-transparency` by removing blur effects.
4. Ensure DOM order matches visual order in a responsive layout that switches from column to row.

## Review Questions
1. Why is it important to maintain high contrast for text and UI elements?
2. How does `prefers-reduced-motion` contribute to accessibility【32771850075209†L190-L221】?
3. What are the risks of reordering content with CSS alone?
4. Describe how the `color-scheme` property affects form controls.
5. How can CSS respond to users who require reduced transparency or increased contrast?

## Related Links
- [/css/04-responsive-design.md](/css/04-responsive-design.md)
- [/css/10-expert-topics.md](/css/10-expert-topics.md)
- [/css/12-color-systems-and-theming.md](/css/12-color-systems-and-theming.md)

