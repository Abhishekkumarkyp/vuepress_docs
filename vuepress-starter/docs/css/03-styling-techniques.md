---
title: Styling Techniques
description: Dive into advanced color systems, backgrounds, borders, shadows, typography, filters, and shapes with modern CSS.
sidebarDepth: 2
tags:
  - css
  - styling
  - colors
  - backgrounds
  - typography
  - filters
---

# Styling Techniques

Styling in CSS goes beyond changing colors or fonts. This chapter explores advanced color spaces, gradient tricks, border and shadow techniques, modern typography features, and powerful filters and masks that bring interfaces to life.

## Table of Contents
- [Colors & Gradients](#colors--gradients)
- [Backgrounds & Borders](#backgrounds--borders)
- [Shadows & Filters](#shadows--filters)
- [Typography & Font Features](#typography--font-features)
- [Shapes & Masking](#shapes--masking)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Colors & Gradients

CSS supports modern color spaces (LCH, OKLCH, LAB) and functions like `color-mix()` and `color-contrast()`. Use them to create dynamic palettes that adapt to light and dark modes.

```css
:root {
  --primary: oklch(60% 0.2 250);
  --primary-light: color-mix(in oklab, var(--primary) 70%, white);
  --primary-dark: color-mix(in oklab, var(--primary) 70%, black);
}
.btn {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: .25rem;
  padding: .5rem 1rem;
}
.btn:hover {
  background: var(--primary-dark);
}
```

```html
<button class="btn">Advanced Colors</button>
```

Gradients can be layered and shaped using `conic-gradient()`, `radial-gradient()`, and repeating functions. Use `::before` pseudo-elements to create gradient borders.

```css
.card {
  position: relative;
  padding: 1rem;
  border-radius: .75rem;
  overflow: hidden;
}
.card::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: conic-gradient(from 90deg at 50% 50%, #f06, #9f6, #06f, #f06);
  mask: linear-gradient(#0000 0 0) content-box, linear-gradient(#0000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: inherit;
}
```

```html
<div class="card">Gradient border via conic gradient and masking</div>
```

### Image Prompts
- **Color mixing** — “Diagram showing how `color-mix()` blends two colors in the OKLab space with arrows and color swatches.”
- **Gradient border** — “Illustration of a card with a multicolored border created using conic-gradient and masking layers.”

## Backgrounds & Borders

Backgrounds support multiple layers, blend modes, and attachments. Borders can be customized via `border-image`, `outline`, and `stroke` properties (for SVGs). Combine `background-clip` with transparent areas to create frosted glass effects.

```css
.hero {
  background: linear-gradient(to bottom right, rgba(255,255,255,.6), rgba(255,255,255,.2)), url('cityscape.jpg') no-repeat center/cover;
  backdrop-filter: blur(8px) saturate(1.2);
  padding: 4rem 2rem;
  text-align: center;
  color: #222;
}
.hero h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
}
```

```html
<section class="hero">
  <h1>Frosted Glass Effect</h1>
  <p>Background blur with backdrop-filter requires support and fallbacks.</p>
</section>
```

To draw complex borders, use `border-image: linear-gradient(...) 1` or leverage CSS masks as shown above. Consider `outline-offset` for focus rings that sit outside the border.

## Shadows & Filters

Shadows add depth. Use `box-shadow` for outer shadows and `filter: drop-shadow()` for more natural results (especially on transparent PNGs). CSS filters like `blur()`, `grayscale()`, and `hue-rotate()` can create dramatic effects.

```css
.panel {
  background: white;
  padding: 2rem;
  border-radius: .5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,.1);
  filter: drop-shadow(0 0 8px rgba(0,0,0,.2));
}

.panel img {
  filter: grayscale(60%) contrast(120%);
}
```

```html
<div class="panel">
  <h2>Depth & Filters</h2>
  <img src="portrait.png" alt="Portrait" width="200">
</div>
```

## Typography & Font Features

CSS embraces modern typography: variable fonts, `@font-face`, `font-feature-settings` for ligatures and stylistic sets, and `font-variation-settings` for fine-grained control. Use `text-decoration-thickness` and `text-underline-offset` to customize underlines.

```css
@font-face {
  font-family: "InterVariable";
  src: url("Inter-VariableFont_slnt,wght.woff2") format("woff2-variations");
  font-display: swap;
}

.headline {
  font-family: "InterVariable", sans-serif;
  font-variation-settings: "wght" 700;
  font-feature-settings: "ss01" 1;
  text-decoration-line: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
```

```html
<h1 class="headline">Variable Font with Stylistic Set</h1>
```

Responsive typography uses `clamp()` to scale fonts across screen sizes. Combine with `prefers-reduced-motion` to limit dynamic size changes when necessary.

## Shapes & Masking

Create non-rectangular shapes using `clip-path: circle()`, `ellipse()`, or even custom paths. `shape-outside` shapes floated elements so text wraps around them. CSS masks allow complex cutouts and layering.

```css
.blob {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f9a 0%, #9af 100%);
  clip-path: path("M50,0 Q100,50 50,100 Q0,50 50,0 Z");
}
```

```html
<div class="blob"></div>
```

```css
.float-shape {
  float: right;
  width: 150px;
  height: 150px;
  background: #ace;
  shape-outside: circle(50%);
  clip-path: circle(50%);
  margin-left: 1rem;
}
```

```html
<div class="float-shape"></div>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
```

## Gotchas & Best Practices
- Always specify a fallback when using color spaces beyond sRGB; many browsers still lack full support.
- Backdrop filters are performance-intensive; use `will-change` or limit their area.
- Variable fonts can increase file size—subsetting reduces weight.
- `clip-path` animations can trigger expensive repaints; prefer transforms where possible.
- Avoid stacking too many shadows or filters to preserve performance.

## Quick Cheatsheet
- **Color Spaces**: `rgb()`, `hsl()`, `lab()`, `lch()`, `oklch()`.
- **Functions**: `color-mix()`, `color-contrast()`, `conic-gradient()`, `repeating-linear-gradient()`.
- **Typography**: `@font-face`, variable fonts, `font-feature-settings`.
- **Shadows**: `box-shadow`, `text-shadow`, `drop-shadow()`.
- **Masks & Shapes**: `clip-path`, `shape-outside`, CSS masks.

## Practice Tasks
1. Create a button component that adapts to light/dark mode using `color-mix()` and custom properties.
2. Design a hero section with a layered gradient background and backdrop-filter blur; ensure legibility.
3. Build a card component with a gradient border using pseudo-elements and `mask-composite`.
4. Use `font-variation-settings` to animate weight from 300 to 700 on hover.

## Review Questions
1. What benefits do color spaces like OKLCH provide over traditional RGB?
2. Describe how to create a gradient border without using extra markup.
3. When would you use `drop-shadow()` over `box-shadow`?
4. How can variable fonts improve responsive typography?
5. Explain the difference between `clip-path` and `shape-outside`.

## Related Links
- [/css/04-responsive-design.md](/css/04-responsive-design.md)
- [/css/06-animations-transitions.md](/css/06-animations-transitions.md)
- [/css/12-color-systems-and-theming.md](/css/12-color-systems-and-theming.md)

