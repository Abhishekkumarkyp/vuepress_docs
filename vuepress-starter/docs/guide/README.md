---
title: Guide
---

# Guide

Welcome to the Doodle Press guide. This section covers everything you need to get the
project running locally and points you to the frontend and backend guides for
deeper, topic-specific documentation.

## Getting Started

To get started with this project, follow these steps:

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

## Project Structure

This project follows the standard VuePress structure:

```
docs/
├── .vuepress/
│   └── config.js      # site configuration (nav, sidebar, theme)
├── guide/
│   ├── README.md       # this page
│   ├── frontend.md
│   └── backend.md
├── JavaScript/
│   ├── README.md
│   ├── intermediate.md
│   └── advance.md
├── about.md
├── documentation.md
└── README.md           # homepage
```

## Next Steps

- [Frontend Guide](./frontend.md) — building and structuring the frontend.
- [Backend Guide](./backend.md) — server-side setup and concepts.
- [JavaScript Reference](../JavaScript/) — JavaScript fundamentals through advanced topics.
