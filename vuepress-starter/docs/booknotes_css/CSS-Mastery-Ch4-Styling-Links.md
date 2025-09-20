
---
title: CSS Mastery — Chapter 4 Notes
sidebar: auto
---

# Chapter 4 — Styling Links (Deep Notes)

## Overview
Learn to style anchors accessibly and effectively: order pseudo-classes correctly, craft tasteful underlines, distinguish external/download links, turn anchors into **buttons** with **rollovers**, create **visited-link indicators**, and build **pure CSS tooltips**.

---

## 1) Correct order of link states (cascade-safe)
Because rules with the same specificity are applied in source order, write link-state rules in **LoVe:HAte** order:

```css
/* L  V   H    A */
a:link, a:visited, a:hover, a:active { /* ... */ }
```

This prevents `:link`/`:visited` from overriding `:hover`/`:active`.

---

## 2) Underlines that look good *and* aid usability

### Keep links distinguishable
If you remove the default underline, add another cue (weight, color, or a custom underline).

**Border underline (low visual weight):**
```css
a:link, a:visited {
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
}
a:hover, a:active {
  border-bottom-style: solid;
}
```

**Fancy underline using a background image:**
```css
a:link, a:visited {
  color: #666;
  text-decoration: none;
  background: url(/images/underline-diagonal.gif) repeat-x left bottom;
}
a:hover, a:active {
  background-image: url(/images/underline-diagonal-anim.gif); /* degrades to first frame */
}
```

---

## 3) Highlight different link *types*

### External links (attribute selectors)
Start by flagging all absolute-URL links, then **reset** for your own domain:
```css
/* highlight external */
a[href^="http:"] {
  background: url(/images/externalLink.gif) no-repeat right .1em;
  padding-right: 12px;
}

/* but *not* your own site */
a[href^="http://example.com"],
a[href^="http://www.example.com"] {
  background-image: none;
  padding-right: 0;
}
```

> Older IE (≤6) ignores these selectors; if you must support it, add classes via a small JS utility and style the class.

### Protocol-specific links
```css
a[href^="mailto:"] { background: url(/images/email.png) no-repeat right .1em; padding-right: 12px; }
a[href^="aim:"]    { background: url(/images/im.png)    no-repeat right .1em; padding-right: 12px; }
```

### Download indicators and feeds
```css
a[href$=".pdf"] { background: url(/images/pdfLink.gif)  no-repeat right .1em; padding-right: 12px; }
a[href$=".doc"] { background: url(/images/wordLink.gif) no-repeat right .1em; padding-right: 12px; }
a[href$=".rss"],
a[href$=".rdf"] { background: url(/images/feedLink.gif) no-repeat right .1em; padding-right: 12px; }
```

---

## 4) Make anchors behave like buttons

**Turn on block layout + define a hit area:**
```css
a.button {
  display: block;
  width: 6em;       /* explicit width helps old IE make whole area clickable */
  padding: .2em .6em;
  line-height: 2;   /* vertical centering trick */
  background: #94B8E9;
  border: 1px solid #000;
  color: #000;
  text-decoration: none;
  text-align: center;
}
```

**Simple rollover (no images):**
```css
a.button:hover { background: #369; color: #fff; }
```

**Image rollover (two files):**
```css
a.roll {
  display: block;
  width: 200px; height: 40px; line-height: 40px;
  color: #000; text-decoration: none; text-indent: 50px;
  background: #94B8E9 url(/images/button.gif) no-repeat left top; /* up */
}
a.roll:hover {
  background: #369 url(/images/button_over.gif) no-repeat left top; /* over */
  color: #fff;
}
```

**Sprite/Pixy method (single image, swap background-position):**
```css
a.sprite {
  display: block;
  width: 200px; height: 40px; line-height: 40px;
  text-decoration: none; text-indent: 50px; color: #000;
  background: #94B8E9 url(/images/pixy-rollover.gif) no-repeat left top; /* up state */
}
a.sprite:hover {
  background-position: right top; /* over state in the same sprite */
  background-color: #369; color: #fff;
}

/* IE flicker workaround: also set the sprite on the parent to help caching */
.sprite-wrap { background: #94B8E9 url(/images/pixy-rollover.gif) no-repeat right top; }
```

> For vertical centering, `line-height` ≈ height works well for **single-line** labels; avoid wrapping.

---

## 5) Visited-link styles that genuinely help
Add a small **checkmark** on visited links, or build a visited/unvisited **sprite** for sidebar lists.

**Simple checkmark:**
```css
a:visited {
  padding-right: 20px;
  background: url(/images/check.gif) right .35em no-repeat;
}
```

**Sidebar list (sprite approach):**
```css
.sidebar li a {
  display: block;
  width: 300px; height: 30px; line-height: 30px;
  text-decoration: none;
  background: #94B8E9 url(/images/visited.gif) no-repeat left top; /* unvisited */
  text-indent: 10px;
}
.sidebar li a:visited { background-position: right top; } /* visited */
```

---

## 6) Pure CSS tooltips (progressive enhancement)
Markup pattern:
```html
<a class="tooltip" href="...">Link text<span>(Tooltip text)</span></a>
```
CSS:
```css
a.tooltip { position: relative; }
a.tooltip span { display: none; }
a.tooltip:hover span {
  display: block;
  position: absolute; top: 1em; left: 2em;
  padding: .2em .6em; border: 1px solid #996633;
  background: #FF6; color: #000;
}
/* Old IE quirk fix */
a.tooltip:hover { font-size: 100%; }
```

> Works best in modern, standards-compliant browsers; keep as an enhancement, not a requirement.

---

## 7) Checklist
- [ ] Use **LoVe:HAte** ordering for link states.
- [ ] Keep links identifiable—use tasteful borders or background underlines.
- [ ] Flag **external**, **download**, and **feed** links for clarity.
- [ ] Convert anchors to **buttons** with `display:block`; add rollovers via color, images, or sprites.
- [ ] Provide **visited** feedback (e.g., checkmarks) where it aids orientation.
- [ ] Treat **CSS tooltips** as progressive enhancement; ensure content still reads without them.
