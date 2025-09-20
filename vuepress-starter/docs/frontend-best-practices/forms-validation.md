---
title: Forms & Validation
---

# Forms & Validation

Forms are the **primary way users interact** with your app. A robust form and validation strategy ensures **data accuracy, security, and usability**.

---

## General Principles

- Keep forms **simple and focused** → don’t overwhelm users with too many fields.  
- Always validate **both client-side and server-side**.  
- Provide **real-time feedback** → show errors as users type, not just on submit.  
- Never rely solely on placeholders → always include labels.  
- Ensure forms are **accessible** (keyboard navigation, screen readers).  

---

## Folder Structure Example

```text
src/
  components/
    forms/
      LoginForm.vue
      SignupForm.vue
  utils/
    validators.ts   # reusable validation functions
```

## Validation Approaches

### HTML5 Validation
- Use built-in attributes like:
  - `required`
  - `minlength`
  - `maxlength`
  - `pattern`
  - `type="email"`

### Custom Validation
- Write reusable utility functions:
```ts
export const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
```

## Validation Libraries
- **Vuelidate**
- **VeeValidate**

### Example with Vuelidate
```ts
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, formData)
```
# Form Validation Best Practices

## UX Best Practices
- Highlight invalid fields with **clear error messages**.
- Use **inline validation** → errors should appear near the field.
- Provide **help text** for tricky fields (e.g., password requirements).
- Disable **submit button until form is valid** (optional, depends on UX).
- Preserve user input if the form fails → **don’t reset everything**.

## Security Considerations
- Always **validate again on the server-side**.
- **Sanitize user inputs** to prevent XSS/SQL Injection.
- Avoid exposing **validation rules** (like regex patterns) directly in frontend error messages.
- Use **CAPTCHA/reCAPTCHA** for sensitive forms (login, signup).

## Benefits of Strong Form Practices
- **Data quality** → prevents invalid or incomplete submissions.
- **User trust** → good validation improves confidence in the app.
- **Security** → reduces risk of malicious inputs.
- **Accessibility** → properly labeled forms are usable by all.
- **Consistency** → reusable validators save effort across forms.

## Key Takeaway
A form is a **conversation with the user**.  
Clear validation, instant feedback, and accessibility ensure the conversation is **smooth, secure, and effective**.

