---
title: Print Styles & Media
description: Learn to create print-friendly styles using media queries, page settings, pagination controls, and print-specific units.
sidebarDepth: 2
tags:
  - css
  - print
  - media
  - page
  - pagination
---

# Print Styles & Media

While CSS is often used for screen experiences, print styles remain essential for documents, reports, and offline reading. This chapter covers print media queries, page rules, controlling pagination, and tailoring content for print.

## Table of Contents
- [Print Media Queries & @page](#print-media-queries--page)
- [Sizing & Units for Print](#sizing--units-for-print)
- [Page Breaks & Pagination](#page-breaks--pagination)
- [Hiding & Adjusting Content](#hiding--adjusting-content)
- [Print to PDF & Accessibility](#print-to-pdf--accessibility)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Print Media Queries & @page

Use `@media print` to apply styles exclusively for printing. The `@page` rule controls page margins, size, and marks. Combine with region-specific @page selectors like `:first` or `:left`/`:right`.

```css
@media print {
  body { color: #000; background: none; }
  a::after { content: " (" attr(href) ")"; font-size: .8em; }
}

@page {
  size: A4;
  margin: 1in;
  marks: crop;
}
@page :first {
  margin-top: 2in;
}
```

```html
<a href="https://example.com">Link to example.com</a>
```

Specify standard page sizes (A4, Letter) or custom dimensions. Crop marks assist printers; avoid them for personal printing.

## Sizing & Units for Print

Print uses physical units (`cm`, `mm`, `in`), and the default resolution is 96 DPI. Keep text legible by using fixed sizes (e.g., 12pt for body text). Control page flow with columns and avoid `vh`/`vw` units.

```css
@media print {
  h1 { font-size: 18pt; }
  p { font-size: 12pt; line-height: 1.4; }
  .two-column {
    column-count: 2;
    column-gap: 2cm;
  }
}
```

```html
<div class="two-column">
  <p>Print-specific typography with physical units.</p>
  <p>Second paragraph flows into the next column.</p>
</div>
```

## Page Breaks & Pagination

Control page breaks using `break-before`, `break-after`, and `break-inside` properties. Avoid splitting elements that must stay together (like images and captions). Use `orphans` and `widows` properties to manage lines at the start and end of pages.

```css
@media print {
  h2 { break-before: page; }
  figure { break-inside: avoid; }
  p { widows: 2; orphans: 2; }
}
```

```html
<h2>Section Title</h2>
<p>Content starts on a new page because of break-before.</p>
<figure>
  <img src="diagram.png" alt="Diagram">
  <figcaption>Illustration stays intact with caption.</figcaption>
</figure>
```

## Hiding & Adjusting Content

Hide interactive elements and unnecessary UI components from print. Provide links inline and adjust backgrounds to conserve ink.

```css
@media print {
  nav, footer, .interactive { display: none; }
  button { display: none; }
  .print-only { display: block; }
}
```

```html
<nav>Main navigation won't appear in print.</nav>
<div class="interactive">Interactive widget</div>
<div class="print-only" style="display:none">Printed version of interactive content</div>
```

## Print to PDF & Accessibility

Ensure printed documents are accessible: use clear headings, alternate text for images, and high contrast colors. When generating PDFs via browsers, include metadata and maintain a logical reading order. Avoid color-only differentiation and provide descriptive link names.

## Gotchas & Best Practices
- Don’t forget to reset backgrounds or images that may print poorly (use `background: none`).
- Provide link URLs inline or as footnotes for offline reference.
- Use consistent margins and line heights to improve readability.
- Avoid fixed positioning for elements in print; they may overlap content when paginated.
- Test print styles across browsers (Chrome, Firefox, Safari) for consistent results.

## Quick Cheatsheet
- **@media print**: apply print-specific styles.
- **@page**: set page size, margins, and marks.
- **Units**: `pt`, `cm`, `mm`, `in` for print; avoid `vh`, `vw`.
- **Breaks**: `break-before`, `break-after`, `break-inside`, `orphans`, `widows`.
- **Hide/Show**: hide interactive elements; show print-only content.

## Practice Tasks
1. Create a print stylesheet for a blog post that hides navigation and footers and adds URLs after each link.
2. Use `@page` to create a custom page size and margins, then print a report to PDF.
3. Experiment with `break-inside` on figure elements to prevent splitting images and captions.
4. Adjust typography sizes using physical units for a printable brochure.

## Review Questions
1. How does the `@page` rule influence printed output?
2. What units are appropriate for print, and why?
3. Describe how to prevent page breaks within a figure or table.
4. Why should interactive elements be hidden for print?
5. How can you add link URLs to printed pages for offline reading?

## Related Links
- [/css/02-layout-essentials.md](/css/02-layout-essentials.md)
- [/css/07-advanced-layouts.md](/css/07-advanced-layouts.md)
- [/css/14-real-world-recipes.md](/css/14-real-world-recipes.md)

