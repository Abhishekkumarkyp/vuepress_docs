---
title: JavaScript & TypeScript
---

# JavaScript & TypeScript

JavaScript is the foundation of frontend apps, and TypeScript adds **type safety and scalability**. Following best practices ensures fewer bugs and cleaner code.

---

## General Principles

- Prefer **TypeScript** for all new projects.  
- Use **modern ES6+ features** (let/const, arrow functions, destructuring, template literals).  
- Keep functions **pure** → avoid unexpected side effects.  
- Organize logic into **modules** → avoid giant utility files.  
- Write **self-explanatory code** → minimize the need for comments.

---

## JavaScript Best Practices

- Always use `const` unless reassignment is required → then use `let`.  
- Use **strict equality (`===`)** instead of loose equality (`==`).  
- Prefer **array methods** (`map`, `filter`, `reduce`) over loops where it improves readability.  
- Avoid modifying built-in prototypes (`Array.prototype`, etc.).  
- Handle edge cases explicitly (null, undefined, empty strings, 0).  

---

## TypeScript Best Practices

- Use **interfaces** and **types** for data contracts.  

```ts
interface User {
  id: number
  name: string
  email: string
}
```


## Controlled Values
- Use **enums** or **literal types** for controlled values.
```ts
type Status = 'active' | 'inactive' | 'pending'
```


## Reusability
- Use **generics** to create reusable functions.
- Enable **strict mode** in `tsconfig.json`.

## Error Handling
- Use `try/catch` with `async/await`.
- Narrow error types instead of catching all.
- Provide **meaningful error messages**.
```ts
try {
  const response = await fetchData()
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error('Error:', err.message)
  }
}
```

## Code Organization
- Group related functions into **modules**.
- Avoid giant utility files → split into domains (`date.utils.ts`, `string.utils.ts`).
- Keep imports **clean & sorted**.
- Use **barrel files** (`index.ts`) for re-exports when appropriate.

## Tooling
- Use **ESLint** with TypeScript plugins.
- Use **Prettier** for consistent formatting.
- Enable **type-checking** in build pipelines.
- Add **unit tests** for utility functions and services.

## Benefits of Using TypeScript
- **Type safety** → fewer runtime errors.
- **Autocomplete & IntelliSense** → faster developer experience.
- **Refactorability** → easier to change code without breaking it.
- **Documentation by design** → types explain data structures.
- **Confidence** → stricter codebase reduces bugs in production.

## Key Takeaway
JavaScript gives **flexibility**, but TypeScript adds **discipline**.  
Use TypeScript wherever possible to build **scalable, maintainable, and reliable frontends**.
