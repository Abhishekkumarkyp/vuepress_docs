
---
title: CSS Mastery — Chapter 2 Notes
sidebar: auto
---

# Chapter 2 — Visual Formatting Model (Deep Notes)

## Overview
Master three pillars: **Box Model**, **Positioning**, and **Floats/Clearing**. When these are clear, layouts become predictable and debuggable.

---

## 1) Box Model (content → padding → border → margin)
Every element is a rectangle composed of four layers:

- **content** — text/inline children or replaced element content (images, inputs).
- **padding** — space between content and border; backgrounds paint under padding too.
- **border** — stroke around the padding/content.
- **margin** — outer whitespace; transparent, collapses vertically under specific rules.

**Per-side control:** `margin-top/right/bottom/left`, `padding-*`, `border-*-width/style/color`.

**Negative margins:** allowed (commonly horizontal for pull effects; vertical requires care).

**UA defaults:** Browsers ship default margins (e.g., on `body`, `h1`, `p`). Normalize or set explicitly.

```css
/* Helpful base */
*,
*::before,
*::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body { margin: 0; font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
```

**Legacy note (for historical codebases):** In IE5.x and IE6 *quirks mode*, `width` included padding and border. Avoid mixing fixed `width` + horizontal padding on legacy layouts.

---

## 2) Margin Collapsing (vertical, normal-flow blocks)
Vertical margins of block-level boxes in normal flow can **collapse** into a single margin equal to the largest participating value:

- Adjacent sibling blocks (`p + p`).
- Parent with its **first**/ **last** child when no border/padding separates them.
- Empty blocks where top/bottom margins meet.

**Does NOT collapse** for inline, floated, or absolutely positioned boxes, nor across borders/padding.

**Prevent collapsing:** add padding/border to the parent, or create a new formatting context (see §6).

```css
.article > h2 { margin: 1.5rem 0; }
.article > p  { margin: 1rem 0; } /* p+p collapses to max(1rem, 1rem) = 1rem */
```

---

## 3) Visual Formatting Model: Block vs Inline
- **Block boxes** (e.g., `div`, `p`, `h1`) stack vertically; width is normally the containing block’s width; vertical spacing via margins.
- **Inline boxes** (e.g., `span`, `em`, `strong`) flow horizontally inside **line boxes**; `line-height` sets line box height and governs vertical alignment with `vertical-align`.
- `display` swaps behaviors: `display: inline`, `display: block`, `display: inline-block`, `display: none` (removes the box from layout).

**Anonymous boxes:** The UA may create anonymous block/inline boxes to satisfy model rules (e.g., text nodes inside a block among blocks).

---

## 4) Positioning Schemes

### Normal flow (default)
Document order → layout order. Most elements live here.

### Relative positioning
Offsets an element **relative to its normal position** while **preserving its original space**. Often used to create a positioning context for absolutely positioned children.

```css
.badge-wrap { position: relative; }
.badge      { position: absolute; top: .5rem; right: .5rem; } /* See absolute below */
```

### Absolute positioning
Removes an element from normal flow; positions it relative to the **nearest positioned ancestor** (`position` not `static`), otherwise the initial containing block (viewport for HTML). Use `z-index` to control stacking.

```css
.card { position: relative; }
.card .note { position: absolute; bottom: .75rem; left: 1rem; }
```

**Caveat:** Full-page absolute layouts don’t reflow with content changes → brittle.

### Fixed positioning
A special absolute case whose containing block is the **viewport**. Sticks on scroll—great for nav bars, chat launchers.

### Sticky (modern, for completeness)
`position: sticky` toggles from relative → fixed when crossing a threshold.

```css
.toc { position: sticky; top: 1rem; }
```

---

## 5) Floats: How They Work
A float is taken out of normal block flow and shifted left/right until it hits the container edge or another float. Inline content and line boxes shrink to wrap around the float.

- Later floats **drop** to the next line if there isn’t horizontal room.
- Different heights can cause content to snake around floats in unintuitive ways.

```css
.figure {
  float: left;
  margin: 0 1rem .5rem 0; /* Create breathing room for wrapping text */
  max-width: 40%;
}
```

---

## 6) Clearing & Containing Floats

### Clear following content
Stop content from flowing beside floats using `clear`:

```css
.section-end { clear: both; }
```

### Make a parent wrap its floated children
Floats don’t contribute to the parent’s height in normal flow. Three common patterns:

1. **Clearing element** inside the container (old school):
   ```html
   <div class="group">
     <img class="left-float" ...>
     <p>...</p>
     <div class="clear"></div>
   </div>
   ```
   ```css
   .clear { clear: both; }
   ```

2. **Block Formatting Context (BFC) / “overflow” containment**:
   ```css
   .group { overflow: auto; } /* or hidden; avoids extra markup */
   ```

3. **Micro Clearfix (generated content)**:
   ```css
   .group::after {
     content: "";
     display: table;
     clear: both;
   }
   ```

> Prefer (2) or (3) in modern code; (1) is mostly for legacy support.

---

## 7) Quick Reference Snippets

**Relative parent + absolute child:**
```css
.hero { position: relative; }
.hero .cta { position: absolute; bottom: 1rem; right: 1rem; }
```

**Float an image with wrapped text & clear afterward:**
```css
.figure { float: right; margin: 0 0 .5rem 1rem; max-width: 40%; }
.article-end { clear: both; }
```

**Contain floats without extra markup (BFC trick):**
```css
.container { overflow: auto; } /* or hidden */
```

**Inline → block & block → inline:**
```css
a.button { display: inline-block; padding: .5rem 1rem; }
nav ul  { display: flex; gap: .75rem; } /* modern alternative to floats for menus */
```

---

## 8) Debugging Tips
- Outline everything temporarily:
  ```css
  * { outline: 1px dotted rgba(0,0,0,.2); }
  ```
- Add background colors to visualize padding vs margin.
- Use DevTools to inspect **line boxes** and **containing blocks** (hover the box model diagram).

---

## 9) Checklist
- [ ] Reason about every box via **content/padding/border/margin**.
- [ ] Anticipate **margin collapsing**; prevent it with padding/borders or BFC.
- [ ] Choose the right **positioning** tool: normal flow → relative → absolute → fixed → sticky.
- [ ] Use **floats** for text wrap (images, asides), not for whole-page layouts (prefer Flexbox/Grid).
- [ ] **Contain floats** via overflow/BFC or clearfix.
- [ ] Keep code simple; prefer Flexbox/Grid for major layout problems.
