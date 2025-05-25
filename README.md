# React Todo List — Test Assignment

This repository contains a responsive Todo List application built as part of a frontend developer test assignment.

The application allows users to manage tasks and columns with full drag-and-drop support, filtering, searching, selection, and local persistence.

---

## Tech Stack

- **React + TypeScript**
- **Zustand** (with `immer`) for global state and localStorage persistence
- **Tailwind CSS** for styling
- **Pragmatic Drag and Drop** – for intuitive drag-and-drop functionality
- **Floating UI** – for dropdown positioning
- **CVA (Class Variance Authority)** – for clean, reusable component styling
- **Fuse.js** – for fuzzy search (smart search by task name)
- **ESLint** and **Prettier** for code quality and formatting

---

## Features

- Add and delete tasks
- Mark tasks as complete or incomplete
- Add and delete columns
- Edit task titles inline
- Reorder tasks within and across columns using drag-and-drop
- Reorder columns using drag-and-drop
- Multi-select tasks and apply batch actions
- Select all tasks in a column
- Filter tasks by completion status
- Search tasks by name with:
    - Match highlighting
    - Fuzzy matching using **Fuse.js**
- Responsive design (desktop and mobile)
- Persistent storage with `localStorage`
- Custom UI components (no UI libraries)

---

## Live Demo

🔗 [View Live App](https://recman-todo-app.vercel.app)  
🎥 [Watch Demo Video](https://www.loom.com/share/a72a800b704b43599e4d938a74f3cbeb)

---

## Getting Started

To run the application locally:

```bash
git clone git@github.com:AndriiPozniakov/recman-todo-app.git
cd recman-todo-app

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```


