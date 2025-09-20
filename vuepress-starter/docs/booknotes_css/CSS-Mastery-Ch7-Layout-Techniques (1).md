
---
title: CSS Mastery — Chapter 7 Notes
sidebar: auto
---

# Chapter 7 — Using CSS Layout Techniques

## 1) Introduction
CSS offers multiple layout strategies, each with strengths and trade‑offs:
- **Floats** — legacy layout technique (originally for images).
- **Positioning** — relative, absolute, fixed, sticky.
- **Flexbox** — one‑dimensional layout (row OR column).
- **Grid** — two‑dimensional layout (rows AND columns).

---

## 2) Float‑based layouts (legacy)
Floats were widely used to create columns, but require clearfixes and don’t adapt well.

```css
.columns::after { content: ""; display: table; clear: both; } /* clearfix */
.col { float: left; width: 50%; }
```

::: warning Legacy
Prefer Flexbox/Grid for primary layout. Keep floats for text wrap and small patterns.
:::

---

## 3) Positioning techniques
- **relative** — offsets element without removing it from normal flow.
- **absolute** — positioned relative to nearest positioned ancestor.
- **fixed** — pinned to viewport (stays on scroll).
- **sticky** — toggles from static to fixed within a scroll container.

```css
.banner { position: sticky; top: 0; background: #fff; z-index: 10; }
.tooltip { position: absolute; inset: auto auto 100% 0; }
```

---

## 4) Multi‑column with Flexbox (1D)
Ideal for distributing/aligning items along one axis.

```css
.shell { display: flex; gap: 1rem; align-items: stretch; }
.sidebar { flex: 1 1 240px; }
.main { flex: 3 1 480px; min-width: 0; } /* allow content to shrink */
```

Alignment tools:
- `justify-content` (main axis)
- `align-items` (cross axis)
- `gap` for spacing (no margins required)

---

## 5) Complex layouts with CSS Grid (2D)
Explicit row/column placement; great for page skeletons.

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
.header  { grid-column: 1 / -1; }
.main    { grid-column: 2; }
.sidebar { grid-column: 1; }
.aside   { grid-column: 3; }
.footer  { grid-column: 1 / -1; }
```

Responsive tracks with `minmax()` and `auto-fit`/`auto-fill`:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

---

## 6) Responsive design essentials
- Use **media queries** for breakpoints and **fluid units** (`%`, `em`, `rem`, `fr`, `vw`).
- Mobile‑first approach: start with a single column, enhance upwards.

```css
.wrapper { max-width: 72rem; margin-inline: auto; padding-inline: 1rem; }

/* Stack on small screens */
.layout { display: flex; flex-direction: column; }
/* Upgrade at ≥ 768px */
@media (min-width: 48rem) {
  .layout { flex-direction: row; }
}
```

---

## 7) “Holy Grail” layout (header / 3 columns / footer)

### Flexbox
```css
.holy { display: flex; flex-wrap: wrap; }
.holy > header, .holy > footer { flex: 1 0 100%; }
.holy > nav    { flex: 0 0 200px; }
.holy > main   { flex: 1 1 0; min-width: 0; }
.holy > aside  { flex: 0 0 200px; }
```

### Grid
```css
.holy-grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
.holy-grid header, .holy-grid footer { grid-column: 1 / -1; }
.holy-grid main   { grid-column: 2; }
```

---

## 8) Centering patterns
```css
/* Block centering */
.centered { max-width: 64rem; margin-inline: auto; }

/* Flex centering (both axes) */
.center-flex { display: flex; justify-content: center; align-items: center; }

/* Grid centering (both axes) */
.center-grid { display: grid; place-items: center; }
```

---

## 9) Modern helpers & gotchas
- Use `gap` (Flex/Grid) instead of margins for intra‑component spacing.
- Set `min-width: 0` on flex children that contain overflowing content.
- Prefer logical properties (`margin-inline`, `padding-block`) for RTL support.
- Containment/overflow: use `overflow: auto` or `contain` to isolate scroll/paint when needed.

---

## 10) Checklist
- [ ] Use **Flexbox** for 1D alignment and distribution.
- [ ] Use **Grid** for 2D, page‑level layout.
- [ ] Keep floats for text wrap; avoid for main layout.
- [ ] Provide responsive breakpoints; design mobile‑first.
- [ ] Use `gap`, not margins, for internal spacing where possible.
- [ ] Test overflow: add `min-width: 0` to flex items with long content.
- [ ] Use logical properties for internationalization.
