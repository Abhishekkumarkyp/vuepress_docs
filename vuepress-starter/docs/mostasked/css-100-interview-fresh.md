---
title: "100 Most‑Asked CSS Interview Questions (with code, analogies, differences & follow‑ups)"
description: "A practical, interview‑ready CSS guide with concise answers, runnable snippets, and crisp comparisons."
tags: [css, interview, frontend, web]
---

# 100 Most‑Asked CSS Interview Questions

> Use: skim the one‑liners, run the snippets, and practice the follow‑ups. If a topic is concept‑heavy, an analogy is provided; for difference‑based questions, a small table clarifies distinctions.

---

## Selectors, Cascade & Specificity

### 1) What is the CSS cascade?
**One‑liner:** The cascade decides which styles apply when multiple rules target the same element (origin, importance, specificity, order).
**Analogy:** Like multiple volume knobs; the most “authoritative” one wins.
**Follow‑ups:** How do author vs user vs UA origins interact? What’s `!important`?

### 2) Specificity — how is it calculated?
**One‑liner:** Count IDs, classes/attributes/pseudo‑classes, and types/pseudo‑elements → compare as `ID‑CLASS‑TYPE` (e.g., `1‑2‑1`).  
**Example:**
```css
#id { color: red; }            /* 1-0-0 */
.container .item { color: red }/* 0-2-0 */
p { color: red }               /* 0-0-1 */
```
**Follow‑ups:** What do :is(), :where(), :not(), and nesting contribute?

### 3) How do :is(), :where(), and :not() affect specificity?
**One‑liner:** The pseudo‑class itself adds no weight; the most specific selector inside contributes (except :where(), which is always 0).
**Example:**
```css
:is(#a,.b,div){}    /* contributes max of inner */
:where(.box p){}    /* always 0 */
:not(.x){}          /* .x contributes */
```

### 4) Difference: class vs attribute selector
| Aspect | `.class` | `[attr=value]` |
|---|---|---|
| Target | class tokens | any attribute/value |
| Semantic | styling‑oriented | state/data‑oriented |
| Cost | cheap | slightly heavier |
**Follow‑ups:** When to prefer data‑attributes?

### 5) What are combinators (>, +, ~, space, ||)?
**One‑liner:** They define relationships in the DOM tree: child, adjacent sibling, general sibling, descendant, and column.

### 6) Pseudo‑class vs pseudo‑element
| | Pseudo‑class | Pseudo‑element |
|---|---|---|
| Purpose | element **state** | **part** of element |
| Syntax | `:` | `::` |
| Examples | `:hover`, `:nth-child()` | `::before`, `::first-line` |

### 7) :nth-child() vs :nth-of-type()
**One‑liner:** `:nth-child()` counts **all** children; `:nth-of-type()` counts only a **given tag name**.
**Example:**
```css
li:nth-child(2) { color: red }
li:nth-of-type(2) { color: blue } /* second <li> among <li>s */
```

### 8) When should you use `!important`?
**One‑liner:** Sparingly, as an escape hatch; prefer refactoring selectors or using `@layer` to control order.

### 9) What is `@layer` and why use it?
**One‑liner:** It creates ordered style layers to control the cascade predictably (base → components → utilities).
```css
@layer reset, base, components, utilities;
@layer base { body{font:16px/1.5 system-ui;} }
```

### 10) What is CSS nesting?
**One‑liner:** The ability to nest selectors under a parent using `&` and rules; helps group related styles.
```css
.card {
  padding: 1rem;
  & h2 { margin: 0; }
  &:hover { box-shadow: 0 4px 12px rgba(0,0,0,.1) }
}
```

---

## Box Model, Sizing & Units

### 11) Explain the box model.
**One‑liner:** Content → padding → border → margin; total size depends on `box-sizing`.

### 12) `content-box` vs `border-box`
| | `content-box` (default) | `border-box` |
|---|---|---|
| Width includes | content only | content+padding+border |
| Easier layouts | ❌ | ✅ |
```css
* { box-sizing: border-box; }
```

### 13) margin collapsing — when and where?
**One‑liner:** Adjacent vertical margins of block elements may combine into a single margin; doesn’t happen with padding/borders/positioned/ flex/grid items.

### 14) `width: auto` vs `width: 100%`
**One‑liner:** `auto` fits content/available space depending on formatting context; `100%` equals the containing block’s content width.
**Follow‑ups:** Why does `100%` sometimes overflow?

### 15) Units: px vs em vs rem
| | px | em | rem |
|---|---|---|---|
| Relative to | device pixel ratio | parent font-size (most props) | root font-size |
| Pros | predictable | scales with context | consistent scaling |
**Example:**
```css
h1{ font-size: clamp(1.5rem, 2vw + 1rem, 3rem); }
```

### 16) Viewport units (vw, vh, dvh, svh, lvh)
**One‑liner:** Represent fractions of viewport size; dynamic/small/large variants handle mobile browser UI changes.

### 17) `min-content`, `max-content`, `fit-content`
**One‑liner:** Intrinsic sizing keywords that size around content’s min/max needs; `fit-content()` clamps to a limit.

### 18) `clamp()` — why is it handy?
**One‑liner:** Produces fluid values with min, preferred, and max.
```css
font-size: clamp(14px, 1.2vw, 18px);
```

### 19) `calc()` — pitfalls?
**One‑liner:** Requires spaces around operators; mix units carefully.
```css
width: calc(100% - 2rem);
```

### 20) Logical properties (inline/block start/end)
**One‑liner:** Flow‑relative properties (`margin-inline`, `padding-block`) adapt to writing modes and RTL.

---

## Display, Formatting Contexts & Positioning

### 21) `display: block` vs `inline` vs `inline-block`
| | block | inline | inline-block |
|---|---|---|---|
| New line | ✅ | ❌ | ❌ |
| Set width/height | ✅ | ❌ | ✅ |
| Margin top/bottom | ✅ | ❌ | ✅ |

### 22) BFC (Block Formatting Context) — what triggers it?
**One‑liner:** Created by floats, overflow not visible, `display: flow-root`, etc.; isolates floats/margins for layout.

### 23) Floats — modern use?
**One‑liner:** Rarely for layout now; use for text wrap around images.

### 24) `position: static/relative/absolute/fixed/sticky`
**One‑liner:** Static = default; relative = offset without leaving flow; absolute = remove from flow and position to nearest positioned ancestor; fixed = viewport; sticky = toggles relative/fixed based on scroll.

### 25) Stacking context & `z-index`
**One‑liner:** Certain properties (positioned + z-index, transforms, opacity<1, filters, etc.) create new stacking contexts that affect painting order.

### 26) `overflow` vs `clip-path` vs `mask`
**One‑liner:** `overflow` clips to box; `clip-path` clips by shape; `mask` uses alpha/luminance of another image/gradient.

### 27) `visibility: hidden` vs `display: none`
| | visibility | display |
|---|---|---|
| Layout space | kept | removed |
| Accessibility | still enumerable | removed from tree |

### 28) Centering techniques
**One‑liner:** Flexbox, grid, abs‑pos with transform; inline‑block + text‑align for legacy.
```css
.parent{display:grid;place-items:center;}
```

### 29) Single‑line vs multi‑line truncation
```css
.single { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.multi  { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
```

### 30) Aspect‑ratio
**One‑liner:** Reserve space based on width/height ratio without hacks.
```css
.card{ aspect-ratio: 16/9; }
```

---

## Flexbox & Grid

### 31) Flexbox — core axes & alignment
**One‑liner:** Main/cross axes with `justify-*` and `align-*`; `gap` for spacing.

### 32) Common Flex gotchas
**One‑liner:** Flex items shrink by default; use `min-width: 0` to allow content to shrink; beware of overflow.

### 33) Difference: `flex-basis` vs `width`
| | `flex-basis` | `width` |
|---|---|---|
| Applies in | flex formatting | normal/grid contexts |
| Priority | overrides width during flexing | baseline size |

### 34) `flex: 1` shorthand
**One‑liner:** `flex: 1 1 0%` = grow, shrink, zero basis.

### 35) Grid — explicit vs implicit tracks
**One‑liner:** Explicit via templates; implicit via auto-placement creating tracks as needed.

### 36) Grid template areas
```css
grid-template:
  "h h" 60px
  "s m" 1fr
  "f f" auto / 240px 1fr;
```

### 37) Auto‑placement & dense packing
**One‑liner:** `grid-auto-flow: row|column|dense` controls fill strategy.

### 38) `minmax()` and `auto-fit/fill`
```css
grid-template-columns: repeat(auto-fit, minmax(16ch, 1fr));
```

### 39) Flex vs Grid — when to choose?
| | Flex | Grid |
|---|---|---|
| Dimension | 1D | 2D |
| Strength | alignment | layout |
| Typical | navbars, chips | dashboards, galleries |

### 40) Subgrid — what is it?
**One‑liner:** Allows child grids to inherit track sizing from the parent for consistent alignment.

---

## Colors, Backgrounds, Borders & Effects

### 41) Modern color functions
**One‑liner:** `color()`, `lab()`, `lch()`, `oklab()`, `oklch()` for perceptual uniformity; `color-mix()` to blend.
```css
color: color-mix(in oklab, white 20%, #042b6c);
```

