# QC PESO - P.E.D.R.O. Overview

This repository contains a full-stack TypeScript application architecture separated into two main folders:

- `client/`: Single-page application built using React + TailwindCSS.
- `server/`: REST API service built with Express and Node.js.

---

## User Manual

See the [P.E.D.R.O. User Manual](docs/USER_MANUAL.md) for role-based instructions, feature walkthroughs, screenshots, and troubleshooting.

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 19, TypeScript 6, Vite 8, React Router 7, Tailwind CSS 4 |
| **Backend** | Node.js 24+, Express 5, Zod 4, Passport.js (JWT) |
| **Database** | PostgreSQL, Prisma 7 |
| **AI insights** | Ollama |
| **Testing & tooling** | Jest, Vitest, Storybook, ESLint, Prettier, Docker Compose |

PEDRO is a TypeScript monorepo with three npm workspaces: `client/`, `server/`, and `shared/`. The shared workspace provides common types and Zod schemas to both the frontend and backend.

---

## Project Structure

```text
QC-PESO-PEDRO/
├── client/                  # React Frontend
│   ├── public/              # Static files (index.html, favicon, etc.)
│   ├── src/                 # React source code (Components, Hooks, Pages, etc.)
│   │   └── components/       # Contains all components.
│   └── package.json         # Client dependencies and scripts
│
├── server/                  # Express Backend
│   ├── src/                 # Express source code (Routes, Controllers, Models, Middleware)
│   │   ├── config/          # Backend Configs (ORM, auth, etc.)
│   │   ├── controllers/     # Controller files setup
│   │   ├── middlewares/     # Middleware Functions (Validation, Error handling, etc.)
│   │   ├── routes/          # Directory for specified routes
│   │   ├── models/          # Directory for entity models
│   │   └── server.ts        # Entry point for Express app
│   │
│   ├── tests/               # Test suite root (mirrors src/)
│   │   ├── integration/     # Multi-component/API endpoint tests
│   │   └── fixtures/        # Mock data used in tests
│   │
│   ├── .env.example         # Example environment variables for server
│   └── package.json         # Server dependencies and scripts
│
├── shared/                  # Shared Prisma types, enums, and Zod schemas
│
├── docs/                    # Project documentation
│   ├── screenshots/         # User manual screenshots
│   ├── STORYBOOK_GUIDE.md   # Storybook guide
│   └── USER_MANUAL.md       # End-user manual
│
├── .gitignore               # Root gitignore
└── README.md                # Project documentation
```

---

## Prerequisites

Ensure you have the following installed locally on your machine before setup:

- **[Node.js](https://nodejs.org/)** (v24.x or higher)
- **[npm](https://www.npmjs.com/)** (comes bundled with Node.js)
- **[Git](https://git-scm.com/)**
- **[PostgreSQL](https://www.postgresql.org/download/)**

---

## Installation & Initial Setup

### 1. Clone the Repository

Clone the project repository to your local machine.

```bash
# HTTPS
git clone https://github.com/Brenedict/QC-PESO-PEDRO.git
```

```bash
# SSH
git clone git@github.com:Brenedict/QC-PESO-PEDRO.git
```

Navigate into the root directory:

```bash
cd QC-PESO-PEDRO
```


---

### 2. Monorepo Setup

Directly install from root directory (monorepo scripts):

```bash
npm install
```

Or you can also cd to `client` and `server`, then do `npm install` there (shown below).

---

### 3. Client Setup

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

<!-- 3. Create a `.env` file in the `client` root directory (optional):
    ```bash
    cp .env.example .env   # Or create .env manually
    ``` -->

---

### 4. Server Setup

1.  Navigate to the `server` directory:

    ```bash
    cd server
    ```

2.  Install backend dependencies:

    ```bash
    npm install
    ```

3. **Copy the .env.example into .env**  
   ```.env
    # Modify this to your PostgreSQL url
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" 
   ```

4. **Generate Prisma client**  
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**  
   ```bash
   npx prisma migrate dev 
   ```

6. **If running test, you must also run migration in test database**  
   ```bash
   NODE_ENV=test npx prisma migrate dev 
   ```

---

## Running the Application

### 1. Start using monorepo scripts

From the root directory, you can start both frontend and backend:

```bash
npm run dev

# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

Or you can do a separate run like shown below

---

### 2. Start the Express Backend

From the `server` directory, start the server:

```bash
# Run in development mode with live reload 
npm run dev
```

By default, the server will start on `http://localhost:3000`.

---

### 3. Start the React Frontend

From the `client` directory, start the React dev server:

```bash
npm run dev
```

The application will automatically open in your web browser at `http://localhost:5173`.

---

## Available Scripts

### In `server/`

- `npm run start`: Runs the development server..
- `npm run dev`: Runs the development server with live reloads..
- `npm test`: Launches the test runner (jest).

### In `client/`

- `npm run dev`: Runs the React app in development mode at `http://localhost:5173`.
- `npm run build`: Bundles the app into static files for production inside the `build` directory.

---
