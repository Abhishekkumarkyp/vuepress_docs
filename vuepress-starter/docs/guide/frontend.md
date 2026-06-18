---
title: Frontend Guide
---

# Frontend Guide

This guide covers the basics of working with the frontend portion of the project.

## Overview

The frontend is built with Vue.js and bundled with webpack via VuePress. Pages are
written in Markdown and can embed Vue components directly.

## Getting Started

1. **Installation**: Install the project dependencies.

    ```bash
    npm install
    ```

2. **Development Server**: Start the local development server.

    ```bash
    npm run docs:dev
    ```

3. **View in Browser**: Open your browser and navigate to
   [http://localhost:8080/](http://localhost:8080/) to view the site.

## Key Concepts

- **Markdown-centered authoring** — most content lives in `.md` files under `docs/`.
- **Frontmatter** — each page can define metadata (title, layout, etc.) at the top
  of the file using `---` delimited YAML.
- **Vue components** — custom Vue components can be registered and used directly
  inside Markdown files.
- **Theming** — site-wide navigation, sidebar, and branding are configured in
  `docs/.vuepress/config.js`.
