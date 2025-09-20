---
title: Real-World CSS Recipes
description: Apply advanced techniques to build sticky headers, off‑canvas menus, fluid typography, responsive cards, pure CSS toggles, and masonry grids.
sidebarDepth: 2
tags:
  - css
  - recipes
  - patterns
  - responsive
  - real-world
---

# Real-World CSS Recipes

This chapter synthesizes concepts from previous chapters into practical patterns you can use in production. Each recipe demonstrates advanced CSS techniques to solve common UI challenges.

## Table of Contents
- [Sticky Headers & Footers](#sticky-headers--footers)
- [Off‑Canvas Menus](#offcanvas-menus)
- [Fluid Typography & Spacing](#fluid-typography--spacing)
- [Responsive Cards & Grids](#responsive-cards--grids)
- [Pure CSS Toggles & Modals](#pure-css-toggles--modals)
- [Masonry & Pinterest-Style Layouts](#masonry--pinterest-style-layouts)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Sticky Headers & Footers

Keep navigation visible while scrolling by combining `position: sticky` with `backdrop-filter` and adjusting z-index. A sticky footer ensures the footer remains at the bottom of the viewport on short pages.

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px) saturate(1.2);
  background: rgba(255,255,255,.8);
  padding: .5rem 1rem;
  display: flex;
  justify-content: space-between;
}
.footer {
  margin-top: auto;
  padding: 1rem;
  background: #f9f9f9;
  text-align: center;
}
```

```html
<header class="header">Sticky header with backdrop blur</header>
<main style="min-height: 100svh; display: flex; flex-direction: column;">
  <article style="flex: 1 1 auto;">
    <p>Content goes here...</p>
  </article>
  <footer class="footer">Sticky footer stays at bottom</footer>
</main>
```

## Off‑Canvas Menus

Off‑canvas menus slide in from the side on small screens. Use transforms for smooth animations and `dialog` element or `aria-hidden` toggling for accessibility.

```css
.offcanvas {
  position: fixed;
  top: 0; left: 0;
  width: 16rem;
  height: 100%;
  background: #333;
  color: #fff;
  transform: translateX(-100%);
  transition: transform .3s ease;
}
.offcanvas.open {
  transform: none;
}
.offcanvas .close {
  position: absolute;
  top: .5rem;
  right: .5rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
}
```

```html
<button onclick="document.getElementById('drawer').classList.toggle('open')">☰</button>
<aside id="drawer" class="offcanvas">
  <button class="close" onclick="this.parentElement.classList.remove('open')">×</button>
  <nav><a href="#">Home</a><a href="#">About</a><a href="#">Contact</a></nav>
</aside>
```

## Fluid Typography & Spacing

Use `clamp()` and viewport units for text and spacing that scale gracefully. Combine with custom properties for consistent rhythm.

```css
:root {
  --step-0: clamp(1rem, 2vw + .5rem, 1.25rem);
  --step-1: clamp(1.2rem, 2.5vw + .6rem, 1.5rem);
  --gap: clamp(1rem, 3vw, 2rem);
}
h1 { font-size: var(--step-1); margin-bottom: var(--gap); }
p { font-size: var(--step-0); margin-bottom: var(--gap); }
```

```html
<h1>Fluid Heading</h1>
<p>Fluid body text adapts from small to large screens.</p>
```

## Responsive Cards & Grids

Create card layouts using CSS Grid with `auto-fit` and `minmax()` for responsive columns. Combine with Flexbox inside cards for alignment.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--gap, 1rem);
}
.card {
  background: #fff;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
```

```html
<div class="card-grid">
  <div class="card">
    <h3>Card Title</h3>
    <p>Some content.</p>
    <button>Action</button>
  </div>
  <!-- More cards -->
</div>
```

## Pure CSS Toggles & Modals

Leverage the `:checked` pseudo-class to toggle elements like menus or modals. Pair with `label` elements or hidden checkboxes for accessible toggles.

```html
<input type="checkbox" id="toggle" hidden>
<label for="toggle" class="toggle-button">Toggle Panel</label>
<div class="panel">This panel appears when checked.</div>
```

```css
.toggle-button {
  display: inline-block;
  padding: .5rem 1rem;
  background: #0070f3;
  color: #fff;
  cursor: pointer;
}
.panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height .3s ease;
}
#toggle:checked + .toggle-button + .panel {
  max-height: 10rem;
}
```

## Masonry & Pinterest-Style Layouts

Simulate masonry grids with `column-count` and `break-inside` to avoid broken elements. Items flow top-to-bottom within columns, then left-to-right.

```css
.masonry {
  column-count: 3;
  column-gap: 1rem;
}
.masonry > article {
  break-inside: avoid;
  margin-bottom: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}
```

```html
<div class="masonry">
  <article>Item 1</article>
  <article>Item 2 with long content to demonstrate variable heights.</article>
  <article>Item 3</article>
</div>
```

## Gotchas & Best Practices
- Provide accessible labels for toggles; hidden checkboxes still need labels.
- Off‑canvas menus should trap focus and close when clicking outside or pressing Esc.
- Avoid animating `max-height` when content size is unknown; use transforms or transitions on scales.
- Masonry layouts using columns reorder items; order may not match the DOM.
- Always test on small and large screens to ensure responsive patterns work smoothly.

## Quick Cheatsheet
- **Sticky**: `position: sticky; top/bottom` for fixed-in-scroll containers.
- **Off‑Canvas**: use transforms (`translateX`/`translateY`) and transitions.
- **Fluid**: `clamp()` and viewport units for typography and spacing.
- **Responsive Grid**: `auto-fit`/`auto-fill` with `minmax()`.
- **Toggles**: `:checked` pseudo-class with hidden inputs.
- **Masonry**: `column-count` and `break-inside`.

## Practice Tasks
1. Build a sticky header that changes its background opacity when scrolled.
2. Implement an off‑canvas navigation drawer that slides from the right and traps focus.
3. Create fluid typography for headings and paragraphs using custom property scales.
4. Develop a pure CSS modal using the `:checked` hack; ensure it closes with a checkbox and is accessible.
5. Simulate a masonry layout for blog cards with varying heights using columns.

## Review Questions
1. How does `position: sticky` differ from `fixed`? Provide an example use case.
2. Describe how you would build an off‑canvas menu using only CSS and minimal JavaScript.
3. What are the pros and cons of using the `:checked` hack for toggles and modals?
4. Why can masonry layouts reorder content, and what are the implications for screen readers?
5. How does `clamp()` aid fluid typography and spacing?

## Related Links
- [/css/06-animations-transitions.md](/css/06-animations-transitions.md)
- [/css/07-advanced-layouts.md](/css/07-advanced-layouts.md)
- [/css/08-ui-components.md](/css/08-ui-components.md)

