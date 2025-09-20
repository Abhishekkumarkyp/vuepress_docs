
---
title: CSS Mastery — Chapter 9 Notes
sidebar: auto
---

# Chapter 9 — Web Typography & Fonts (Practical Guide)

> Make text readable, beautiful, and fast. This chapter covers font loading, typesetting, and modern typographic features you can reliably ship.

---

## 1) Core goals
- **Readability first:** size, line-length, and line-height.
- **Performance:** careful font loading to avoid layout shifts.
- **Polish:** ligatures, kerning, hyphenation, optical sizing.
- **Robustness:** sensible fallbacks and graceful degradation.

---

## 2) Sizing that scales
Use fluid type with `clamp()` so text grows on larger screens but stays legible on phones.

```css
:root {
  --step--1: clamp(.82rem, .82rem + .1vw, .9rem);
  --step-0:  clamp(1.00rem, 1rem + .2vw, 1.125rem);
  --step-1:  clamp(1.25rem, 1.15rem + .8vw, 1.5rem);
  --step-2:  clamp(1.5rem,  1.3rem + 1.4vw, 1.875rem);
  --step-3:  clamp(1.85rem, 1.6rem + 2vw,  2.25rem);
}
h1 { font-size: var(--step-3); }
h2 { font-size: var(--step-2); }
p  { font-size: var(--step-0); line-height: 1.55; }
small { font-size: var(--step--1); }
```

**Rules of thumb**
- Line-height: `1.4–1.7` for body text.
- Measure (line length): `50–75ch` for comfortable reading.
- Use `rem` for global rhythm; `em` for component-relative sizing.

---

## 3) Font stacks & fallbacks
Always provide a safe stack.

```css
:root {
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  --font-serif: ui-serif, "Georgia", Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
body { font-family: var(--font-sans); }
code, pre { font-family: var(--font-mono); }
```

If you use web fonts, load them responsibly (see §5).

---

## 4) Typesetting details (the polish)
- **Kerning & ligatures:** `font-kerning: normal; font-variant-ligatures: common-ligatures contextual;`
- **Numeric styles:** `font-variant-numeric: tabular-nums lining-nums;` for UI and tables.
- **Hyphenation:** `hyphens: auto;` and set a language attribute on the `<html lang="…">` element.
- **Optical sizing:** `font-optical-sizing: auto;` for variable fonts.
- **Rags & line breaking:** `text-wrap: balance;` (modern) to balance multi-line headings.
- **Drop caps:** style with `::first-letter` carefully and provide fallbacks.
- **Small caps:** prefer `font-variant-caps: small-caps;` (avoid fake small caps).

```css
.prose {
  max-width: 70ch;
  hyphens: auto;
  hanging-punctuation: first allow-end; /* supported in modern Safari/Chrome */
  text-wrap: pretty; /* improves breaks around punctuation (modern) */
}
h1, h2 { text-wrap: balance; }
.data { font-variant-numeric: tabular-nums lining-nums; }
```

---

## 5) Loading web fonts without jank
Avoid FOIT (flash of invisible text) and layout shifts.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap" rel="stylesheet">
```
```css
:root { --font-web: "Inter", var(--font-sans); }
body  { font-family: var(--font-web); }
```

**Tips**
- Use `display=swap` (or `optional`) to avoid invisible text.
- Subset fonts for used glyph ranges when possible.
- Limit variants (weights/styles) to what you actually use.
- For self-hosting, use `@font-face` with `font-display: swap;` and provide `woff2` first.

---

## 6) Variable fonts (axes & control)
Variable fonts pack many styles into one file.

```css
h1 {
  font-variation-settings: "wght" 700, "opsz" 32;
}
p {
  font-variation-settings: "wght" 400, "opsz" 14;
}
```

Common axes: `"wght"` (weight), `"wdth"` (width), `"opsz"` (optical size), `"ital"` (italic). Prefer semantic properties (`font-weight`, `font-stretch`, `font-style`) when possible—engines map them to axes.

---

## 7) System rendering tweaks
- `text-rendering: optimizeLegibility;` (historical; engines often auto-optimize now).
- `-webkit-font-smoothing: antialiased;` (WebKit quirk; use sparingly—it can thin text too much).
- Prefer **real** typographic control first (size/line-height/contrast) before using rendering switches.

---

## 8) Accessibility & contrast
- Use adequate contrast (WCAG 2.1 AA: body ~4.5:1).
- Keep focus outlines visible.
- Don’t rely on color alone; use weight/shape as well.
- Respect user settings (reduce motion, prefers-contrast).

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

---

## 9) Practical checklist
- [ ] Fluid type scale via `clamp()`
- [ ] Body line-height ≈ 1.5 and measure ≈ 60–70ch
- [ ] Robust font stacks with local fallbacks
- [ ] Web fonts loaded with `display=swap` (or `optional`)
- [ ] Use `font-variant-*` for numerals, ligatures, caps
- [ ] Enable hyphenation + language metadata
- [ ] Test variable font axes where available
- [ ] Validate contrast & keyboard focus
