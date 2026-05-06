
---

# ✅ 3. `conventions.md`

```md
# 📏 Coding Conventions

## 📁 File Naming

| Type        | Format |
|------------|-------|
| Component  | PascalCase (Hero.jsx) |
| CSS Module | Component.module.css |
| Folder     | lowercase |

---

## 🧩 Component Rules

Each component must:

- be functional
- have a single responsibility
- import its own CSS module

Example:

```jsx
import styles from './Hero.module.css'