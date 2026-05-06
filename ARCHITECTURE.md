
---

# ✅ 2. `architecture.md`

```md
# 🏗️ Architecture Overview

## 📌 Core Principle

This project follows a **component-driven architecture** with:

- reusable UI blocks
- route-based pages
- isolated styles (CSS Modules)

---

## 🧩 Layers

### 1. App Layer

`App.jsx`

- defines routes
- composes pages using components

---

### 2. Page Composition

Pages are NOT separate folders.

Instead, they are composed inside routes:

Example:

```jsx
<Home>
  <Hero />
  <Services />
  <Results />
  <Contact />
</Home>