# 🛒 Full-Stack Type-Safe E-Commerce Platform

A production-ready, high-performance e-commerce ecosystem built using **React, TypeScript, Node.js, Express, and PostgreSQL**, fully orchestrated via **Prisma ORM** and integrated with **Stripe**.

The platform features a decoupled architecture optimized for rapid loading times and global delivery, with the frontend edge-rendered on **Vercel** and the backend application layer hosted on **Render**.

---

## 🚀 Live Deployments

- **⚡ Production Storefront (UI):** [https://vercel.app](https://vercel.app)
- **⚙️ Production Engine (API):** [https://onrender.com](https://onrender.com)

---

## 🛠️ Tech Stack & Architecture

### Frontend (Storefront UI)

- **React 18 & TypeScript:** Strict components architecture ensuring type safety down the interface lifecycle.
- **Vite:** Super-fast micro-bundler framework optimized for modern browser runtimes.
- **Tailwind CSS:** Responsive, utility-first layout styling engine supporting crisp adaptive view grids.

### Backend (Application Server)

- **Node.js & Express:** Lightweight, scalable, multi-endpoint rest routing pipeline.
- **Prisma ORM:** Strong, compile-time database client type enforcement and auto-migration mapping.
- **PostgreSQL:** Relational database cluster optimizing complex operations like nested ordering logic.

### Infrastructure & Security

- **JWT & Bcrypt:** Secure credential hashing and stateful session tracking middleware.
- **Stripe SDK:** E-commerce business logic mapping and secure payment intent creation.

---

## 📂 Project Repository Structure

```text
ecommerce-platform/
├── frontend/             # React SPA (Client Side Storefront UI)
│   ├── src/
│   │   ├── components/   # Modular Cart, Admin Panel, Tracker elements
│   │   ├── context/      # Global Authentication & Cart Data state logic
│   │   └── pages/        # Auth & Store views
│   └── vite.config.ts    # Custom micro-bundler specifications
└── backend/              # Node.js REST API Server
    ├── prisma/           # Data design models schema & seed files
    └── src/
        ├── controllers/  # Register & user validation processing functions
        ├── middleware/   # Strict JWT session intercept routines
        └── routes/       # Auth, Payment, and Catalog entry routers
```

---

## ⚙️ Environment Variables Setup

### Backend Environment Configuration (`backend/.env`)

Create a `.env` file inside your backend directory containing these parameters:

```env
DATABASE_URL="postgresql://username:password@your-database-host:5432/dbname?sslmode=require"
JWT_SECRET="your_cryptographically_secure_64_character_secret_string"
STRIPE_SECRET_KEY="sk_test_your_private_stripe_developer_key"
FRONTEND_URL="https://vercel.app"
PORT=5000
```

### Frontend Environment Configuration (`frontend/.env`)

Create a `.env` file inside your frontend directory containing this endpoint map:

```env
VITE_API_BASE_URL="https://onrender.com/api"
```

---

## 📦 Local Installation & Setup

Follow these sequential steps to fire up the complete ecosystem on your local machine:

### 1. Initialize and Seed the Database

Ensure you have a local or cloud hosted PostgreSQL database server active, then configure the backend:

```bash
cd backend
npm install

# Push structural tables layouts to your active DB instance
npx prisma db push

# Seed the catalog automatically with high-fidelity retail items
npx prisma db seed

# Run the local development hot-reloading loop
npm run dev
```

### 2. Boot up the Frontend Client Storefront

Open an independent terminal tab window and configure the client layer:

```bash
cd frontend
npm install

# Fire up the secure, fast local development server
npm run dev
```

Open your browser to `https://localhost:5173` to test the integrated platform setup.

---

## 🔒 Implemented REST Endpoint Specifications

| HTTP Verb  | API Routing Endpoint                 | Authentication Middleware            | Access Target Node Routine                          |
| :--------- | :----------------------------------- | :----------------------------------- | :-------------------------------------------------- |
| **`POST`** | `/api/auth/register`                 | None (Open Access)                   | Create new user index with encrypted password       |
| **`POST`** | `/api/auth/login`                    | None (Open Access)                   | Validate parameters and return signed session JWT   |
| **`GET`**  | `/api/products`                      | None (Open Access)                   | Pull descending sorted storefront catalog data      |
| **`POST`** | `/api/products/create`               | `authenticateToken` + `requireAdmin` | Restrictively ingest fresh retail inventory metrics |
| **`POST`** | `/api/payment/create-payment-intent` | `authenticateToken`                  | Boot up Stripe session transaction references       |

---

## 🏆 Project Architecture Engineering Badges

- **End-to-End Type Safety:** Zero usage of `any` types across data query lines, reducing runtime errors.
- **Strict Security Policies:** Passwords are never saved plain-text. JWT token access controls protect backend administrative updates.
- **Optimized Cloud Scaling:** Distributed system orchestration separating user traffic pipelines from heavy database engines.
