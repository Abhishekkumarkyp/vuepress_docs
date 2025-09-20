---
title: Git Workflow
---

# Git Workflow

A clear Git workflow ensures **smooth collaboration**, reduces conflicts, and keeps project history clean and understandable.

---

## General Principles

- Follow a **branching strategy** that fits the team size and project complexity.  
- Keep commits **small and meaningful**.  
- Write **clear commit messages** that explain the "why", not just the "what".  
- Always use **pull requests (PRs)** for code review.  

---

## Branching Strategy

### Option 1: Feature Branch Workflow
- `main` → stable, production-ready code.  
- `dev` → integration branch for testing.  
- `feature/*` → individual feature branches.  
- `hotfix/*` → urgent fixes for production.  

### Option 2: Gitflow (for larger teams)
- `main` → production.  
- `develop` → integration branch.  
- `feature/*`, `release/*`, `hotfix/*`.  

> Choose the simplest model that works for your team. Overly complex workflows slow development.

---

## Commit Message Guidelines

Follow **Conventional Commits** format:

