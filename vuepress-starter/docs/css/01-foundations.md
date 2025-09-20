---
title: CSS Foundations
description: Clear, modern fundamentals — box model, specificity, units, cascade layers, and combinators — with practical tips and examples.
sidebarDepth: 2
tags:
  - css
  - foundations
  - selectors
  - units
  - cascade
---

# Foundations of CSS

A solid grasp of the box model, selectors, units, and the cascade is the backbone of CSS. These notes focus on practical, modern usage: lowering specificity, using new units, managing the cascade with layers, and writing resilient layouts.

## Table of Contents
- [Box Model & Normal Flow](#box-model--normal-flow)
- [Selectors & Specificity](#selectors--specificity)
- [Units & Values](#units--values)
- [Cascade, Inheritance & Layers](#cascade-inheritance--layers)
- [Combinators & Pseudo-classes](#combinators--pseudo-classes)
- [Margin Collapsing & Box Sizing](#margin-collapsing--box-sizing)
- [Custom Properties Deep Dive](#custom-properties-deep-dive)
- [Performance & Containment](#performance--containment)
- [Selectors: Complete Reference](#selectors-complete-reference)
- [Container Queries](#container-queries)
- [Color Spaces & Mixing](#color-spaces--mixing)
- [Stacking Contexts & Painting](#stacking-contexts--painting)
- [Media & Environment Queries](#media--environment-queries)
- [Typography & Variable Fonts](#typography--variable-fonts)
- [Transforms & Animation Details](#transforms--animation-details)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Box Model & Normal Flow

The box model layers are content, padding, border, and margin. Elements participate in normal flow as block or inline boxes. Creating a new block formatting context (BFC) can isolate layout behaviors (e.g., contain floats, prevent margin collapse).

```css
/* Create a BFC to contain floats and prevent margin collapsing */
.container {
  display: flow-root; /* clean, semantic replacement for clearfix hacks */
  padding: 1rem;
  border: 1px solid #ccc;
}

.label {
  display: inline;   /* inline boxes size to their content */
  background: #eef;
  padding: 0 .25rem;
}
```

```html
<div class="container">
  <p>The outer margin doesn't collapse because flow-root creates a new BFC.</p>
  <span class="label">Inline label</span> continues on the same line.
  <span class="label">Another</span>
  <span class="label">Inline</span>
  <span class="label">Box</span>
  <p style="float: right">A floated element stays contained.</p>
  <div style="clear: both"></div>
  <p>Content after the float remains inside the container.</p>
  
</div>
```

Common BFC triggers: `display: flow-root`, `overflow` not `visible`, `float`, `position: absolute|fixed`, `display: inline-block|table-cell|table-caption`, flex/grid items.

Tip: Prefer `flow-root` for new code; it avoids extra markup and keeps intent explicit.

### Image Prompts
- Box model layers: Cross-section diagram labeling margin, border, padding, content.
- Normal flow: Column of block boxes with inline lines flowing left-to-right.

## Selectors & Specificity

Selectors target elements by type, attributes, position, and state. Specificity determines which rules win.

```css
/* Use :where() to cap specificity for utilities */
:where(.btn) {
  padding: .5rem 1rem;
  border-radius: .25rem;
}

/* Variants add specificity via class combination (still low and manageable) */
.btn.primary {
  background: var(--primary, #06f);
  color: #fff;
}

/* Attribute selector with case-insensitive flag */
button[type="submit" i] { text-transform: uppercase; }
```

```html
<button class="btn primary">Primary Button</button>
<button class="btn">Default Button</button>
```

- Specificity is a 4-tuple: inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements. Example: `#header .nav li.active` → (0,1,2,2).
- `:where()` always contributes zero specificity; great for utilities and resets.
- `:is()` contributes the specificity of its most specific argument; good for compact selectors.
- Avoid IDs and inline styles in application CSS; prefer classes to keep specificity low and overrides predictable.
- Attribute selector flags: `i` (case-insensitive), `s` (case-sensitive where applicable).

## Selectors: Complete Reference

This section catalogs CSS selectors by type with examples, specificity notes, and practical tips.

### Basic
- Universal `*`: matches any element. Specificity (0,0,0,0).
- Type `h1`, `p`, `input`: element names. Specificity (0,0,0,1).
- Class `.btn`, `.card`: Specificity (0,0,1,0).
- ID `#app`: Specificity (0,1,0,0) — avoid in app code where possible.

### Attributes
- Presence: `[disabled]`
- Exact: `[type="email"]`
- Space-separated word: `[class~="token"]`
- Dash-separated prefix: `[lang|="en"]` (matches `en`, `en-US`)
- Prefix: `[href^="https://"]`
- Suffix: `[src$=".png"]`
- Substring: `[data-id*="user-"]`
- Flags: case-insensitive `i`, case-sensitive `s`.
Specificity equals a class selector.

### Combinators
- Descendant: `A B`
- Child: `A > B`
- Adjacent sibling: `A + B`
- General sibling: `A ~ B`
- Column: `A || B` (table columns and associated cells)

### Pseudo-classes — State/UI
- Links: `:any-link`, `:link`, `:visited`
- Focus: `:focus`, `:focus-visible`, `:focus-within`
- Forms/UI: `:enabled`, `:disabled`, `:read-only`, `:read-write`, `:required`, `:optional`, `:checked`, `:indeterminate`, `:placeholder-shown`, `:autofill`, `:valid`, `:invalid`, `:user-invalid`
- Targeting: `:target`, `:target-within`
- Dialog/popover: `:modal`, `:popover-open` (support varies)
- Language/direction: `:lang(en)`, `:dir(rtl)`

### Pseudo-classes — Structural
- Position: `:first-child`, `:last-child`, `:only-child`, `:nth-child(An+B)`, `:nth-last-child(An+B)`
- Per-type: `:first-of-type`, `:last-of-type`, `:only-of-type`, `:nth-of-type(An+B)`, `:nth-last-of-type(An+B)`
- Empty: `:empty` (no children or text nodes)
Tip: any whitespace/text node prevents `:empty` from matching.

### Relational and Selector Lists
- `:is(S1, S2, ...)` — matches if any argument matches; specificity equals the most specific argument.
- `:where(S1, S2, ...)` — same matching as `:is` but zero specificity.
- `:not(S)` — negates; specificity equals its argument (level 4 allows complex lists).
- `:has(R)` — parent/ancestor matching based on relative selector R.
- `:scope` — reference for relative selectors (root in query context or `@scope`).

Examples:
```css
ul > li:nth-child(2n of .item) { background: color-mix(in oklab, #06f 10%, white); }
form:has(input:invalid) { outline: 2px solid crimson; }
:where(.btn, .tag) { border-radius: .25rem; }
button:not(.primary) { opacity: .8; }
```

### Pseudo-elements
- Generated: `::before`, `::after`
- Text: `::first-line`, `::first-letter`, `::selection`, `::target-text`
- Lists/forms: `::marker`, `::placeholder`, `::file-selector-button`
- Overlays/media: `::backdrop`, `::cue`, `::cue-region`
- Diagnostics: `::spelling-error`, `::grammar-error`
- Shadow DOM: `::part(name)`, `::slotted(selector)`; with hosts `:host`, `:host()`, `:host-context()`
Specificity: like an element selector.

### Specificity Notes
- Classes, attributes, and pseudo-classes share the same weight.
- `:is()` and `:not()` take the highest specificity of their arguments; `:where()` stays at zero.
- IDs trump most patterns; reserve for one-off overrides or anchors.
- Many chained classes increase specificity; consider layer ordering and utilities to keep it low.

### Native CSS Nesting
Use `&` as the nest selector; combine with relational selectors.

```css
.card {
  padding: 1rem;
  & > h2 { margin: 0 0 .5rem; }
  & .actions { display: flex; gap: .5rem; }
  &:has(img) { grid-template-columns: 1fr min(40%, 20rem); }
}
```

Notes: `&` refers to the parent selector; nesting does not change specificity rules.

## Units & Values

Modern CSS has robust units. Choose based on what the value should scale with:

- Font-relative: `em`, `rem`, `ex`, `ch`, `cap`, `ic`, `lh`, `rlh`.
- Viewport: `vw`, `vh`, `vmin`, `vmax` and stable/dynamic variants `svw/svh`, `lvw/lvh`, `dvw/dvh`.
- Container query units: `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax` (size relative to the nearest query container).
- Layout: grid `fr` unit (flexible track sizing for CSS Grid only).
- Percentages: resolve against different references depending on property (e.g., width vs. transform).
- Sizing keywords: `min-content`, `max-content`, `fit-content()`.
- Functions: `calc()`, `min()`, `max()`, `clamp()` for safe fluid ranges.

```css
:root {
  --space-1: clamp(0.5rem, 1vw, 0.75rem);
  --space-2: clamp(1rem, 2vw, 1.5rem);
}

.card {
  width: min(48ch, 90cqi); /* cap width by characters or container inline size */
  padding: var(--space-2);
  margin: var(--space-2) auto;
  border-radius: .5rem;
  background: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(22ch, 30cqi), 1fr));
  gap: var(--space-1);
}
```

```html
<div class="card">
  <p>This card scales smoothly with viewport or container size.</p>
  <p>Try resizing the container to see cqi at work.</p>
</div>
<div class="grid">
  <div>A</div><div>B</div><div>C</div>
  <div>D</div><div>E</div><div>F</div>
  <div>G</div>
</div>
```

Notes:
- Use `dvh`/`dvw` to account for dynamic browser UI on mobile; prefer over `vh/vw` when full-viewport sizing matters.
- `fr` works only in Grid. For Flexbox, use percentages or `flex` values instead.

## Cascade, Inheritance & Layers

The cascade decides which declarations apply. Inheritance passes some properties from parent to child (e.g., `color`, `font-family`). Cascade layers (`@layer`) add an explicit order of precedence across groups of rules.

Cascade order (high → low), conceptually:
1) Origin & importance (user-important > author-important > author > user > UA)
2) Layer order (later-declared layers win over earlier ones; unlayered rules sit on top of all layers)
3) Specificity
4) Source order

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
  :root { color-scheme: light dark; }
  body { font: 1rem/1.5 system-ui, sans-serif; }
}

@layer components {
  .card { background: #fff; border-radius: .5rem; padding: 1rem; }
}

@layer utilities {
  .mt-2 { margin-top: .5rem; }
  .text-center { text-align: center; }
}

/* Unlayered rules override all layers by default */
.card { box-shadow: 0 1px 4px rgb(0 0 0 / 0.1); }
```

```html
<div class="card mt-2 text-center">
  Layered styling order is explicit with @layer declarations.
  Unlayered overrides still apply last.
  
</div>
```

Useful keywords: `inherit`, `initial`, `unset` (behaves like inherit for inherited properties, else initial), `revert` (revert to user/UA default), `revert-layer` (revert within the current layer stack).

::: warning
When adding layers to an existing project, declare the full layer list in one place before use to avoid accidental reordering across files. Keep overrides either in the final layer or unlayered.
:::

## Combinators & Pseudo-classes

Combinators express relationships: descendant (` `), child (`>`), adjacent sibling (`+`), general sibling (`~`). Pseudo-classes target stateful conditions or relationships.

```css
/* Adjacent siblings: style only paragraphs immediately following an h2 */
h2 + p {
  margin-top: 0;
  font-style: italic;
}

/* :has() is supported in modern browsers; select parents with matching descendants */
form:has(input:invalid) {
  border-left: 4px solid var(--danger, crimson);
  padding-left: 1rem;
}

/* Accessibility: focus styles only when keyboard focus is visible */
button:focus-visible { outline: 2px solid color-mix(in oklab, #06f, white 20%); }

/* Grouped interactive states without raising specificity too much */
:is(a, button)[aria-disabled="true"], :is(a, button).disabled {
  pointer-events: none;
  opacity: .6;
}
```

```html
<form>
  <label>Email <input type="email" required></label>
  <button class="btn">Submit</button>
</form>
```

Note: `:has()` enables powerful parent/ancestor styling; still use thoughtfully for performance on very large DOMs.

## Margin Collapsing & Box Sizing

Adjacent vertical margins between block-level boxes in normal flow may collapse (top with bottom). Collapsing can happen between a parent and its first/last child. It does not occur for flex/grid items or inside a BFC.

`box-sizing` controls whether padding/border are included in the declared width/height (prefer `border-box` for predictable layout).

```css
*, *::before, *::after { box-sizing: border-box; }

.pane {
  width: 50%;
  padding: 1rem;
  border: 2px solid #000;
}

.wrapper {
  display: flow-root; /* prevents child margins collapsing with parent */
}
```

```html
<div class="wrapper">
  <div class="pane" style="margin-top: 2rem;">Top margin doesn't collapse with parent.</div>
  <div class="pane" style="margin-top: 1rem;">Another pane.</div>
</div>
```

## Custom Properties Deep Dive

CSS custom properties participate fully in the cascade and compute-time value resolution. They inherit by default and can store any token sequence.

```css
/* Define tokens with fallbacks */
:root {
  --brand: oklch(60% 0.16 260);
  --gap: 1rem;
}

.card { gap: var(--gap, 1rem); border-color: var(--brand, rebeccapurple); }

/* Typed registration enables transitions and validation */
@property --spin {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.loader { rotate: var(--spin); transition: --spin 400ms linear; }
.loader.is-active { --spin: 360deg; }
```

Notes:
- Resolution happens at computed-value time; `var()` fails the whole declaration if the property becomes invalid after substitution, unless a fallback is provided.
- Registered properties via `@property` gain type safety and are animatable.
- Custom properties can be queried in container style queries (see Container Queries) enabling design tokens that drive variants.

## Performance & Containment

Use rendering containment to limit layout, paint, and style recalculations for large pages and lists.

```css
/* Prevent off-screen content from being laid out/painted until needed */
.card-list > li {
  content-visibility: auto;
  contain-intrinsic-size: 1px 200px; /* reserve space to avoid CLS */
}

/* Isolate heavy components */
.widget {
  contain: content; /* size + layout + paint + style containment */
}

/* Isolate stacking/painting to avoid unexpected blending */
.overlay {
  isolation: isolate;
}
```

Tips:
- `content-visibility: auto` dramatically improves first render for long pages; always pair with `contain-intrinsic-size` for stable layout.
- Containment can change behavior (e.g., margin-collapsing, z-index). Validate visuals.

## Advanced Selectors

For a full catalog and specificity notes, see Selectors: Complete Reference.

Level 4 selectors unlock powerful patterns.

```css
/* :nth-child with of-list filters */
li:nth-child(2n of .item) { background: color-mix(in oklab, #06f 10%, white); }

/* :not() carries the specificity of its argument; keep it low */
button:not(.primary) { opacity: .8; }

/* :dir() matches document direction; combine with logical props */
[dir="rtl"] .nav:dir(rtl) { margin-inline-start: 0; }
```

Notes:
- `:nth-child(An+B of selector)` filters the counting set; great for striping only certain rows.
- `:not(S)` takes S’s specificity (but never adds more than one simple selector’s worth).
- Prefer `:lang()`/`:dir()` over attribute checks when semantics matter.

## Container Queries

Size and style your components relative to their container instead of the viewport.

```css
.card-grid { container: grid / inline-size; }

/* Size query */
@container (width > 40rem) {
  .card { grid-template-columns: 1fr 1fr; }
}

/* Named containers */
.sidebar { container-name: sidebar; container-type: inline-size; }
@container sidebar (min-width: 22rem) { .nav { display: grid; } }

/* Style query (custom properties only) */
.theme-scope { --variant: filled; container-type: inline-size; }
@container style(--variant: filled) {
  .button { background: var(--brand); color: white; }
}
```

Notes:
- Use `container-type: inline-size` on a parent to enable queries; add `container-name` to target specific containers.
- Style queries currently match custom properties on the query container; use them to drive component variants.

## Color Spaces & Mixing

Work in perceptual color spaces for smoother scales and blends.

```css
:root {
  /* Perceptual spaces */
  --primary: oklch(62% 0.14 265);
  --primary-strong: color-mix(in oklab, var(--primary), black 10%);
}

.btn { background: var(--primary); color: white; }
.btn:hover { background: var(--primary-strong); }
```

Notes:
- Prefer `lab/lch` or `oklab/oklch` for generating ramps and mixing; they produce more even lightness steps than sRGB.
- `color-mix()` interpolates in a specified color space; use `oklab`/`oklch` for UI scales.
- Use `color-scheme: light dark` and system colors to align with user preferences.

## Stacking Contexts & Painting

Understanding stacking contexts prevents z-index bugs.

Creates a new stacking context:
- Positioned element (`position` not `static`) with `z-index`.
- Any element with `opacity < 1`, `transform`, `filter`, `mix-blend-mode`, `perspective`, `isolation: isolate`, `will-change: transform`, or `contain: paint`.

Paint order basics:
1) Background/borders
2) Descendants with negative `z-index`
3) In-flow/inline descendants
4) Positioned descendants with `z-index: auto`/`0`
5) Positioned descendants with positive `z-index`

Debug tip: Temporarily add `outline: 1px solid red` and `transform: translateZ(0)` carefully to reveal stacking/containment issues.

## Media & Environment Queries

Modern queries adapt to capabilities and user preferences.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}

@media (color-gamut: p3) {
  :root { --primary: color(display-p3 0.2 0.4 1); }
}

/* Respect safe areas on notched devices */
.hero { padding-top: max(2rem, env(safe-area-inset-top)); }
```

Useful features: `prefers-contrast`, `prefers-color-scheme`, `forced-colors`, `light-level`, `pointer`, `hover`, `dynamic-range`.

## Typography & Variable Fonts

Control legibility and rhythm with advanced font features.

```css
/* Variable font with optical sizing */
@font-face {
  font-family: "InterVar";
  src: url(/fonts/Inter-Variable.woff2) format("woff2-variations");
  font-display: swap;
  unicode-range: U+000-5FF; /* latin */
}

body {
  font-family: InterVar, system-ui, sans-serif;
  font-optical-sizing: auto; /* use 'opsz' axis if present */
  font-variant-numeric: tabular-nums lining-nums; /* better alignment */
}

.price { font-feature-settings: "ss01" 1; /* named stylistic set */ }
```

Notes:
- Prefer high-level properties (`font-variant-*`) over `font-feature-settings` where possible.
- `font-size-adjust` helps equalize perceived size across fallback fonts.
- Use `line-height` unit types like `lh`/`rlh` for consistent rhythm.

## Transforms & Animation Details

Modern transform properties and math unlock smooth, GPU-friendly animations.

```css
/* Individual transform properties */
.tile { translate: 0 0; rotate: 0deg; scale: 1; transition: translate .3s, rotate .3s, scale .3s; }
.tile:hover { translate: 0 -4px; scale: 1.02; }

/* Trigonometric functions for periodic motion */
.wave { --t: 0deg; translate: 0 calc(5px * sin(var(--t))); }

/* Prefer opacity/transform for composited animations */
.fade-in { opacity: 0; animation: fade 300ms ease-out forwards; }
@keyframes fade { to { opacity: 1 } }

/* Avoid layout thrash during animation */
.will-move { will-change: transform; }
```

Notes:
- `translate/rotate/scale` are animatable individually and often perform better than the `transform` shorthand.
- Trig functions (`sin`, `cos`, `tan`, `atan2`) support `deg`/`rad` inputs; combine with `calc()` for expressive motion.
- Use `prefers-reduced-motion` to provide alternatives for motion-sensitive users.

## Gotchas & Best Practices
- Keep specificity low: prefer classes; avoid IDs and inline styles.
- Use logical properties (`margin-inline-start`, `padding-block`, etc.) for internationalization and writing modes.
- Prefer `flow-root` over clearfix hacks to contain floats/margins.
- Avoid fixed heights; let content define height, or cap with `max-height`.
- Use `dvh/dvw` for full-viewport sections on mobile; avoid jumps from dynamic UI.
- Introduce layers early: `@layer reset, base, components, utilities, overrides` is a pragmatic default.
- Use `:where()` to scope utility helpers at zero specificity.
- Favor custom properties with fallbacks: `var(--gap, 1rem)`; centralize tokens on `:root`.
- Reach for container queries and `cqw/cqh` when component sizing should respond to container, not the viewport.
 - Consider `@scope` for local scoping of styles to a subtree (emerging support). Combine with layers to avoid bleed.
 - Shadow DOM styling: use `:host`, `:host-context`, `::part`, `::slotted` to bridge component boundaries safely.

## Quick Cheatsheet
- Box model: content + padding + border + margin.
- Specificity: inline > ID > class/attr/pseudo-class > element/pseudo-element.
- Units: `px`, `%`, `rem/em`, `ch`, `lh`, `vw/vh/vmin/vmax`, `svw/svh`, `lvw/lvh`, `dvw/dvh`, grid `fr`, container `cqw/cqh/...`.
- Functions: `min()`, `max()`, `clamp()`, `calc()`; size keywords `min-content`, `max-content`, `fit-content()`.
- Cascade: origin/importance → layers → specificity → source order. Unlayered > layered.

## Practice Tasks
1. Create a small spacing utility set using `:where()` (e.g., `.gap-1`–`.gap-4`) and verify that component classes can override them via source order.
2. Build a responsive card that uses `clamp()` for font-size and `min()` for width; compare `vh` vs. `dvh` on mobile.
3. Introduce `@layer base, components, utilities, overrides` to a sample page and demonstrate `revert-layer` and an unlayered override.
4. Use `:has()` to style a `<form>` when any required input is invalid, and add `:focus-visible` styles for accessibility.
5. Create a grid using `fr` tracks and explain why `fr` doesn’t apply to Flexbox.

## Review Questions
1. Why does `:where()` have zero specificity, and how does that differ from `:is()`?
2. Give an example selector that yields specificity `(0,1,0,2)` and explain the count.
3. Why is `box-sizing: border-box` recommended for layout?
4. How do `min()` and `clamp()` enable fluid yet bounded design?
5. Describe a margin-collapsing scenario and two ways to prevent it.
6. What is the relative order of layers versus specificity in the cascade, and where do unlayered rules sit?
7. When should you favor container units (`cqw/cqh`) over viewport units?

## Related Links
- /css/02-layout-essentials.md
- /css/03-styling-techniques.md
- /css/05-variables-architecture.md
