---
title: Documentation & Comments
---

# Documentation & Comments

Good documentation and meaningful comments ensure that **code is understandable, maintainable, and easy to onboard for new developers**. Code should explain itself where possible, and documentation should explain the bigger picture.

---

## General Principles

- Document the **why**, not the obvious **what**.  
- Keep documentation **close to the code** (JSDoc, TSDoc, inline).  
- Maintain a **project-level guide** for high-level practices.  
- Outdated documentation is worse than none → keep it updated.  

---

## Code Comments

- Use comments for **complex logic, decisions, or assumptions**.  
- Avoid redundant comments that restate code.  

❌ Bad:
```ts
// increment i by 1
i = i + 1