### 42) Gradients quick recipe
```css
background: linear-gradient(180deg, rgba(0,0,0,.2), transparent);
```

### 43) Multiple backgrounds & layering
```css
background:
  url(icon.svg) no-repeat 1rem 1rem,
  linear-gradient(#0003,#0000);
```

### 44) Border tricks
**One‑liner:** `outline` doesn’t affect layout; `border-image` slices graphics; `border-radius` accepts slash notation for elliptical radii.

### 45) Filters & blend modes
```css
.photo { filter: saturate(1.2) contrast(1.1); mix-blend-mode: multiply; }
```

### 46) Drop shadows vs box shadows
**One‑liner:** `filter: drop-shadow()` respects alpha of the element’s shape; `box-shadow` uses the element’s box.

### 47) Backdrop filters
```css
.glass { backdrop-filter: blur(12px) saturate(1.2); }
```

### 48) Image sprites vs SVG icons
| | Sprites | SVG |
|---|---|---|
| Scaling | bitmap‑blurry | crisp, stylable |
| Theming | hard | easy via CSS/currentColor |

### 49) `object-fit` & `object-position`
**One‑liner:** Control media’s fit inside its box (`cover`, `contain`, …).

### 50) `image-set()` for responsive images
```css
background-image: image-set(url(img1x.png) 1x, url(img2x.png) 2x);
```

---

## Typography & Text

### 51) System fonts vs web fonts
**One‑liner:** System fonts load instantly; web fonts offer branding but add network cost; use font‑display strategies.

### 52) Variable fonts — benefits
**One‑liner:** Fewer files, continuous axes (weight, width, slant); animate smoothly.

### 53) `line-height` — unitless vs px
| | unitless | px |
|---|---|---|
| Inheritance | scales with font-size | fixed |
| Preferred | ✅ | for pixel‑perfect |

### 54) Hyphenation & wrapping
```css
p{ overflow-wrap:anywhere; hyphens:auto; }
```

### 55) `text-overflow` vs `overflow`
**One‑liner:** `text-overflow` only surfaces when overflow is clipped.

### 56) `letter-spacing` & `word-spacing`
**One‑liner:** Adjust tracking and word gaps; mind readability at small sizes.

### 57) Ligatures & font‑feature‑settings
**One‑liner:** Enable discretionary/ contextual alternates when needed.

### 58) `@font-face` pitfalls
**One‑liner:** Provide formats, subsets, `font-display` control; beware layout shifts.

### 59) `ch` and `ex` units
**One‑liner:** `ch` ≈ width of “0” glyph; helpful for measure; `ex` ≈ x‑height (rarely reliable).

### 60) `text-rendering` & `-webkit-font-smoothing`
**One‑liner:** Non‑standard hints; prefer defaults unless you have a strong reason.

---

## Responsive Design & Media Queries

### 61) Mobile‑first vs desktop‑first
**One‑liner:** Start narrow then enhance vs start broad then reduce; mobile‑first reduces overrides.

### 62) Media query ranges & level 4 syntax
```css
@media (width >= 48rem) and (prefers-reduced-motion: no-preference){}
```

### 63) Container queries
**One‑liner:** Style components based on their **container** size, not the viewport.
```css
@container (min-width: 400px){ .card{ display:grid; grid-template-columns:1fr 1fr } }
```

### 64) `prefers-color-scheme` and theming
```css
@media (prefers-color-scheme: dark){ :root{ color-scheme: dark; } }
```

### 65) `prefers-reduced-motion`
**One‑liner:** Offer motion‑reduced alternatives to animations/transitions.

### 66) View transitions API (concept)
**One‑liner:** Smooth page/state transitions with CSS‑driven animations via the View Transitions API.

### 67) Responsive tables
**One‑liner:** Wrap with overflow, stack cells, or transform into cards; use `data-*` labels.

### 68) Fluid spacing scales
**One‑liner:** Use `clamp()` and custom properties to scale rhythm across breakpoints.

### 69) Images: `sizes` and modern formats
**One‑liner:** Provide appropriate `sizes` and prefer AVIF/WebP when supported.

### 70) Safe area insets
```css
padding-top: max(env(safe-area-inset-top), 1rem);
```

---

## Animations & Transitions

### 71) Hardware‑accelerated properties
**One‑liner:** Transform/opacity animate cheaply; layout/paint heavy properties are expensive.

### 72) Easing functions
**One‑liner:** Use `ease`, `ease-in/out`, `cubic-bezier()`, `steps()` for discrete steps.

