# API Integration & Asynchronous Patterns

This document focuses on integrating RESTful services into Vue applications and handling asynchronous behaviour effectively.  The Brightly role expects you to be comfortable with API patterns, error handling, cancellation and retry logic.

## RESTful API principles

* **Resource‑oriented URLs** – structure endpoints around nouns (`/assets`, `/work-orders`) and use HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) to define actions.  Support pagination (`limit`, `offset` or cursor‑based), sorting and filtering via query parameters.
* **Idempotency** – design update requests (PUT/PATCH/DELETE) to be idempotent so clients can safely retry them.  Use unique identifiers (e.g., idempotency keys) for POST requests that create resources.
* **Versioning** – include a version in the base path (`/api/v3/`) or use content negotiation so that changes are explicit and backward‑compatible.

## HTTP clients & interceptors

**Axios** is widely used in Vue projects for its interceptors and request configuration.  Build a service layer that:

* Sets the base URL and default headers (e.g., `Accept: application/json`, `Authorization` token) in a configured instance.
* Uses **request interceptors** to attach auth tokens and trace IDs; and **response interceptors** to handle error responses globally (e.g., convert 401 responses into login redirects).
* Implements a retry mechanism with exponential backoff (see below).

## Request cancellation with AbortController

The [DEV Community article](https://dev.to/dharamgfx/mastering-request-cancellation-in-javascript-using-abortcontroller-with-axios-and-fetch-api-2589) outlines why and when to cancel requests:

* **Efficiency** – cancelling outdated or duplicate network calls reduces server load【267255817756100†L205-L217】.
* **User experience** – when a user submits a new form or types a new search term, stale requests should be aborted so that only the latest results are processed【267255817756100†L220-L224】.
* **Fine‑grained control** – `AbortController` exposes an `AbortSignal` which can be passed into `fetch` or Axios to terminate the request.【267255817756100†L230-L256】.

Typical scenarios include cancelling previous form submissions, auto‑save requests, or search queries when the user updates input【267255817756100†L220-L224】.  In your Vue composables, keep a reference to the current `AbortController` and call `.abort()` before initiating a new request.  Modern versions of Axios accept the `signal` option for cancellation.

## Debouncing & throttling

To prevent making API calls on every keystroke, wrap your API call in a **debounce** function (delay executing until the user stops typing) or a **throttle** function (limit the rate of calls).  Vue composables such as `useDebounce` or `useThrottle` can be implemented using `setTimeout` and `clearTimeout` or `requestAnimationFrame`.

## Retry logic & exponential backoff

Network requests can temporarily fail due to timeouts or transient server errors.  A 2023 ZenRows article explains that using **exponential backoff** spreads retries over increasing intervals to give servers time to recover【260028549190980†L273-L279】.  The delay for the *n*‑th retry is often calculated as:

```text
delay = backoff_factor × 2^(retry_count − 1)
```

For example, with a backoff factor of 2 the delays might be 1 s, 2 s, 4 s, 8 s, etc.【260028549190980†L293-L300】.  When using the `axios-retry` plugin:

* Configure the number of retries (`retries: 3` by default).
* Use `retryCondition` to retry only network errors or specific status codes (e.g., 500, 429).  Note that by default the plugin only retries idempotent requests and 5xx errors【260028549190980†L353-L359】.
* Supply the `exponentialDelay` function to the `retryDelay` option to implement exponential backoff【260028549190980†L389-L400】.

Limit retries to avoid hammering the server, and always include timeout settings on requests (`timeout: 5000` ms).  For POST requests that are not idempotent, include an idempotency key in headers and weigh whether retrying is appropriate.

## Caching & offline strategies

To improve perceived performance and resilience:

* **Client‑side caching** – store results from GET requests in Pinia stores or localStorage so subsequent page loads reuse data.  Invalidate caches when performing write operations.
* **Service workers** – implement a service worker (e.g., with Workbox) to cache assets and API responses, enabling offline use and background sync.
* **Optimistic UI** – update the UI immediately while a POST/PUT request is pending, then roll back on failure.  Combine with cancellation and retries for robustness.

Learning to design resilient API layers and handle asynchronous edge cases will demonstrate to interviewers that you can build reliable front‑end services.