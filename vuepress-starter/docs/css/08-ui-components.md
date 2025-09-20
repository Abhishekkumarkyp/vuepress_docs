---
title: CSS for Components & UI
description: Construct accessible, responsive UI components including buttons, forms, cards, navigation, modals, tables, tooltips, tabs, and accordions.
sidebarDepth: 2
tags:
  - css
  - ui-components
  - forms
  - navigation
  - modals
  - tables
---

# CSS for Components & UI

Component-driven development requires careful consideration of interaction states, accessibility, and responsive behavior. This chapter provides patterns for building reusable UI components using modern CSS.

## Table of Contents
- [Buttons & Form Controls](#buttons--form-controls)
- [Cards & Panels](#cards--panels)
- [Navigation & Menus](#navigation--menus)
- [Modals & Overlays](#modals--overlays)
- [Tables & Data Grids](#tables--data-grids)
- [Tooltips, Tabs & Accordions](#tooltips-tabs--accordions)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Buttons & Form Controls

Buttons need accessible focus styles, disabled states, and support for `prefers-reduced-motion`. Use `appearance: none` and `accent-color` for customizing form controls while preserving semantics.

```css
.btn {
  appearance: none;
  padding: .5rem 1rem;
  border: none;
  border-radius: .25rem;
  background: var(--color-accent, #0070f3);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease;
}
.btn:hover {
  background: color-mix(in oklab, var(--color-accent) 80%, black);
}
.btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
.btn:disabled {
  opacity: .5;
  cursor: not-allowed;
}

input[type="checkbox"] {
  accent-color: var(--color-accent);
}
```

```html
<button class="btn">Primary Button</button>
<label><input type="checkbox" checked> Checkbox with accent color</label>
```

## Cards & Panels

Cards group related content. Use `box-shadow` and border radii for depth. Provide clear structure with headings and footers.

```css
.card {
  background: white;
  border-radius: .5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.card .title {
  font-size: 1.25rem;
  font-weight: 600;
}
.card .footer {
  margin-top: auto;
  font-size: .875rem;
  color: #666;
}
```

```html
<div class="card">
  <div class="title">Card Title</div>
  <p>Body text goes here.</p>
  <div class="footer">Footer info</div>
</div>
```

## Navigation & Menus

Navigation bars must adapt to screen sizes. Use flexbox for horizontal lists and convert to vertical lists on smaller viewports. Provide skip links for accessibility.

```css
.nav {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 1rem;
  padding: 0;
  background: var(--nav-bg, #222);
  color: white;
}
.nav a {
  color: inherit;
  text-decoration: none;
  padding: .5rem 1rem;
}
.nav a:focus-visible {
  outline: 2px dashed currentColor;
}

/* Mobile toggle */
.nav-toggle {
  display: none;
}
@media (max-width: 40rem) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-toggle {
    display: block;
    margin-left: auto;
  }
}
```

```html
<a href="#main" class="skip-link">Skip to content</a>
<button class="nav-toggle" aria-expanded="false">Menu</button>
<nav class="nav">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>
```

## Modals & Overlays

Modals should trap focus and respect motion preferences. Use `dialog` element where supported, fallback to a custom overlay. The `::backdrop` pseudo-element can dim the background.

```css
dialog {
  border: none;
  border-radius: .5rem;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0,0,0,.25);
  width: min(90%, 30rem);
}
dialog::backdrop {
  background: rgba(0,0,0,.5);
}

.modal-enter {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity .3s ease, transform .3s ease;
}
.modal-enter[data-open] {
  opacity: 1;
  transform: none;
}
```

```html
<dialog id="modal">
  <h2>Modal Title</h2>
  <p>Modal content goes here.</p>
  <button onclick="modal.close()">Close</button>
</dialog>
```

Add script to open/close the dialog and manage focus trap; CSS alone cannot trap focus.

## Tables & Data Grids

Tables need responsive handling on narrow screens. Use `overflow-x: auto` or convert to stacked rows on mobile. Employ `:nth-child()` for zebra striping and `caption-side: bottom` to place captions.

```css
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: .5rem;
  text-align: left;
}
tr:nth-child(even) {
  background: #fafafa;
}

.responsive-table {
  overflow-x: auto;
}
```

```html
<div class="responsive-table">
  <table>
    <caption>Sales Data</caption>
    <thead><tr><th>Product</th><th>Price</th><th>Units</th></tr></thead>
    <tbody>
      <tr><td>Widget A</td><td>$10</td><td>50</td></tr>
      <tr><td>Widget B</td><td>$15</td><td>30</td></tr>
    </tbody>
  </table>
</div>
```

## Tooltips, Tabs & Accordions

Tooltips should be accessible; use `aria-describedby` linking to a hidden element or `title`. Tabs require proper roles and keyboard interactions. Accordions need semantic heading structure and ARIA attributes.

```css
/* Tooltip using data-* attribute */
.has-tooltip {
  position: relative;
  cursor: help;
}
.has-tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: .25rem .5rem;
  border-radius: .25rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease;
}
.has-tooltip:hover::after {
  opacity: 1;
}
```

```html
<span class="has-tooltip" data-tooltip="Helpful information here">Hover me</span>
```

### Tabs & Accordions

You can implement tabs and accordions purely with CSS using the `:checked` pseudo-class. Ensure proper labeling for screen readers.

```html
<div class="tabs">
  <input type="radio" id="tab1" name="tabs" checked>
  <label for="tab1">Tab 1</label>
  <input type="radio" id="tab2" name="tabs">
  <label for="tab2">Tab 2</label>
  <div class="tab-content">
    <section id="panel1">Content 1</section>
    <section id="panel2">Content 2</section>
  </div>
</div>
```

```css
.tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr;
}
.tabs input { display: none; }
.tabs label {
  padding: .5rem; border: 1px solid #ccc; cursor: pointer;
}
.tab-content section { display: none; padding: 1rem; border: 1px solid #ccc; }

#tab1:checked ~ .tab-content #panel1,
#tab2:checked ~ .tab-content #panel2 {
  display: block;
}
```

## Gotchas & Best Practices
- Provide clear focus indicators on interactive elements.
- Avoid removing built-in form semantics; use `appearance: none` cautiously.
- For modals, trap focus and provide `aria-modal="true"` for accessibility.
- Responsive tables may need additional design patterns like cards on small screens.
- Use ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`) when building custom tabs.

## Quick Cheatsheet
- **Buttons**: `appearance`, `accent-color`, `focus-visible`.
- **Cards**: `box-shadow`, `border-radius`, flex for vertical/horizontal alignment.
- **Navigation**: `flex-wrap`, `gap`, `skip-link`.
- **Modals**: `dialog`, `::backdrop`, transitions.
- **Tables**: `border-collapse`, `overflow-x` wrapper, zebra striping.
- **Tooltips/Tabs**: `::after` content, `:checked` hack.

## Practice Tasks
1. Build an accessible toggle button that visually indicates its on/off state and updates ARIA attributes.
2. Create a responsive navigation bar that collapses into a hamburger menu on small screens.
3. Implement a modal using `<dialog>` and manage its open/close with JavaScript; ensure focus trap.
4. Develop a responsive table that converts to card-like rows on mobile using CSS.

## Review Questions
1. How does `appearance: none` affect form controls?
2. What is the `dialog` element and how does it differ from custom modal implementations?
3. Describe how to implement zebra striping in tables with pure CSS.
4. What are the requirements for accessible tabs and accordions?
5. How can `accent-color` simplify styling form controls?

## Related Links
- [/css/06-animations-transitions.md](/css/06-animations-transitions.md)
- [/css/11-accessibility.md](/css/11-accessibility.md)
- [/css/14-real-world-recipes.md](/css/14-real-world-recipes.md)

