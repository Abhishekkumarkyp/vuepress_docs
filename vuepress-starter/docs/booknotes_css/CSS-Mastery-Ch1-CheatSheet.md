---
title: CSS Mastery — Chapter 1 Cheat‑Sheet
sidebar: auto
---

# CSS Mastery — Chapter 1 Cheat‑Sheet
_A quick, printable guide to “Setting the Foundations” (semantic HTML + sane CSS)._

## 1) Semantic Structure First
- Use **meaningful HTML**: headings (`h1–h6`), lists (`ul/ol/dl`), emphasis (`em/strong`), quotes (`blockquote/cite`), `abbr`, `code`, tables with `caption/thead/tbody/tfoot` (only for data).
- Benefits: natural CSS hooks, better accessibility/SEO, cleaner source, easier maintenance.
- Prefer real elements; add wrappers **only** when required by layout/accessibility.

::: tip Quick test
If you removed all CSS, would the document still read logically? If yes, your HTML is probably semantic.
:::

## 2) IDs, Classes & Naming
- **ID**: unique per page (e.g., `id="siteHeader"`). **Class**: reusable (e.g., `.btn`, `.note`).
- Name for **purpose**, not presentation: prefer `.site-nav` over `.blue-links`.
- Add structural hooks directly on meaningful elements (e.g., `ul#mainNav` instead of wrapping a `div`).

## 3) Avoid “divitis” & Span Overuse
- Don’t add `<div>` just to style when a semantic element exists.
- Use `<span>` for small inline hooks (e.g., author/date inside a paragraph).

## 4) DOCTYPE, Modes & Validation
- Include a **standards-mode** DOCTYPE (e.g., HTML5):  
  ```html
  <!doctype html>
  ```
- Avoid XML prolog before DOCTYPE (legacy IE quirks). Validate early/often.
- Know **modes**: standards / almost-standards / quirks. Aim for **standards**.

## 5) Selectors: Hit the Target Cleanly
- Start simple: type (`p`), class (`.lead`), ID (`#hero`), descendant (`.card p`).
- Level up when useful:
  - **Pseudo-classes**: `:hover`, `:focus`, `:active`, `:visited`.
  - **Combinators**: child `>`, adjacent sibling `+`.
  - **Attribute**: `a[rel~="nofollow"]`, `abbr[title]`.
- Progressive enhancement: advanced selectors add **non-critical** polish; older browsers will just ignore them.

## 6) Cascade & Specificity (C>S>O)
- Order of application: user `!important` → author `!important` → author → user → UA (browser).
- Specificity ladder: inline > **#id** > **.class/pseudo/attr** > **tag**. Ties → **later wins**.
- Keep specificity **low**; set defaults broadly, override narrowly.
- Use a **body class** for page/site-level variants:  
  ```html
  <body class="home dark-theme">
  ```

## 7) Inheritance
- Typography (`font`, `color`, `line-height`) often inherit; layout (`margin/padding/border/position`) does not.
- Declare shared styles high up (e.g., on `html, body`) to reduce repetition.

## 8) Organize & Ship Styles Wisely
**Linking vs Import**
- Prefer external stylesheets via `<link>`. If using `@import`, put imports at the **top** and avoid deep chains.

**Commenting & Sections**
- Use **section headers** and searchable flags:
  ```css
  /* =Typography ------------------------------------------------------ */
  /* TODO: replace temp spacing after QA */
  ```

**Performance**
- Minify CSS for production; enable gzip on the server.
- Consider a tiny reset/normalize; set `box-sizing: border-box;` globally.

```css
/* Base */
*,
*::before,
*::after { box-sizing: border-box; }

html { line-height: 1.5; -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color: #111;
}

/* Typography defaults */
h1, h2, h3 { line-height: 1.2; }
p { margin: 0 0 1rem; }
```

## 9) Practical Patterns
- **Scoped page styles** via `body.home …` or `body.blog …`.
- **Utility classes** for common tweaks (`.visually-hidden`, `.text-center`, `.mb-0`).

```css
.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}
```

## 10) Quick Checklist (Print Me ✅)
- [ ] Semantic HTML first; CSS second.
- [ ] Clear, purpose-driven class/ID names.
- [ ] Minimal wrappers; avoid “divitis”.
- [ ] Valid HTML + standards-mode DOCTYPE.
- [ ] Simple → advanced selectors, progressively.
- [ ] Keep specificity low; use body-scope hooks.
- [ ] Leverage inheritance for typography.
- [ ] Structured comments; section headers.
- [ ] Minify & gzip in production.
- [ ] Maintain a small style guide for the team.

---

**Tip for teams:** Maintain a living “UI/ CSS Playbook” (components, naming, patterns, accessibility notes, supported browsers) to keep everyone aligned.