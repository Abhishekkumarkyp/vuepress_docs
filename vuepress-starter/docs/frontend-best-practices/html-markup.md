---
title: HTML & Semantic Markup
---

# HTML & Semantic Markup

HTML forms the backbone of every frontend. Writing **semantic, accessible, and clean** markup ensures better SEO, accessibility, and maintainability.

---

## General Guidelines

- Always use **semantic tags** (`<header>`, `<main>`, `<article>`, `<footer>`) instead of generic `<div>`s.  
- Ensure the **DOM hierarchy** is logical and meaningful.  
- Avoid unnecessary nesting → flatter structures are easier to read.  
- Use **lowercase for tags and attributes**.  
- Keep attributes ordered: `id`, `class`, `name`, `src/href`, `alt`, `title`, etc.

---

## Accessibility (a11y)

- Always provide **alt text** for images.  
- Use **ARIA roles** only when semantic tags are insufficient.  
- Form inputs must have **associated labels**.  
- Ensure proper **tab order** for keyboard navigation.  
- Headings should follow hierarchy → `h1 > h2 > h3` (no skipping levels).  

---

## Forms & Inputs

- Use the **correct input type** (`email`, `number`, `date`, `password`, etc.) for better UX and validation.  
- Group related fields with `<fieldset>` and `<legend>`.  
- Always include **placeholder + label**, not just placeholder.  
- Use `required`, `min`, `max`, and `pattern` attributes for basic validation.  

---

## SEO Best Practices

- Only one `<h1>` per page → must describe the primary purpose.  
- Use descriptive `<title>` and `<meta>` tags.  
- Ensure meaningful `alt` attributes for images.  
- Use structured data (`schema.org`) where possible.  
- Avoid duplicate content in headings and titles.

---

## Performance Tips

- Minimize use of `<img>` by using CSS backgrounds when images are decorative.  
- Use **lazy loading** (`loading="lazy"`) for images below the fold.  
- Prefer **SVG** for icons over PNG/JPG.  
- Inline small SVGs, but externalize large images for caching.

---

## Benefits of Semantic HTML

- **Accessibility** → Screen readers interpret content correctly.  
- **SEO** → Search engines understand and rank pages better.  
- **Maintainability** → Clear markup is easier to update.  
- **Performance** → Optimized HTML reduces page load.  
- **Consistency** → Uniform practices reduce bugs in large projects.

---

## Key Takeaway

> Semantic HTML is not optional — it’s the **foundation of accessibility, SEO, and maintainability** in modern web applications.
