
---
title: CSS Mastery — Chapter 5 Notes (Enhanced)
sidebar: auto
---

# Chapter 5 — Styling Lists & Creating Nav Bars (Enhanced Notes)

## Why lists matter
Lists provide semantic grouping and consistent hooks for styling. They are the foundation for navigation menus, sidebars, and many UI patterns.

---

## 1) Resetting list styles
```css
ul, ol { margin: 0; padding: 0; }
ul { list-style: none; } /* removes default bullets */
```
Different browsers use margin vs. padding for indentation, so reset both.

---

## 2) Custom bullets
```css
ul.custom li {
  background: url(/img/bullet.png) no-repeat 0 .65em;
  padding-left: 28px;
}
```
- Use `50%` vertical align for single-line items.  
- Use `top` for multi-line items.

---

## 3) Vertical navigation menus
**Markup:**
```html
<ul id="mainNav">
  <li class="home"><a href="/">Home</a></li>
  <li class="about"><a href="/about">About</a></li>
  <li class="services"><a href="/services">Services</a></li>
  <li class="contact"><a href="/contact">Contact</a></li>
</ul>
```

**CSS:**
```css
#mainNav { margin:0; padding:0; list-style:none; width:220px; }
#mainNav li { display:inline; } /* legacy IE gap fix */
#mainNav a {
  display:block;
  padding:.65rem .9rem;
  background:#f4f6fb url(/img/nav-sprite.png) no-repeat right top;
  text-decoration:none;
  color:#222;
}
#mainNav a:hover { background-position:right -40px; color:#0b59ff; }
```

**Highlighting current page (body ID method):**
```css
#services #mainNav .services a {
  background-position:right -80px;
  color:#fff;
  cursor:default;
}
```

::: tip Accessibility
Use `aria-current="page"` on the current link for screen readers.
:::

---

## 4) Horizontal navigation menus
**HTML:**
```html
<ul class="nav-horizontal">
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Services</a></li>
  <li><a href="#">Contact</a></li>
</ul>
```

**Float-based CSS (legacy):**
```css
.nav-horizontal { float:left; list-style:none; background:#0b59ff; }
.nav-horizontal li { float:left; }
.nav-horizontal a {
  display:block;
  padding:.75rem 1.25rem;
  color:#fff; text-decoration:none;
}
```

**Flexbox (modern):**
```css
.nav-flex {
  display:flex; justify-content:space-around;
  list-style:none; background:#0b59ff; margin:0; padding:0;
}
.nav-flex a { display:block; padding:.5rem 1rem; color:#fff; text-decoration:none; }
```

---

## 5) “Sliding Doors” tabs (legacy)
Two background images: one on `<li>` (right end), one on `<a>` (left end). Allows rounded, stretchable tabs.

```css
.tabs li {
  float:left;
  background:url(/img/tab-right.png) no-repeat top right;
}
.tabs a {
  display:block;
  padding:0 1.25em;
  line-height:2.5em;
  background:url(/img/tab-left.png) no-repeat top left;
  color:#fff; text-decoration:none;
}
```

::: warning Legacy
Replace with `border-radius` + `box-shadow` + gradients today.
:::

---

## 6) Pure CSS image maps
```html
<div id="team-photo">
  <img src="/img/team.jpg" width="640" height="425" alt="Team">
  <ul>
    <li class="alice"><a href="/alice">Alice</a></li>
    <li class="bob"><a href="/bob">Bob</a></li>
  </ul>
</div>
```

```css
#team-photo { position:relative; width:640px; height:425px; }
#team-photo ul { list-style:none; margin:0; padding:0; }
#team-photo a {
  position:absolute; width:100px; height:120px;
  text-indent:-9999px;
}
#team-photo .alice a { top:15px; left:95px; }
#team-photo .bob a   { top:115px; left:280px; }
#team-photo a:hover { border:2px solid #fff; }
```

---

## 7) Remote rollovers
```html
<a class="remote" href="/project">
  <span class="hotspot"></span>
  <span class="label">Project</span>
</a>
```

```css
.remote { position:relative; display:inline-block; padding:.5rem 1rem; }
.remote .hotspot { position:absolute; inset:0; border:2px solid transparent; }
.remote:hover .hotspot { border-color:#0b59ff; }
.remote:hover .label { color:#0b59ff; text-decoration:underline; }
```

---

## 8) Definition lists – use responsibly
- `<dl>` is for terms (`<dt>`) and definitions (`<dd>`).  
- Avoid using for layouts unless semantics truly fit.

---

## 9) Best practices checklist
- [ ] Reset list styles (`margin:0; padding:0; list-style:none;`)
- [ ] Use block anchors for full clickable area
- [ ] Provide hover/active feedback (sprites or colors)
- [ ] Indicate current page (`aria-current` + visual highlight)
- [ ] Use modern layout tools (Flexbox, Grid)
- [ ] Keep HTML semantic (avoid extra clears/divs)
- [ ] Ensure accessibility: don’t use `display:none` on meaningful text
- [ ] Prefer CSS3 features (`border-radius`, gradients) over legacy image hacks

