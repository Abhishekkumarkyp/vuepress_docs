---
title: "Performance & Best Practices"
description: "Optimize CSS for performance: critical CSS, containment, content-visibility, and audits."
sidebarDepth: 2
tags:
  - css
  - performance
  - optimization
  - containment
  - audit
---

# Performance & Best Practices

Performance matters as much as aesthetics. Efficient CSS reduces load time, prevents jank, and improves user experience. This chapter covers critical CSS, containment techniques, hardware acceleration, and tools for auditing.

## Table of Contents
- [Critical CSS & File Size](#critical-css--file-size)
- [Containment & Content-Visibility](#containment--content-visibility)
- [Hardware Acceleration & Transforms](#hardware-acceleration--transforms)
- [Lazy Loading & Visibility](#lazy-loading--visibility)
- [Auditing Tools & Techniques](#auditing-tools--techniques)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Critical CSS & File Size

Inline only the CSS needed for above-the-fold content to ensure quick rendering. Use server-side rendering or build tools to extract critical CSS. Minify and compress CSS files, remove unused selectors (via purge tools) and avoid heavy frameworks when simple rules suffice.

```html
<style>
/* Inline critical styles for faster first paint */
body { margin: 0; font-family: system-ui, sans-serif; }
header { background: #333; color: #fff; padding: 1rem; }
</style>
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

## Containment & Content-Visibility

The `contain` property and the `content-visibility` property limit the scope of layout, style, and paint calculations. `content-visibility: auto` enables the browser to skip rendering offscreen content until needed, paired with `contain-intrinsic-size` to reserve space【826044301220087†L591-L601】.

```css
.section {
  content-visibility: auto;
  contain-intrinsic-size: 1000px 0; /* Reserve vertical space */
}
```

```html
<section class="section">
  <h2>Deferred Section</h2>
  <p>Content here isn't rendered until it approaches the viewport.</p>
</section>
```

Containment can also limit layout and style recalculations when manipulating heavy components—use `contain: layout paint;` to isolate.

## Hardware Acceleration & Transforms

Offload animations to the GPU using transforms (`translate3d`, `scale3d`) and opacity. Avoid animating properties that trigger layout or paint operations. Setting `transform: translateZ(0)` can promote an element to its own compositor layer, but overuse can increase memory consumption.

```css
.spinner {
  width: 50px; height: 50px;
  border: 4px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin .75s linear infinite;
  will-change: transform;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

```html
<div class="spinner"></div>
```

## Lazy Loading & Visibility

Lazy-load images and iframes using `loading="lazy"`. Manage large lists with virtualization frameworks or patterns. Combine with `content-visibility` to ensure non-visible content doesn’t impact layout until needed.

```html
<img src="big-photo.jpg" alt="Large photo" loading="lazy" width="800" height="600">
```

Use `visibility: hidden` versus `display: none` thoughtfully—`visibility: hidden` retains layout space but hides the element; `display: none` removes it entirely from flow.

## Auditing Tools & Techniques

Use browser DevTools’ Performance and CSS Coverage panels to identify unused CSS and layout thrashing. Tools like Lighthouse highlight render-blocking resources and measure CLS (Cumulative Layout Shift). Add `data-` attributes or `outline` to debug performance hotspots.

```css
/* Debugging layout thrashing */
.debug-thrash {
  outline: 1px solid red;
}
```

## Gotchas & Best Practices
- Only use `content-visibility: auto` on sections that are large and offscreen; small elements may not benefit【826044301220087†L591-L601】.
- Overusing `will-change` can harm performance due to memory overhead; apply only shortly before the change.
- Avoid using too many custom fonts; they increase file size and block rendering if not preloaded.
- Remove unused CSS and group similar rules to reduce file size.
- Test animations on low-end devices to ensure smoothness.

## Quick Cheatsheet
- **Critical CSS**: inline above-the-fold styles; defer the rest.
- **Containment**: `contain: layout style paint size`; `content-visibility: auto`【826044301220087†L591-L601】.
- **Transforms**: use 3D transforms for GPU acceleration; avoid expensive properties.
- **Lazy Loading**: `loading="lazy"` for images/iframes; virtualization for lists.
- **Auditing**: DevTools Performance, CSS Coverage, Lighthouse.

## Practice Tasks
1. Identify unused CSS in a project using DevTools and remove it; measure file-size difference.
2. Apply `content-visibility` to a long list of articles and test scrolling performance.
3. Convert an animation from `top`/`left` to `transform: translate()` and compare frame rates.
4. Build a spinner using only CSS and ensure it doesn’t trigger layout recalculations.

## Review Questions
1. How do `contain` and `content-visibility` improve performance【826044301220087†L591-L601】?
2. What is the purpose of the `contain-intrinsic-size` property?
3. Why is animating opacity and transform better for performance than animating width or height?
4. Describe the risks of overusing `will-change`.
5. What tools can you use to audit and optimize CSS performance?

## Related Links
- [/css/06-animations-transitions.md](/css/06-animations-transitions.md)
- [/css/04-responsive-design.md](/css/04-responsive-design.md)
- [/css/09-performance-best-practices.md](/css/09-performance-best-practices.md)
- [/css/11-accessibility.md](/css/11-accessibility.md)

