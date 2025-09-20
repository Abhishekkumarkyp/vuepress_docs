---
title: Advanced Layout Patterns
description: Explore subgrid, container queries, anchor positioning, CSS Shapes, aspect ratio, and masonry patterns to build complex layouts.
sidebarDepth: 2
tags:
  - css
  - advanced-layout
  - subgrid
  - container-queries
  - shapes
  - aspect-ratio
---

# Advanced Layout Patterns

Beyond basic grid and flexbox, CSS provides powerful features for complex layouts. This chapter covers subgrid, container queries, anchor positioning, CSS Shapes, aspect ratios, and experimental patterns like masonry layout.

## Table of Contents
- [Subgrid & Nested Grids](#subgrid--nested-grids)
- [Container & Size Queries](#container--size-queries)
- [Anchor Positioning](#anchor-positioning)
- [CSS Shapes & Exclusion](#css-shapes--exclusion)
- [Aspect Ratio & Object Fit](#aspect-ratio--object-fit)
- [Masonry & Experimental Layouts](#masonry--experimental-layouts)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Subgrid & Nested Grids

Subgrid allows a nested grid to inherit the tracks of its parent grid. Use it when child items need to align perfectly with the parent’s rows or columns. Without subgrid, nested grids cannot align across boundaries.

```css
.dashboard {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
.dashboard > .content {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  gap: 1rem;
}
.card { background: #f8f8f8; padding: 1rem; }
```

```html
<div class="dashboard">
  <header>Header</header>
  <div class="content">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </div>
  <footer>Footer</footer>
</div>
```

Subgrid ensures the card elements align with the global grid columns. Without it, they would create a new context and misalign.

## Container & Size Queries

Container queries allow components to respond to the dimensions of their container instead of the viewport【107830350795899†L174-L183】. Size queries are specified with `@container (min-width: ...)`. Use `container-type: size` on the container to activate queries【107830350795899†L206-L224】.

```css
.card-grid {
  container-type: inline-size;
}
.card {
  display: flex;
  flex-direction: column;
}
@container (min-width: 40rem) {
  .card {
    flex-direction: row;
    gap: 1rem;
  }
}
```

```html
<div class="card-grid">
  <div class="card">
    <img src="icon.png" alt="Icon">
    <div>
      <h4>Card Title</h4>
      <p>Description text flows here.</p>
    </div>
  </div>
</div>
```

## Anchor Positioning

Anchor positioning tethers one element (the anchor) to another (the anchored). It allows dropdowns, tooltips, and callouts to position themselves without manual offsets【751845352407934†L173-L178】.

```css
.btn-anchor {
  position: relative;
}
.popover {
  position-anchor: --btn;
  inset-anchor: center;
  transform: translateY(0.5rem);
  background: #333;
  color: #fff;
  padding: .5rem 1rem;
  border-radius: .25rem;
}
```

```html
<button class="btn-anchor" id="btn" style="--btn: anchor(#btn)">Click me</button>
<div class="popover">Anchored popover</div>
```

The `position-anchor` property references an anchor element defined via `anchor()` function; `inset-anchor` defines where the anchored element should align relative to the anchor【751845352407934†L173-L178】.

## CSS Shapes & Exclusion

`shape-outside` and `shape-inside` define arbitrary shapes for wrapping text. Use them with floats or exclusions to create magazine-like layouts.

```css
.profile {
  float: left;
  width: 200px;
  height: 200px;
  margin: 0 1rem 1rem 0;
  shape-outside: ellipse(50% 40% at 50% 50%);
  clip-path: ellipse(50% 40% at 50% 50%);
}
```

```html
<img src="portrait.jpg" alt="Portrait" class="profile">
<p>Long-form text flows around the ellipse defined by shape-outside. This technique is useful for editorial designs.</p>
```

## Aspect Ratio & Object Fit

The `aspect-ratio` property maintains consistent proportions. Use with images, videos, or any element that needs a ratio. Combine with `object-fit` to control how replaced elements fill their boxes.

```css
.video-container {
  aspect-ratio: 16 / 9;
  background: #000;
}
iframe {
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}
```

```html
<div class="video-container">
  <iframe src="https://www.example.com/embed/123" allowfullscreen></iframe>
</div>
```

## Masonry & Experimental Layouts

While CSS doesn’t yet have a native masonry layout, you can simulate it using multi-column layouts or `masonry` values in grid (currently experimental). Multi-column works by flowing items top-to-bottom then left-to-right—practical for simple galleries.

```css
.masonry {
  column-count: 4;
  column-gap: 1rem;
}
.masonry > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}
```

```html
<div class="masonry">
  <!-- Cards or images of varying heights -->
  <div class="item">A</div>
  <div class="item">B long text that makes this card taller</div>
  <div class="item">C</div>
</div>
```

## Gotchas & Best Practices
- Subgrid is not supported in all browsers; provide fallbacks or alternative layouts.
- Container queries must have `container-type` set on the container【107830350795899†L206-L224】.
- Anchor positioning is experimental; test fallback positions using standard absolute positioning.
- Shape-outside requires floats; avoid mixing with flexbox or grid inside the same container.
- Use aspect-ratio to prevent layout shifts when images load.

## Quick Cheatsheet
- **Subgrid**: `grid-template-columns: subgrid;` or rows.
- **Container Query**: declare `container-type` then use `@container (min-width: 40rem)`【107830350795899†L206-L224】.
- **Anchor Positioning**: `position-anchor`, `anchor()`, `inset-anchor`【751845352407934†L173-L178】.
- **Shapes**: `shape-outside`, `shape-inside`, `clip-path`.
- **Aspect Ratio**: `aspect-ratio: width/height`.
- **Masonry**: use multi-column or experimental `masonry` grid values.

## Practice Tasks
1. Build a dashboard using subgrid where cards align with the main grid’s columns.
2. Create a card component that reflows from column to row orientation using container queries.
3. Implement a tooltip using anchor positioning and provide a fallback for unsupported browsers.
4. Design an article layout with a floated image using `shape-outside` and discuss how it affects the text flow.
5. Simulate a masonry gallery using multi-column layout; experiment with varying column counts.

## Review Questions
1. When would you use subgrid over nested grids?
2. How do container queries differ from media queries【107830350795899†L174-L183】?
3. Explain how anchor positioning simplifies tooltip placement【751845352407934†L173-L178】.
4. What considerations exist for using shape-outside in responsive layouts?
5. Why is aspect-ratio helpful for responsive media?

## Related Links
- [/css/02-layout-essentials.md](/css/02-layout-essentials.md)
- [/css/04-responsive-design.md](/css/04-responsive-design.md)
- [/css/10-expert-topics.md](/css/10-expert-topics.md)

