# React UI Library (Storybook)

Small component library built with **React + TypeScript** and showcased in **Storybook**.  
All styling lives in **CSS Modules** (`*.module.css`) — no inline styles in stories.

## Components

- **Input**
  - Types: `text`, `email`, `number`, `password`, `search`
  - Password visibility toggle, clearable (✕), helper text
  - States: error, disabled
- **Toast**
  - Types: `success | error | info | warning`
  - Works standalone or via `ToastProvider`
  - Auto-dismiss + smooth **fade-out** on close
- **SidebarMenu**
  - Nested items (recursive), smooth accordion
  - Animated chevron, basic a11y (`aria-expanded`, `aria-controls`)

## Screenshots

![Input — basic](./docs/screenshots/1.png)
![Input — password](./docs/screenshots/2.png)
![Input — extra](./docs/screenshots/3.png)
![Sidebar — closed](./docs/screenshots/4.png)
![Sidebar — open](./docs/screenshots/5.png)
![Toast — success](./docs/screenshots/6.png)
![Toast — provider/types](./docs/screenshots/7.png)

## Getting Started

```bash
npm install
npm run storybook
