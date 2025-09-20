
---
title: CSS Mastery — Chapter 5 Notes
sidebar: auto
---

# Chapter 5 — Styling Lists & Creating Nav Bars (Deep Notes)

## Why lists matter
Lists group related items and add structure to HTML, giving you reliable hooks for styling menus, sidebars, feeds, and more. Marking list-like content as actual `<ul>/<ol>` improves both semantics and CSS control.

---

## 1) Basic list reset & bullets
**Reset inconsistent defaults across browsers:**
```css
ul, ol { margin: 0; padding: 0; }
ul { list-style: none; } /* remove bullets */
```
**Custom bullets via backgrounds:**
```css
ul.custom li {
  background: url(/img/bullet.png) no-repeat 0 .65em; /* or 50% if single-line */
  padding-left: 28px;
}
```

> If items often wrap to multiple lines, position the bullet near the **top** (e.g., `.35em`) so it stays visually aligned.

---

## 2) Vertical navigation (stacked links)
**Markup:**
```html
<ul id="mainNav">
  <li class="home"><a href="/">Home</a></li>
  <li class="about"><a href="/about">About</a></li>
  <li class="news"><a href="/news">News</a></li>
  <li class="contact"><a href="/contact">Contact</a></li>
</ul>
```

**CSS (sprite-based hover + active state):**
```css
#mainNav { margin: 0; padding: 0; list-style: none; width: 220px; }

#mainNav li {
  /* IE/legacy gap fix */
  display: inline; /* harmless in modern browsers */
}

#mainNav a {
  display: block;
  padding: .65rem .9rem;
  line-height: 1.4;
  color: #222;
  text-decoration: none;
  background: #f4f6fb url(/img/vert-sprite.png) no-repeat right top; /* default */
  border-bottom: 1px solid #e6e9f2;
}

#mainNav a:hover { background-position: right -40px; color: #0b59ff; }
#mainNav .current a,
#mainNav li a:focus { background-position: right -80px; color: #fff; }
```

**Highlight the current page automatically (no JS):**
```html
<body id="news">
  <ul id="mainNav">
    <li class="home"><a href="/">Home</a></li>
    <li class="about"><a href="/about">About</a></li>
    <li class="news"><a href="/news">News</a></li>  <!-- matches body id -->
  </ul>
</body>
```
```css
/* page-scope + menu-item class */
#news #mainNav .news a { background-position: right -80px; color: #fff; cursor: default; }
```

---

## 3) Horizontal navigation (tabs/bars)
**Lay items horizontally:**
```css
.navbar { list-style: none; margin: 0; padding: 0; background: #0b59ff; }
.navbar::after { content: ""; display: table; clear: both; } /* contain floats */

.navbar > li { float: left; }

.navbar > li > a {
  display: block;
  padding: .75rem 1.25rem;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(to bottom, rgba(255,255,255,.08), transparent);
}

.navbar > li > a:hover,
.navbar > li > a:focus { background: rgba(255,255,255,.15); }
```

**Add separators (optional):**
```css
.navbar > li + li > a { border-left: 1px solid rgba(255,255,255,.2); }
```

---

## 4) “Sliding Doors” flexible tabs (classic)
Two images create a tab that **expands with text** (legacy-friendly). Modern projects can use `border-radius`, gradients, and `box-shadow`, but this pattern helps when theming legacy code.

```css
.tabs { list-style: none; padding: 0; margin: 0; }
.tabs::after { content:""; display: table; clear: both; }

.tabs li {
  float: left;
  background: url(/img/tab-right.png) no-repeat right top; /* right edge */
}

.tabs a {
  float: left; /* ensure background shows fully */
  display: block;
  padding: .5rem 1.25rem;
  line-height: 2.2;
  color: #222; text-decoration: none;
  background: url(/img/tab-left.png) no-repeat left top;  /* left edge/curve */
}

.tabs a:hover { color: #0b59ff; }
.tabs .active a { font-weight: 600; }
```

---

## 5) Pure CSS image maps (clickable hotspots)
**Goal:** Make areas of an image clickable without `<map>`/`area>`.

```html
<div id="pic">
  <img src="/img/team.jpg" width="720" height="420" alt="Team">
  <ul class="hotspots">
    <li><a style="left:110px; top:60px; width:95px; height:120px;" href="/alice"><span class="note">Alice — Design</span></a></li>
    <li><a style="left:255px; top:70px; width:85px; height:110px;" href="/bob"><span class="note">Bob — Frontend</span></a></li>
  </ul>
</div>
```
```css
#pic { position: relative; width: 720px; height: 420px; }
#pic .hotspots { list-style: none; margin: 0; padding: 0; }
#pic .hotspots li { position: absolute; } /* each li anchors its link */

#pic a {
  position: absolute;
  border: 1px solid transparent; /* avoid layout jump on hover */
  text-indent: -9999px; overflow: hidden; /* hide label but remain accessible to SRs */
}
#pic a:hover { border-color: #0b59ff; }

/* tooltip-like note (progressive enhancement) */
#pic a .note {
  position: absolute; left: -30000px; top: 0;
  background: #fff; border: 1px solid #cbd5e1; padding: .35rem .5rem;
  color: #111; box-shadow: 0 4px 16px rgba(0,0,0,.08);
}
#pic a:hover .note { left: 8px; top: -8px; } /* slide into view on hover */
```

> Accessibility tip: avoid `display:none` for notes you want screen readers to read; position them off-canvas instead and bring them back on hover/focus.

---

## 6) Remote rollovers (hover one thing, change another)
Both the “trigger” zone and the “status” label live **inside the same `<a>`**, so a single `:hover` restyles both:

```html
<a class="remote" href="/project">
  <span class="hotspot" aria-hidden="true"></span>
  <span class="label">Project</span>
</a>
```
```css
.remote { position: relative; display: inline-block; padding: .5rem 1rem; color: #334; text-decoration: none; }
.remote .hotspot {
  position: absolute; inset: 0; border: 2px solid transparent; pointer-events: none;
}
.remote:hover .hotspot { border-color: #0b59ff; }
.remote:hover .label { color: #0b59ff; text-decoration: underline; }
```

---

## 7) Definition lists — use with care
`<dl>` is for terms/definitions (`<dt>` & `<dd>`). Avoid overloading it for unrelated layouts (galleries, two-column tricks) unless you have a clear semantic reason.

---

## 8) Checklists

**Vertical menu**
- [ ] Use a clean `<ul><li><a>` structure
- [ ] `display:block` on anchors for full-hit areas
- [ ] Sprite or color changes for hover/current
- [ ] Body ID + li class to auto-highlight current section

**Horizontal menu**
- [ ] Float `<li>` left (or use Flexbox in modern code)
- [ ] `display:block` + padding for tabs
- [ ] Optional separators on adjacent items

**Hotspots / remote rollovers**
- [ ] Parent as `position:relative` with known dimensions
- [ ] Absolutely position `<a>` for each hotspot
- [ ] Avoid `display:none` for accessible labels; move off-canvas instead

---

## Modern note
For new builds, prefer **Flexbox** and **CSS Grid** for horizontal/vertical navigation layouts; keep the list patterns for semantics, but let layout be handled by modern modules. Use `:focus-visible` styles so keyboard users get the same clarity as mouse users.
