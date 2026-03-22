# HDR Feedback Form

A simulated feedback form built with React and TypeScript, featuring form validation, user feedback toasts, and unit tests.

## 📋 Features

- **Form Validation** — Two fields are validated before submission. Users cannot submit the form unless all requirements are met.
- **Success Toast** — On successful submission, a success notification appears after a 1.5-second delay to enhance the UX experience.
- **Error Handling** — A bad request error case is handled gracefully and displayed to the user.
- **Unit Tested** — Component behaviour including validation, success, and error states are covered with unit tests.

## 🛠️ Tech Stack

| Category          | Technology                     |
| ----------------- | ------------------------------ |
| Language          | TypeScript                     |
| Bundler/Compiler  | Vite                           |
| UI Framework      | React                          |
| Component Library | MUI (Material UI) + MUI Icons  |
| Styling           | Emotion                        |
| Testing           | React Testing Library + Vitest |

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
pnpm install
```

### Running the App

```bash
pnpm dev
```

### Running Tests

```bash
pnpm test
```

## 🧪 Testing

Unit tests are written using **Vitest** and **React Testing Library**, covering:

- Field validation logic
- Successful form submission flow
- Error/bad request handling
