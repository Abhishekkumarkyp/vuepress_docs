---
title: Modern Responsive Design
description: Harness media queries, container queries, fluid units, responsive images, and user preferences to build adaptive interfaces.
sidebarDepth: 2
tags:
  - css
  - responsive
  - media-queries
  - container-queries
  - accessibility
---

# Modern Responsive Design

Responsive design has evolved beyond simple breakpoints. Modern techniques employ fluid units, container queries, and user preference media features to create interfaces that adapt to both screen size and user needs.

## Table of Contents
- [Media & Container Queries](#media--container-queries)
- [Fluid Units & Clamp](#fluid-units--clamp)
- [Responsive Images & Video](#responsive-images--video)
- [User Preferences & Accessibility](#user-preferences--accessibility)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Media & Container Queries

Media queries remain essential for addressing device characteristics, while container queries allow components to adapt based on the size of their container【107830350795899†L174-L183】. Declare a container with `container-type: size` and write container query rules using `@container`【107830350795899†L206-L224】.

```css
/* Traditional media query for global layout */
@media (min-width: 60rem) {
  .sidebar { display: block; }
}

/* Enable container queries on a card component */
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 25rem) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}
```

```html
<div class="card-wrapper">
  <div class="card">
    <img src="thumb.jpg" alt="Thumb">
    <div>
      <h3>Adaptive Card</h3>
      <p>When the card is wide enough, layout splits into two columns.</p>
    </div>
  </div>
</div>
```

### Image Prompts
- **Media vs Container** — “Side-by-side depiction of media query breakpoints affecting an entire page versus container queries affecting only a card component.”
- **Fluid units** — “Graph showing how `clamp()` binds a value between minimum and maximum across viewport widths.”

## Fluid Units & Clamp

Fluid typography and spacing rely on viewport-based units (`vw`, `vh`, `svh`), logical viewport units (small, large, dynamic), and `clamp()` to set bounds. The function computes `max(min(value), min(max(value), preferred))`.

```css
:root {
  --fs-min: 1rem;
  --fs-max: 1.5rem;
  --fs-preferred: 1vw + .5rem;
}

h1 {
  font-size: clamp(var(--fs-min), var(--fs-preferred), var(--fs-max));
}

.section {
  padding-block: clamp(2rem, 5vh, 4rem);
}
```

```html
<section class="section">
  <h1>Fluid Type & Padding</h1>
  <p>This heading scales with the viewport but never drops below 1rem or exceeds 1.5rem.</p>
</section>
```

## Responsive Images & Video

Use `picture` and `source` elements to serve different formats and sizes. The `sizes` attribute guides the browser in selecting the appropriate image. For video, `object-fit` and `aspect-ratio` ensure consistent cropping.

```html
<picture>
  <source type="image/avif" srcset="img-480.avif 480w, img-800.avif 800w" sizes="(max-width: 40rem) 100vw, 50vw">
  <source type="image/webp" srcset="img-480.webp 480w, img-800.webp 800w" sizes="(max-width: 40rem) 100vw, 50vw">
  <img src="img-800.jpg" alt="Sample" loading="lazy" width="800" height="600">
</picture>

<video src="demo.mp4" controls muted playsinline style="width:100%; aspect-ratio: 16/9; object-fit: cover;"></video>
```

Prefer `loading="lazy"` to defer offscreen images. The `decoding="async"` attribute can improve perceived performance.

## User Preferences & Accessibility

CSS exposes user preferences via media features: `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`, and `prefers-reduced-transparency`. Adapt interfaces accordingly to respect user needs【32771850075209†L190-L221】.

```css
@media (prefers-color-scheme: dark) {
  :root { color-scheme: dark; }
  body { background: #000; color: #eee; }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: .001s !important;
    transition-duration: .001s !important;
  }
}

@media (prefers-contrast: more) {
  body { filter: contrast(1.25); }
}
```

Use `@media (inverted-colors)` and `forced-colors` for high contrast modes on some OSes. Always provide focus indicators and avoid relying solely on color for information.

## Gotchas & Best Practices
- Don’t rely on a single breakpoint; design fluidly across sizes.
- Container queries require `container-type` to be declared on the parent element【107830350795899†L206-L224】.
- The `sizes` attribute should reflect the actual layout to let the browser choose optimal image resources.
- Respect user preferences by reducing motion and increasing contrast when requested【32771850075209†L190-L221】.
- Test responsive design on real devices and with browser dev tools to ensure accuracy.

## Quick Cheatsheet
- **Media Queries**: `@media (min-width: Npx)`, `@media (prefers-color-scheme: dark)`.
- **Container Queries**: `container-type: inline-size`, `@container (min-width: 20rem)`【107830350795899†L206-L224】.
- **Fluid Units**: `vw`, `vh`, `svh`, `lvw`, `dvh`, `clamp()`.
- **Responsive Images**: `<picture>`, `srcset`, `sizes`, `loading="lazy"`.
- **User Preferences**: `prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme`【32771850075209†L190-L221】.

## Practice Tasks
1. Refactor a component to use container queries instead of multiple media queries; test its adaptability in different contexts.
2. Implement fluid typography for headings using `clamp()` and viewport units.
3. Set up a responsive picture element that serves WebP and AVIF when supported, with proper fallbacks.
4. Respect the `prefers-reduced-motion` setting by disabling non-essential animations.

## Review Questions
1. How do container queries differ from media queries【107830350795899†L174-L183】?
2. Explain the role of the `sizes` attribute in responsive images.
3. What happens if you forget to set `container-type` before writing a container query【107830350795899†L206-L224】?
4. Describe how to implement a dark mode theme using CSS media features.
5. Why is `prefers-reduced-motion` important for accessibility【32771850075209†L190-L221】?

## Related Links
- [/css/02-layout-essentials.md](/css/02-layout-essentials.md)
- [/css/03-styling-techniques.md](/css/03-styling-techniques.md)
- [/css/07-advanced-layouts.md](/css/07-advanced-layouts.md)

