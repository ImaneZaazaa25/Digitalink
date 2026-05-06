
---

# ✅ 4. `agents.md` (VERY IMPORTANT for your AI)

```md
# 🤖 AI Agent Instructions

## 🎯 Goal

You are an AI agent working on this React project.

Your job is to:

- add new pages
- extend components
- maintain consistency

---

## 📁 Project Understanding

- React SPA
- Component-based architecture
- CSS Modules
- Routing handled in `App.jsx`

---

## 🚀 When Adding a New Page

### Step 1: Create component
src/components/NewPage.jsx
src/components/NewPage.module.css


---

### Step 2: Add route

In `App.jsx`:

```jsx
<Route path="/new-page" element={<NewPage />} />