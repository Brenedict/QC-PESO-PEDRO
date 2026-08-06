# QC PESO - P.E.D.R.O. Overview

This repository contains a full-stack TypeScript application architecture separated into two main folders:

- `client/`: Single-page application built using React + TailwindCSS.
- `server/`: REST API service built with Express and Node.js.

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
│   ├── .env.example         # Example environment variables for server
│   └── package.json         # Server dependencies and scripts
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

### 2. Client Setup

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

### 3. Server Setup

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
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=pthisublic" 
   ```

4. **Generate Prisma client**  
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**  
   ```bash
   npx prisma migrate dev 
   ```

---

## Running the Application

### 1. Start the Express Backend

From the `server` directory, start the server:

```bash
# Run in development mode with live reload (nodemon)
npm run start
```

By default, the server will start on `http://localhost:3000`.

---

### 2. Start the React Frontend

From the `client` directory, start the React dev server:

```bash
npm run dev
```

The application will automatically open in your web browser at `http://localhost:5173`.

---

## Available Scripts

### In `server/`

- `npm run start`: Runs the development server with live reloads..

### In `client/`

- `npm run dev`: Runs the React app in development mode at `http://localhost:5173`.
- `npm run build`: Bundles the app into static files for production inside the `build` directory.
- `npm test`: Launches the test runner in interactive watch mode.

---
