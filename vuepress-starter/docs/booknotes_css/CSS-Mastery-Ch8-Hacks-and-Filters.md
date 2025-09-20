
---
title: CSS Mastery — Chapter 8 Notes
sidebar: auto
---

# Chapter 8 — Hacks & Filters

> Goal: understand when (and when **not**) to use CSS hacks/filters, and know the safer patterns to target specific browsers or rule-parsing behaviors.

---

## 1) Introduction & Caution

- **Hacks** exploit parsing quirks to feed styles to some browsers but not others.  
- **Filters** conditionally deliver separate stylesheets or rules to targeted browsers.  
- Use **sparingly** and **document** the reason; prefer fixing the root cause or using progressive enhancement.

---

## 2) Using Hacks Sensibly — General Guidelines

- Keep core layout/styles working **without** hacks first.  
- Apply the **least invasive** technique, scoped as narrowly as possible.  
- Prefer **filters** (explicit targeting) over brittle parsing hacks.  
- **Comment** every hack with the browser/version and the bug being addressed.

---

## 3) Filtering Entire Stylesheets

### 3.1 Internet Explorer Conditional Comments (classic IE-only)
Deliver extra CSS files only to IE (<= IE9 standards era).

```html
<!--[if IE]><link rel="stylesheet" href="ie.css"><![endif]-->
<!--[if lt IE 7]><link rel="stylesheet" href="ie6.css"><![endif]-->
```

**Pros:** explicit, readable, easy to remove later.  
**Cons:** IE-only feature; not for non-IE browsers.

### 3.2 “Band-Pass” Filters (narrow target window)
Use combinations of conditions (UA detection or feature tests) to send a stylesheet only to a **band** of browsers (e.g., IE6–IE7, or Mac IE5 only). Prefer capability/feature detection when possible.

---

## 4) Filtering Individual Rules

> These target specific selector/engine quirks so a rule is read by some browsers and ignored by others. Prefer these only when a whole extra CSS file is overkill.

### 4.1 Child Selector Hack
Older IE (< 7) didn’t support the child selector (`>`), so rules inside a `html > body` block would be ignored there, but parsed by modern browsers.

```css
/* parsed by modern browsers, ignored by old IE */
html > body .nav a { padding: .6em 1em; }
```

### 4.2 Attribute Selector Hack
Legacy IE versions lacked support for attribute selectors. Use one to hide a rule from them:

```css
/* parsed by modern browsers, ignored by old IE */
a[class^="btn-"] { display: inline-block; }
```

### 4.3 Star HTML Hack (IE/Win parsing quirk)
Exploit `* html` (bogus selector) that IE/Win used to accept as matching the root. **Modern browsers ignore it.**

```css
/* Affects old IE only */
* html .sidebar { width: 198px; } /* compensate for old box bugs */
```

### 4.4 IE/Mac Commented Backslash Hack
A parser bug in IE5/Mac respected declarations after a specially crafted comment/backslash sequence. Use only for historical code archaeology.

```css
.selector { property: value; }/*\*/ .selector { property: alt; } /**/
```

### 4.5 Escaped Property Hack
Insert an escaped character so specific engines drop a declaration while others keep it.

```css
.box { width: 400px; w\idth: 380px; } /* second width ignored by some engines */
```

### 4.6 Tantek’s Box Model Hack (legacy workaround)
Feed one `width` to old IE (wrong box model) and another to standards-compliant browsers.

```css
/* old IE sees width: 400px; compliant browsers override with actual content-box width */
.box { width: 400px; voice-family: ""}""; voice-family: inherit; width: 360px; }
```

### 4.7 Modified / Simplified Box Model Hacks
Variants that reduce complexity while still splitting rules between IE and standards-compliant browsers. Prefer removing these today by avoiding fixed-width + padding conflicts.

### 4.8 `!important` and Underscore Hacks
- **`!important` split:** engines differ in how they prioritize important declarations in older eras.  
- **Underscore prefix:** `_property: value;` parsed by old IE; ignored elsewhere.

```css
/* underscore hack — IE6 reads, others drop */
.content { _height: 1%; } /* also used to trigger ‘hasLayout’ */
```

### 4.9 The Owen Hack
Another historical IE-targeting pattern using malformed selectors/comments to branch declarations. Treat as deprecated; keep only in legacy code.

---

## 5) Strategy & Cleanup

- Prefer **feature detection** and progressive enhancement over UA- or bug-targeted hacks.  
- Where possible, **remove** old hacks once the targeted browsers fall out of support.  
- **Centralize** legacy fixes in a single file (e.g., `legacy-ie.css`) to ease deletion later.  
- Add **test cases** that lock in expected behavior and prevent regressions when cleaning up.

---

## Quick Checklist

- [ ] First: fix the **root** CSS/markup issue if possible.  
- [ ] If not: choose the **narrowest** hack or a **filtered** stylesheet.  
- [ ] Comment every hack with **browser/version + reason**.  
- [ ] Periodically **audit & delete** hacks when no longer needed.  
- [ ] Prefer **standards** and **feature detection** going forward.
