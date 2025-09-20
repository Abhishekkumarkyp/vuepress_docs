---
title: Color Systems & Theming
description: Explore modern color models, palette generation, dark and light theming, accent-color, and CSS color functions for sophisticated design.
sidebarDepth: 2
tags:
  - css
  - colors
  - theming
  - color-spaces
  - accent-color
---

# Color Systems & Theming

Color plays a pivotal role in design. This chapter unpacks modern color models, palette generation, dark/light theme strategies, and the `accent-color` property. Learn to use LCH, OKLCH, and color functions for accessible, consistent designs.

## Table of Contents
- [Color Models & Spaces](#color-models--spaces)
- [Palette Generation & Scales](#palette-generation--scales)
- [Theming with Custom Properties](#theming-with-custom-properties)
- [Dark Mode & Light Mode Strategies](#dark-mode--light-mode-strategies)
- [Accent Color & UI Component Theming](#accent-color--ui-component-theming)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Color Models & Spaces

CSS now supports LCH, OKLCH, LAB, and HSL, each with unique properties. LCH and OKLCH are perceptually uniform, meaning equal changes in value appear consistent to the human eye. Use them with `color()` or direct functions.

```css
.primary {
  --base: oklch(60% 0.2 250);
  color: var(--base);
}
.warning {
  color: lch(70% 0.2 20);
}
```

```html
<p class="primary">OKLCH color example</p>
<p class="warning">LCH warning color</p>
```

Use `color-mix()` and `color-contrast()` to compute dynamic colors.

## Palette Generation & Scales

Generate color scales by mixing base colors with white/black or shifting hue/lightness. Use loops in preprocessors or define scales manually.

```css
:root {
  --blue-1: oklch(95% 0.02 260);
  --blue-2: oklch(85% 0.04 260);
  --blue-3: oklch(75% 0.06 260);
  --blue-4: oklch(65% 0.08 260);
}

.btn {
  background: var(--blue-3);
  color: white;
}
.btn:hover { background: var(--blue-4); }
```

```html
<button class="btn">OKLCH Button</button>
```

Tools like HSLuv, LCH generator, or design systems (Tailwind, Material) help produce balanced palettes. Always check contrast ratios.

## Theming with Custom Properties

Use custom properties to define themes. Override them in dark mode or at component scope. Combine with `@property` to register animatable color variables.

```css
:root {
  --color-bg: oklch(98% 0.02 250);
  --color-fg: oklch(20% 0.03 260);
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: oklch(20% 0.03 260);
    --color-fg: oklch(95% 0.02 250);
  }
}
body {
  background: var(--color-bg);
  color: var(--color-fg);
}
```

```html
<div>Theme based on OKLCH colors</div>
```

## Dark Mode & Light Mode Strategies

There are multiple strategies: toggles, OS-based detection (`prefers-color-scheme`), or automatic theme generation via `color-mix()`. Provide neutral backgrounds and test content legibility. Use `color-scheme` property for form controls.

```css
html {
  color-scheme: light dark;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  cursor: pointer;
}
.switch input {
  appearance: none;
  width: 2rem;
  height: 1rem;
  background: var(--track, #ccc);
  border-radius: 1rem;
  position: relative;
}
.switch input::before {
  content: "";
  position: absolute;
  left: 0; top: 0;
  width: 1rem; height: 1rem;
  background: var(--thumb, #fff);
  border-radius: 50%;
  transform: translateX(0);
  transition: transform .2s ease;
}
.switch input:checked::before { transform: translateX(1rem); }
```

```html
<label class="switch">
  <input type="checkbox" onchange="document.documentElement.classList.toggle('dark', this.checked)">
  Toggle Theme
</label>
```

## Accent Color & UI Component Theming

The `accent-color` property colors form controls (checkboxes, range sliders) according to your theme. Combine with CSS custom properties.

```css
:root {
  --accent: oklch(60% 0.2 200);
}
input[type="range"] {
  accent-color: var(--accent);
}
```

```html
<input type="range" value="50">
```

## Gotchas & Best Practices
- Some color functions are experimental; always provide sRGB fallbacks.
- Use perceptually uniform spaces (LCH/OKLCH) for mixing to ensure consistent brightness and saturation.
- Test color palettes on different monitors and in dark/light modes.
- Don’t forget to update color tokens in components when themes change.
- Always check contrast ratios in both dark and light themes.

## Quick Cheatsheet
- **Color Spaces**: `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`.
- **Functions**: `color-mix()`, `color-contrast()`, `relative-color()`.
- **Theming**: custom properties, `prefers-color-scheme`, toggles.
- **Accent**: `accent-color` for form controls.
- **Contrast**: test with WCAG guidelines.

## Practice Tasks
1. Generate a palette of five colors using OKLCH and apply it to a set of buttons. Ensure AAA contrast.
2. Implement a theme switcher that toggles dark mode; update CSS variables accordingly.
3. Use `color-mix()` to create complementary colors on the fly and apply them to headings.
4. Apply `accent-color` to form controls and test across browsers.

## Review Questions
1. Why are LCH and OKLCH preferred over HSL for palette generation?
2. How can you generate color scales programmatically in CSS?
3. Explain how `prefers-color-scheme` influences CSS variables and the `color-scheme` property.
4. What is the purpose of `accent-color` and how does it relate to theming?
5. Describe the role of `color-contrast()` in accessible design.

## Related Links
- [/css/03-styling-techniques.md](/css/03-styling-techniques.md)
- [/css/05-variables-architecture.md](/css/05-variables-architecture.md)
- [/css/11-accessibility.md](/css/11-accessibility.md)

