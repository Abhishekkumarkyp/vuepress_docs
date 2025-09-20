---
title: Security
---

# Security

Frontend applications face multiple security threats. While the backend is the primary defense layer, the frontend must still enforce safeguards to **protect users, prevent leaks, and ensure trust**.

---

## General Principles

- Never trust user input — always **sanitize and validate**.  
- Assume all data from the backend could be malicious.  
- Avoid exposing sensitive information in the frontend.  
- Always use **HTTPS**.  

---

## Common Security Risks

### 1. Cross-Site Scripting (XSS)
- Don’t inject raw HTML → use Vue’s automatic escaping.  
- Use `v-html` only when absolutely necessary, and sanitize content.  
- Escape dynamic values in attributes and templates.  

### 2. Cross-Site Request Forgery (CSRF)
- Use CSRF tokens when making authenticated requests.  
- Prefer **same-site cookies** with `HttpOnly` and `Secure` flags.  

### 3. Authentication & Authorization
- Store tokens securely (`HttpOnly` cookies > localStorage).  
- Use **short-lived access tokens** with refresh tokens.  
- Protect routes using **navigation guards** and role checks.  

### 4. Data Exposure
- Don’t hardcode API keys in frontend code.  
- Mask sensitive fields (e.g., passwords, card numbers).  
- Strip unused or sensitive data before rendering in UI.  

### 5. Dependency Vulnerabilities
- Regularly update npm packages.  
- Run `npm audit` or use tools like Snyk.  
- Avoid unnecessary or untrusted dependencies.  

---

## Secure Coding Practices

- Use **TypeScript** to reduce runtime errors.  
- Validate all form inputs (client + server side).  
- Use **Content Security Policy (CSP)** headers to restrict scripts.  
- Implement **rate limiting** on API calls (backend enforced).  
- Don’t expose internal error details to users.  

---

## Example: Token Storage

❌ Bad (localStorage):
```ts
localStorage.setItem('token', token)
