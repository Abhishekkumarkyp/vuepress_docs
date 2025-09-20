---
title: Testing
---

# Testing

Testing ensures your application is **reliable, bug-free, and maintainable**. A solid testing strategy reduces regressions and builds confidence in every release.

---

## General Principles

- Write tests for **critical features and business logic**.  
- Aim for **automation** → manual testing is important but not scalable.  
- Test early and often — catch bugs before they reach production.  
- Keep tests **fast, isolated, and repeatable**.  

---

## Types of Tests

### 1. Unit Tests
- Test **individual functions or components** in isolation.  
- Example: validating a utility function or rendering a button.  
- Tools: [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/).  

### 2. Integration Tests
- Test **multiple parts working together** (e.g., a form with validation + API call).  
- Tools: Jest + Vue Test Utils.  

### 3. End-to-End (E2E) Tests
- Simulate **real user flows** (login, checkout, navigation).  
- Tools: [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/).  

### 4. Visual Regression Testing
- Catch unintended UI changes.  
- Tools: Percy, Chromatic (for Storybook).  

---

## Example: Unit Test (Vue Component)

```ts
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('renders slot text', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click Me' }
    })
    expect(wrapper.text()).toBe('Click Me')
  })
})
```