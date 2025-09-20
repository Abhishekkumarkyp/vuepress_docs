# Testing, Quality & DevOps Practices

Brightly expects engineers to “own quality through every stage of the development lifecycle”, so mastering modern testing and DevOps practices is critical.  This document summarises key areas to study.

## Unit & component testing

* **Jest + Vue Test Utils** – Jest is a widely used test runner for JavaScript/TypeScript.  Vue Test Utils (VTU) provides utilities to mount components and assert on their behaviour.  Learn to:
  - Mount components with props and slots, simulate user events (e.g., `wrapper.find('button').trigger('click')`), and assert on emitted events or DOM changes.
  - Test composables by invoking them inside a dummy component or using `@vue/test-utils` `defineComponent` wrappers.
  - Mock dependencies such as Axios or Pinia stores.  For example, use `jest.mock('axios')` and provide resolved or rejected promises.
  - Snapshot test simple components to ensure their rendered output does not change unexpectedly.

* **Testing edge cases** – write tests for success and failure paths, including cancelled requests and errors.  Use fake timers to test debounce/throttle behaviours.  Coverage reports (`jest --coverage`) help ensure critical logic is exercised.

## End‑to‑end (E2E) testing

* **Cypress / Playwright** – E2E frameworks simulate a real browser interacting with your application.  They are ideal for smoke tests of core flows (e.g., logging in, creating an asset, editing it and saving) and regressions.  Brightly may not require deep E2E coverage, but having a few smoke tests integrated into CI increases confidence.

## Static analysis & type checking

* **ESLint & Prettier** – enforce code style and catch basic errors.  Use the Vue and TypeScript plugins.
* **TypeScript / vue-tsc** – run `vue-tsc --noEmit` in CI to detect type errors in `.vue` files.  Many bugs are eliminated early through type checking.

## Performance & bundle analysis

* **Vite** – Vite is the default build tool for Vue 3 projects.  A 2025 article notes that Vite 6 (released 26 Nov 2024) introduces an experimental Environment API, improved hot module replacement and an enhanced plugin architecture【787629814344079†L117-L123】.  Learn how to configure code splitting via dynamic imports, use environment variables and measure build sizes.  Tools like `rollup-plugin-visualizer` can produce a treemap of bundle contents.
* **Lighthouse & web vitals** – run Lighthouse audits to measure performance, accessibility, best practices and SEO.  Monitor metrics like LCP, INP and CLS in production using analytics or RUM tools (e.g., web-vitals library) and surface them in dashboards.

## Dockerisation & deployment

* **Docker** – package the app for deployment.  Use a multi‑stage Dockerfile: first stage installs dependencies and runs `npm run build`, second stage uses a minimal web server (e.g., nginx or node) to serve the static build.  Expose the container port and configure health checks.
* **Kubernetes / OpenShift** – understand basic concepts: pods, deployments, services, secrets and config maps.  You may not need to write manifests from scratch but should be able to discuss how your containerised app runs on a cluster.
* **Environment configuration** – externalise API endpoints, feature flags and secrets via environment variables or config files.  Use `.env` files for development and platform‑specific secrets for staging/production.

## CI/CD pipelines

Implement an automated pipeline that runs on each pull request:

1. **Install & cache dependencies** – use `npm ci` to install exact versions.  Cache the node_modules folder to speed up subsequent runs.
2. **Static checks** – run `vue-tsc` and ESLint.
3. **Unit tests** – run Jest and collect coverage.  Fail the build on low coverage thresholds.
4. **Build** – run `npm run build` to produce the production bundle.  Optionally guard against bundle size regressions using `size-limit`.
5. **Deploy** – push the built assets to a staging environment.  After manual approval, deploy to production.  Use canary releases or feature flags to control rollout.

## Observability & error handling

* **Structured logging** – capture errors and important events with context (user ID, operation, timestamp).  Forward logs to a central service (e.g., Elastic, Datadog) for analysis.
* **Error boundaries** – wrap top‑level components in an error boundary (or use Vue’s `errorCaptured` hook) to catch uncaught errors and display a user‑friendly message.  Log the error to a monitoring service such as Sentry.
* **Metrics** – instrument API calls to record latency, error rates, retry counts and cancellations.  Use dashboards to track these metrics over time.

Mastering these tools and practices demonstrates your ability to deliver high‑quality code, maintain reliability and own the deployment lifecycle—qualities Brightly values in their engineers.