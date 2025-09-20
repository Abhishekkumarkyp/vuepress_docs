---
title: Routing
---

# Routing

Routing defines how users navigate between different parts of your application. A clear and scalable routing strategy ensures a smooth **user experience** and maintainable code.

---

## General Principles

- Use **Vue Router** for navigation in Vue applications.  
- Keep routes **declarative and centralized** in `src/router/`.  
- Use **lazy loading** for views to optimize performance.  
- Always provide a **fallback (404) route**.  
- Use **named routes** for clarity instead of hardcoding paths.  

---

## Folder Structure

```text
src/
  router/
    index.ts      # main router configuration
    guards.ts     # navigation guards
  views/
    Home.vue
    About.vue
    Dashboard.vue
```
# Vue Router Best Practices

## Navigation Guards
- **Global guards** for authentication, logging, or analytics.
- **Per-route guards** for role-based access.

```ts
// src/router/guards.ts
import router from './index'

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

## Best Practices
- Group routes by **features/modules** for scalability.  
- Use **meta fields** for route-specific requirements (auth, roles, layout).  
- Avoid **deep nesting** → keep routes manageable.  
- Use **dynamic imports** to reduce bundle size.  
- Use **route params** and **query params** thoughtfully.  

## UX Considerations
- Highlight the **active link** (`router-link-active`).  
- Use **breadcrumbs** for deep navigation.  
- Provide a clear **404 page** with helpful links.  
- Preserve scroll position with `scrollBehavior`:  
```ts
scrollBehavior(to, from, savedPosition) {
  return savedPosition || { top: 0 }
}
```

# Routing Principles

## Benefits of Good Routing Practices
- **Scalability** → routes can grow with the app without becoming messy.  
- **Security** → route guards protect sensitive areas.  
- **Performance** → lazy loading reduces bundle size.  
- **User Experience** → clear navigation improves usability.  
- **Maintainability** → centralized routing makes changes easy.  

## Key Takeaway
Routing is more than **navigation** — it’s about **user flow, security, and performance**.  
A well-structured router makes your app **predictable, secure, and easy to scale**.