### 73) Keyframes basics
```css
@keyframes wiggle{ to{ transform: rotate(3deg) } }
.box{ animation: wiggle .3s ease-out; }
```

### 74) Transition best practices
**One‑liner:** Specify only needed properties; set duration/easing; respect reduced‑motion.

### 75) `animation-fill-mode` and `animation-direction`
**One‑liner:** Control styles before/after and alternate playback.

### 76) Choreographing multiple elements
**One‑liner:** Stagger with delays; group with CSS variables for coordination.

### 77) `will-change`
**One‑liner:** Hint future changes sparingly; removes after use to avoid memory costs.

### 78) 3D transforms & `backface-visibility`
**One‑liner:** Hide flipped sides; mind perspective on parent.

### 79) Scroll‑linked animations (Scroll‑Timeline)
**One‑liner:** Animate progress tied to scroll position without JS (browser support evolving).

### 80) Performance debugging
**One‑liner:** Use DevTools Performance/Rendering; record paints; avoid layout thrash.

---

## Architecture, Variables & Tooling

### 81) CSS custom properties (variables)
```css
:root{ --brand:#042b6c; }
.button{ background: var(--brand); }
```

### 82) Using variables in calc & color‑mix
```css
:root{ --gap: 1rem; --bg: #042b6c; }
.card{ gap: var(--gap); background: color-mix(in oklab, white 20%, var(--bg)); }
```

### 83) BEM methodology
**One‑liner:** Block__Element--Modifier naming to express structure and variation.

### 84) CSS Modules vs Tailwind vs CSS‑in‑JS
| | Modules | Tailwind | CSS‑in‑JS |
|---|---|---|---|
| Scope | local | utility classes | JS scoped |
| DX | moderate | fast prototyping | dynamic styling |
| Runtime | none | none | possible runtime cost |

### 85) Preprocessors (Sass/Less) — still relevant?
**One‑liner:** Useful for mixins and loops; less needed with modern CSS features.

### 86) Critical CSS
**One‑liner:** Inline above‑the‑fold styles to speed first render; load rest async.

### 87) Purging unused CSS
**One‑liner:** Use tools (PurgeCSS, Tailwind’s JIT) to remove dead selectors from production builds.

### 88) Print stylesheets
**One‑liner:** `@media print` to define paper‑friendly colors, hiding nav, showing URLs.

### 89) Accessibility with CSS
**One‑liner:** Maintain visible focus, sufficient contrast, avoid content shifts; don’t rely on color alone.

### 90) Shadow DOM & theming
**One‑liner:** Style via `::part` and `::theme` (where supported) or expose CSS custom properties.

---

## Edge Cases, Tricks & Common Questions

### 91) Why does `position: sticky` sometimes not work?
**One‑liner:** Needs a scrollable ancestor and room to stick; overflow or lack of thresholds breaks it.

### 92) Why is `z-index` not taking effect?
**One‑liner:** Likely a stacking context; ensure the element participates in the same context and has positioning.

### 93) How to draw a triangle with CSS?
```css
.tri{ width:0;height:0;border:10px solid transparent;border-bottom-color:#333; }
```

### 94) How to create a responsive square or circle?
```css
.square{ aspect-ratio:1/1; } .circle{ aspect-ratio:1/1; border-radius:50%; }
```

### 95) How to center an absolutely positioned element?
```css
.abs-center{ position:absolute; inset:0; margin:auto; width:fit-content; height:fit-content; }
```

### 96) Difference: `opacity:0` vs `visibility:hidden` vs `display:none`
| | opacity | visibility | display |
|---|---|---|---|
| Clickable | usually yes | no | no |
| Layout space | kept | kept | removed |

### 97) Prevent image dragging/selection
```css
img{ user-select:none; -webkit-user-drag:none; }
```

### 98) Make text selection color custom
```css
::selection{ background:#ffe08a; color:#222; }
```

### 99) Hide scrollbars but keep scrolling
```css
.scroll { overflow:auto; scrollbar-width:none; }
.scroll::-webkit-scrollbar{ display:none; }
```

### 100) Real‑world debugging checklist
**One‑liner:** Inspect computed styles, check cascade/specificity, verify box model and formatting context, reduce to minimal reproducible example, then iterate.

---

## Bonus Practice (not counted)
- Build a fluid, accessible button set with focus rings and reduced‑motion variants.  
- Create a responsive card grid using `auto-fit` + `minmax`.  
- Convert a float layout to flex/grid.  
- Theme a component using only custom properties.  
- Animate a route change with view transitions and respect reduced‑motion.

---

**Tip:** Measure before optimizing; keep styles layered and predictable using `@layer`, variables, and component‑level scoping.
