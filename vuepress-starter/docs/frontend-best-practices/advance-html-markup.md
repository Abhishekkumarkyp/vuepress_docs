---
title: HTML & Semantic Markup
---

# HTML and Semantic Markup Best Practices

Semantic HTML provides structure and meaning to content, improving accessibility, SEO, and maintainability. This guide outlines **semantic HTML and markup best practices** across frameworks like **Vue, React, Angular, Next.js, and Nuxt**.

## Why Semantic HTML Matters

- Improves **accessibility (a11y)** with clear roles.
- Enhances **SEO** by conveying document structure.
- Boosts **maintainability** with meaningful tags.
- Provides **better interoperability** with screen readers, crawlers, and tools.

---

## Core Semantic Elements

- **`<header>`**: Introductory content, page or section headers.
- **`<nav>`**: Navigation links.
- **`<main>`**: Unique main content of the page.
- **`<article>`**: Independent content (blog post, news).
- **`<section>`**: Thematic grouping of content.
- **`<aside>`**: Sidebars, tangential content.
- **`<footer>`**: Footer of a section or page.

Example:
```html
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Blog Post Title</h1>
    <p>Post content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 My Website</p>
</footer>
```

---

## Forms and Inputs

- Always use `<label>` with form controls for accessibility.
- Group related controls with `<fieldset>` and `<legend>`.
- Provide placeholders and helper text carefully (don’t replace labels).

Example:
```html
<form>
  <fieldset>
    <legend>Contact Info</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />
  </fieldset>
  <button type="submit">Submit</button>
</form>
```

---

## Lists, Tables, and Data

- Use **`<ul>`** and **`<ol>`** for lists, not `<div>`s.
- Mark up tabular data with `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>`.
- Add `scope="col"` or `scope="row"` to headers for accessibility.

Example:
```html
<table>
  <thead>
    <tr><th scope="col">Name</th><th scope="col">Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>30</td></tr>
    <tr><td>Bob</td><td>25</td></tr>
  </tbody>
</table>
```

---

## Accessibility (a11y) Guidance

- Use **alt attributes** on images: `<img src="photo.jpg" alt="Description" />`.
- Add ARIA roles only when semantic tags are insufficient.
- Ensure keyboard navigation works (focus order, `tabindex`).

---

## Landmark Roles and ARIA Basics

Landmark roles (often implied by tags):
- `<header role="banner">`
- `<nav role="navigation">`
- `<main role="main">`
- `<footer role="contentinfo">`

Use ARIA attributes like `aria-label` for clarity, but prefer native HTML first.

---

## Layout Patterns

### Card Layout
```html
<article class="card">
  <img src="thumb.jpg" alt="Thumbnail" />
  <h2>Card Title</h2>
  <p>Card description...</p>
</article>
```

### Media Object
```html
<div class="media">
  <img src="avatar.jpg" alt="User avatar" />
  <div class="media-body">
    <h3>User Name</h3>
    <p>Comment text...</p>
  </div>
</div>
```

---

## Framework-Specific Notes

- **Vue**: Templates use normal HTML, with directives (`v-bind`, `v-for`). Ensure semantic tags in templates.
- **React**: Use `className` instead of `class`. Always close tags (`<img />`, `<input />`).
- **Angular**: Template syntax `[attr]` for attributes; otherwise standard HTML applies.
- **Next.js / Nuxt.js**: Support semantic HTML as in React/Vue. Use semantic tags for layouts and components.

---

## Key Takeaways

- Use semantic tags for **structure** and **meaning**.
- Always label form inputs and provide alt text for media.
- Use lists and tables appropriately.
- Keep accessibility in mind with ARIA roles and keyboard navigation.
- Semantic HTML improves both **usability** and **SEO**.
