---
title: Final Checklist
---

# Final Checklist

Before shipping a frontend project, use this checklist to ensure your application is **secure, performant, accessible, and maintainable**.

---

## ✅ Code Quality

- [ ] Code follows **naming conventions** (camelCase, PascalCase, kebab-case).  
- [ ] ESLint & Prettier run without errors.  
- [ ] No unused variables, imports, or dead code.  
- [ ] Components are small, focused, and under control in size (< 300 lines).  
- [ ] All functions and modules have meaningful names.  

---

## ✅ Project Structure

- [ ] Folders follow the recommended **structure** (`assets`, `components`, `views`, `services`, etc.).  
- [ ] No hardcoded values → configs and tokens are centralized.  
- [ ] Environment variables (`.env`) are properly managed.  

---

## ✅ Security

- [ ] All API calls use **HTTPS**.  
- [ ] Tokens are stored securely (prefer `HttpOnly` cookies).  
- [ ] No sensitive information is hardcoded.  
- [ ] Inputs are validated and sanitized.  

---

## ✅ Performance

- [ ] Components use **lazy loading** where possible.  
- [ ] Images are optimized (`srcset`, `lazy-loading`).  
- [ ] Unused CSS/JS is removed.  
- [ ] Critical CSS is prioritized for faster rendering.  
- [ ] Bundle size checked and within acceptable limits.  

---

## ✅ Accessibility

- [ ] Proper **alt text** for images.  
- [ ] Forms use labels and provide error messages.  
- [ ] App supports **keyboard navigation**.  
- [ ] Color contrast meets WCAG standards.  
- [ ] Tested with a screen reader.  

---

## ✅ Responsiveness

- [ ] Layout is **mobile-first** and tested on multiple devices.  
- [ ] Breakpoints are applied consistently.  
- [ ] No horizontal scrolling on mobile.  
- [ ] Touch targets (buttons, inputs) are large enough.  

---

## ✅ Testing

- [ ] Unit tests cover critical functions.  
- [ ] Integration tests verify workflows.  
- [ ] E2E tests cover main user journeys.  
- [ ] Tests run in CI/CD pipeline.  

---

## ✅ Documentation

- [ ] Project has a clear `README.md` with setup instructions.  
- [ ] API contracts are documented.  
- [ ] Components include comments for props, events, and slots.  
- [ ] CHANGELOG is updated for releases.  

---

## Key Takeaway

> Use this checklist before every release to ensure your frontend is **consistent, secure, performant, and user-friendly**.  
> A disciplined final review saves countless hours of bug fixing post-launch.
