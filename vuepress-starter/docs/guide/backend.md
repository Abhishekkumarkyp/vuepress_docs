---
title: Backend Guide
---

# Backend Guide

This guide covers backend-related setup and concepts for the project.

## Overview

While VuePress itself is a static site generator with no backend, projects often
need a backend for things like search, contact forms, or dynamic content. This page
collects notes and conventions for backend work related to this project.

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

## Building for Production

To generate a static production build:

```bash
npm run docs:build
```

The output is written to `docs/.vuepress/dist` and can be deployed to any static
hosting provider.
