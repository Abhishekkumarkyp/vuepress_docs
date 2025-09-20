---
title: State Management
---

# State Management

State management handles how data flows across components. A clear strategy avoids **prop drilling**, makes data predictable, and simplifies debugging.

---

## General Principles

- Keep state as **local as possible**.  
- Lift state up only when multiple components need it.  
- Use a **central store (Vuex or Pinia)** for shared/global state.  
- Ensure state is **predictable, serializable, and testable**.  
- Avoid unnecessary complexity → don’t overuse global state.

---

## Local State

- Use **props and emits** for parent-child communication.  
- Use **provide/inject** for deeper component trees where Vuex/Pinia is overkill.  
- Use **composables (`/composables/`)** for reusable reactive logic.

---

## Global State with Pinia (Recommended)

Pinia is the official state management solution for Vue 3.

```ts
// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { id: number; name: string } | null,
    isLoggedIn: false
  }),
  actions: {
    setUser(user: any) {
      this.user = user
      this.isLoggedIn = true
    },
    logout() {
      this.user = null
      this.isLoggedIn = false
    }
  }
})
```


## Usage inside a Component
```ts
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
userStore.setUser({ id: 1, name: 'Alice' })
```

# State Management Guidelines

## Vuex (Legacy)
- Vuex is still valid in existing **Vue 2** projects.  
- For **Vue 3**, prefer **Pinia**.

## Best Practices
- Keep state **normalized** → avoid deeply nested structures.  
- Use **getters** for derived/computed state.  
- Group state into **modules** (e.g., `auth`, `cart`, `settings`).  
- Persist critical state (like **auth tokens**) using `localStorage` or `pinia-plugin-persistedstate`.  
- Avoid directly mutating state outside **store actions**.  

## Debugging & Tools
- Use **Vue DevTools** for state inspection.  
- Log state changes during development.  
- Write **tests** for critical store logic.  

## Benefits of Good State Management
- **Predictability** → single source of truth.  
- **Scalability** → supports large apps with complex flows.  
- **Maintainability** → changes are localized to store actions.  
- **Collaboration** → developers understand shared state easily.  
- **Debugging** → state history and mutations are trackable.  
- **Performance** → avoids unnecessary re-renders with reactive stores.  

## Key Takeaway
Treat your **store as the brain** of your app.  
Keep it **lean, predictable, and modular** to ensure your application remains **easy to scale and debug**.

