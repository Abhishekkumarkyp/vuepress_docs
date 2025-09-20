---
title: Animations & Transitions
description: Create sophisticated animations with transitions, keyframes, scroll-driven timelines, and performance considerations.
sidebarDepth: 2
tags:
  - css
  - animations
  - transitions
  - keyframes
  - scroll-timeline
  - accessibility
---

# Animations & Transitions

CSS animations breathe life into interfaces. Beyond simple fades, modern CSS offers keyframe animations, scroll timelines, and fine control over timing functions. This chapter explores these features while emphasizing performance and accessibility.

## Table of Contents
- [Transitions & Easing](#transitions--easing)
- [Keyframe Animations](#keyframe-animations)
- [Scroll & View Timelines](#scroll--view-timelines)
- [Performance & Will-Change](#performance--will-change)
- [Accessibility & Reduced Motion](#accessibility--reduced-motion)
- [Gotchas & Best Practices](#gotchas--best-practices)
- [Quick Cheatsheet](#quick-cheatsheet)
- [Practice Tasks](#practice-tasks)
- [Review Questions](#review-questions)
- [Related Links](#related-links)

## Transitions & Easing

Transitions interpolate property values when they change. Control duration, timing function, and delay. Custom easing functions using cubic-bezier curves produce natural motion.

```css
.link {
  color: var(--primary, #06c);
  transition: color .3s cubic-bezier(.4,0,.2,1);
}
.link:hover {
  color: var(--primary-dark, #024);
}

.accordion {
  max-height: 0;
  overflow: hidden;
  transition: max-height .5s ease;
}
.accordion.open {
  max-height: 20rem;
}
```

```html
<a class="link" href="#">Hover me</a>
<div class="accordion">Content reveals smoothly when the class 'open' is toggled.</div>
```

## Keyframe Animations

Keyframes define intermediate steps of an animation. Use multiple properties and transforms for complex sequences. Combine with custom properties for more flexibility.

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1rem); }
}
.icon {
  display: inline-block;
  animation: bounce 1s infinite ease-in-out;
}

/* Animate a registered property */
@property --progress {
  syntax: '<number>';
  initial-value: 0;
  inherits: false;
}

.progress-bar {
  --progress: 0;
  width: calc(var(--progress) * 1%);
  background: linear-gradient(to right, #0f0, #0a0);
  height: .5rem;
  transition: --progress 1s ease;
}
.progress-bar.loaded {
  --progress: 100;
}
```

```html
<span class="icon">🔔</span>
<div class="progress-bar"></div>
```

## Scroll & View Timelines

Scroll-driven animations tie progress to the page’s scroll position. The `@scroll-timeline` rule defines a timeline that maps scroll progress to animation progress. `view-timeline` attaches the timeline to a specific element's visibility.

```css
@scroll-timeline my-scroll {
  scroll-source: auto;
  start: auto;
  end: 1 1;
}

.slide-in {
  animation: fade-slide 1s ease-out;
  animation-timeline: my-scroll;
  animation-range: 0 50%;
}

@keyframes fade-slide {
  from { opacity: 0; transform: translateX(-50%); }
  to { opacity: 1; transform: translateX(0); }
}
```

```html
<section class="slide-in">This content fades and slides in as you scroll.</section>
```

View timelines apply to an element's visibility within its container. Use `view-timeline-name` and `animation-timeline: <name>`.

## Performance & Will-Change

Animations can cause layout thrashing or paint storms if they affect properties like `top` or `width`. Prefer transforms and opacity for more efficient animations. The `will-change` property hints to the browser to pre‑allocate resources for upcoming changes but should be used sparingly.

```css
.badge {
  transition: transform .3s ease;
}
.badge:hover {
  transform: scale(1.1);
}

.card[will-change="transform"] {
  will-change: transform;
}
```

```html
<div class="badge">Hover me</div>
<div class="card" will-change="transform">Prepare for heavy transform animations.</div>
```

## Accessibility & Reduced Motion

Always respect the `prefers-reduced-motion` media feature when designing animations【32771850075209†L190-L221】. Provide alternatives or disable non-essential movement to avoid vestibular discomfort. Use reduced motion states or cut the durations to near-zero.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: .001s !important;
    transition-duration: .001s !important;
  }
}
```

## Gotchas & Best Practices
- Don’t animate properties that trigger layout (e.g., width, height, margin). Use transforms and opacity instead.
- Combine animations with `transition-delay` to create staggering effects.
- Register animatable custom properties via `@property` for better performance.
- Use scroll timelines judiciously; not all browsers support them yet.
- Provide a reduced motion fallback for users with motion sensitivities【32771850075209†L190-L221】.

## Quick Cheatsheet
- **Transition**: `transition: property duration timing-function delay`.
- **Keyframes**: `@keyframes`, `from`/`to`, percentages.
- **Scroll Timeline**: `@scroll-timeline`, `animation-timeline`, `animation-range`.
- **View Timeline**: `view-timeline-name`, `animation-timeline`.
- **Performance**: animate `opacity` and `transform`; avoid layout properties.

## Practice Tasks
1. Create an accordion component that animates height using transforms rather than `max-height`.
2. Implement a scroll-driven animation that fades in sections as they enter the viewport using scroll timelines.
3. Register a custom property for color and animate it across a progress bar.
4. Build a bounce animation using keyframes and test with `prefers-reduced-motion` disabled and enabled.

## Review Questions
1. When should you use transitions versus keyframe animations?
2. Why are transforms and opacity preferred for performance over width or top?
3. What does the `will-change` property do and when should you use it?
4. How do scroll timelines differ from regular animations?
5. Describe how to respect user motion preferences with CSS【32771850075209†L190-L221】.

## Related Links
- [/css/03-styling-techniques.md](/css/03-styling-techniques.md)
- [/css/09-performance-best-practices.md](/css/09-performance-best-practices.md)
- [/css/11-accessibility.md](/css/11-accessibility.md)

