---
title: API Integration
---

# API Integration

APIs connect the frontend to backend services. A clean integration strategy ensures **reliability, security, and maintainability** of your app.

---

## General Principles

- Keep all API logic inside a **dedicated `services/` layer**, never directly inside components.  
- Use a single **HTTP client** (e.g., Axios, Fetch wrapper) with interceptors.  
- Ensure all API calls are **typed** (TypeScript interfaces).  
- Always handle errors gracefully and provide meaningful feedback to users.  

---

## Folder Structure

```text
src/
  services/
    api.ts          # axios instance & interceptors
    user.service.ts # user-specific API calls
    auth.service.ts # authentication-related APIs
    ...
```


## Axios Setup (Example)
```ts
// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use(config => {
  // Attach token if available
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized globally
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```


## Example Service
```ts
// services/user.service.ts
import api from './api'

export const getUserProfile = async () => {
  const { data } = await api.get('/user/profile')
  return data
}

export const updateUserProfile = async (payload: any) => {
  const { data } = await api.put('/user/profile', payload)
  return data
}
```

## Usage inside a Component
```ts
import { getUserProfile } from '@/services/user.service'

onMounted(async () => {
  const profile = await getUserProfile()
  console.log(profile)
})
```

## Error Handling
- Show **user-friendly messages** instead of raw errors.
- Use a **toast/notification system** for global errors.
- Differentiate between **client-side, server-side, and network errors**.
- Log errors (**Sentry, LogRocket, or custom logging**).

## Security Best Practices
- Never hardcode **tokens or credentials** in the frontend.
- Use **HTTPS** for all API requests.
- Implement **rate limiting & retries** for resilience.
- Validate **inputs** before sending them to the backend.
- Always **sanitize data** received from the backend.

## Benefits of Good API Integration
- **Consistency** → all API calls use the same configuration.
- **Maintainability** → easier to update API logic in one place.
- **Scalability** → new services can be added without breaking existing ones.
- **Security** → tokens, errors, and responses are handled safely.
- **User Experience** → fast and reliable data fetching improves UX.
- **Debugging** → centralized logging makes issues easier to trace.

## Key Takeaway
Treat your API layer as a **separate module**, not an afterthought.  
A well-designed API integration layer ensures your frontend remains **resilient, secure, and maintainable**.

