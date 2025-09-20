---
title: Expert Topics
description: Master advanced selectors, pseudo-classes, at-rules, cascade layers, scope, and progressive enhancement strategies.
sidebarDepth: 2
tags:
  - css
  - expert
  - selectors
  - at-rules
  - cascade
  - progressive-enhancement
---

# Expert Topics

For seasoned developers, CSS offers a wealth of powerful features. This chapter explores advanced selectors, pseudo-classes, modern at-rules, cascade layers, environment variables, and strategies for progressive enhancement.

## Table of Contents
- [Advanced Selectors & Combinators](#advanced-selectors--combinators)
- [Pseudo-classes & Pseudo-elements](#pseudo-classes--pseudo-elements)
- [Modern At-Rules](#modern-at-rules)
- [Cascade Layers & Custom Rules](#cascade-layers--custom-rules)
- [Environment Variables & Viewport Units](#environment-variables--viewport-units)
- [Progressive Enhancement & Fallbacks](#progressive-enhancement--fallbacks)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Advanced Selectors & Combinators

Modern CSS includes advanced selectors like `:has()`, `:is()`, `:where()`, `:nth-child()` with formulas, and the relational combinator `:scope > :not(:first-child)`. Use them to target complex patterns with minimal markup.

```css
/* Parent highlighting if it contains a checked checkbox */
label:has(input:checked) {
  background: #def;
  border-left: 4px solid #39f;
}

/* Target the first article only if it's followed by a second */
article:nth-child(1 of article:nth-last-child(n+2)) {
  border-bottom: 1px solid #ccc;
}

/* Use :is() to group selectors without increasing specificity */
nav :is(a, button) {
  padding: .5rem 1rem;
}
```

```html
<label><input type="checkbox"> Select me</label>
<nav>
  <a href="#">Link</a>
  <button>Action</button>
</nav>
```

## Pseudo-classes & Pseudo-elements

Pseudo-classes like `:target`, `:focus-visible`, `:nth-of-type`, and `:not()` handle element states and positions. Pseudo-elements (`::before`, `::after`, `::slotted()`) create extra elements for styling or target distributed content in Web Components.

```css
.accordion input:focus-visible + label {
  outline: 2px dashed #09f;
}

a:target {
  background: yellow;
}

/* Slotted content in Shadow DOM */
my-element::slotted(.highlight) {
  color: crimson;
}
```

```html
<div class="accordion">
  <input id="q1" type="checkbox">
  <label for="q1">Question 1</label>
  <div>Answer 1</div>
</div>
```

## Modern At-Rules

CSS introduces new at-rules beyond `@media` and `@font-face`: `@container` for container queries【107830350795899†L206-L224】, `@layer` for cascade organization, `@scope` for scoping styles, and `@property` for custom property registration【460321113036012†L186-L194】.

```css
@layer utilities {
  .text-muted { color: #666; }
}

@scope (.card) {
  .button { margin-block-end: 1rem; }
}

@supports (animation-timeline: scroll()) {
  @scroll-timeline timeline {
    start: cover 0%;
    end: cover 100%;
  }
}
```

Use `@supports` to test for feature availability and provide fallbacks.

## Cascade Layers & Custom Rules

Cascade layers (`@layer`) define distinct layers of the cascade, giving fine-grained control over override order. Combined with `@property` and `@nest`, they enable modular and encapsulated styling.

```css
@layer theme {
  :root { --spacing: 1rem; }
}

@layer components {
  .alert {
    padding: var(--spacing);
    border-left: 4px solid currentColor;
  }
}

/* Nest rules to avoid repetition */
.nav {
  display: flex;
  > li {
    margin-inline-end: .5rem;
    &:last-child { margin-inline-end: 0; }
  }
}
```

`@nest` allows nested rules similar to preprocessors but is still experimental. Always provide flat CSS for unsupported browsers.

## Environment Variables & Viewport Units

CSS environment variables (`env()`) expose system metrics like safe area insets on iOS (notch spacing). Use `constant()` as a fallback for older Safari.

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

/* Fallback for old Safari */
body {
  padding: constant(safe-area-inset-top) constant(safe-area-inset-right) constant(safe-area-inset-bottom) constant(safe-area-inset-left);
}
```

Logical viewport units like `svh`, `lvw`, and `dvh` adapt to mobile browser UI changes (scrollbars, address bars). Use them instead of `vh` or `vw` for more stable layouts.

## Progressive Enhancement & Fallbacks

Always deliver core functionality with widely supported features and layer in advanced capabilities. Use `@supports` and `@media` queries to conditionally apply enhancements. Provide fallback values for custom properties and animation.

```css
.banner {
  background: url("hero.jpg") center/cover no-repeat;
  min-height: 50vh;
  display: grid;
  place-content: center;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,.5);
}
@supports (background-blend-mode: multiply) {
  .banner {
    background-blend-mode: multiply;
    background-color: rgba(0,0,0,.5);
  }
}
```

## Gotchas & Best Practices
- Advanced selectors like `:has()` may have limited support; provide fallbacks.
- Avoid excessive specificity; prefer component-level encapsulation via classes and layers.
- Use `@supports` blocks to guard experimental features.
- `@nest` is not widely implemented; use a preprocessor or flatten as fallback.
- Keep progressive enhancement top of mind: baseline support first, enhancements second.

## Quick Cheatsheet
- **Selectors**: `:has()`, `:is()`, `:where()`, `:nth-child()`, complex formulas.
- **Pseudo**: `:target`, `:focus-visible`, `::slotted()`.
- **At-Rules**: `@container`, `@layer`, `@scope`, `@property`, `@supports`.
- **Environment**: `env(safe-area-inset-top)`, `svh`, `lvh`, `dvh`.
- **Progressive**: provide fallbacks and test feature support.

## Practice Tasks
1. Use `:has()` to style a parent element based on a child’s state; create a fallback using JavaScript or simpler selectors.
2. Create a component with nested rules using `@nest` and flatten it for unsupported browsers.
3. Implement a banner that uses environment variables to avoid the iPhone notch area.
4. Build a feature detection using `@supports` to enable scroll-driven animations only if supported.
5. Refactor a CSS file to organize rules into cascade layers and demonstrate the override order.

## Review Questions
1. How do `:has()`, `:is()`, and `:where()` differ in specificity and intent?
2. What do `@container` and `@scope` provide beyond traditional media queries【107830350795899†L206-L224】?
3. Explain the purpose of environment variables like `env(safe-area-inset-top)`.
4. Why is progressive enhancement important when using experimental features?
5. Describe the benefits of cascade layers and how they interact with specificity.

## Related Links
- [/css/01-foundations.md](/css/01-foundations.md)
- [/css/04-responsive-design.md](/css/04-responsive-design.md)
- [/css/07-advanced-layouts.md](/css/07-advanced-layouts.md)
- [/css/11-accessibility.md](/css/11-accessibility.md)

