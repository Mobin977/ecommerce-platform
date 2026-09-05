# 🛒 Full-Stack Type-Safe E-Commerce Platform

A production-ready full-stack e-commerce platform built with **React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, and Stripe**.

The application uses a decoupled frontend and backend architecture, with the storefront deployed on **Vercel** and the REST API deployed independently on **Render**.

---

## 🚀 Live Deployments

* ⚡ **Production Storefront:** https://ecommerce-platform-phi-one.vercel.app/
* ⚙️ **Production API:** https://ecommerce-platform-7l9c.onrender.com
* 💻 **GitHub Repository:** https://github.com/Mobin977/ecommerce-platform

---

## ✨ Key Features

### 🛍️ Customer Features

* User registration and login
* Product browsing
* Product search and filtering
* Shopping cart
* Wishlist
* Checkout
* Stripe payment integration
* Order management
* Order tracking

### 👨‍💼 Admin Features

* Admin authentication
* Product management
* Inventory management
* Order management
* Protected administrative routes
* Role-based access control

### 🔐 Security

* JWT-based authentication
* Bcrypt password hashing
* Protected API endpoints
* Role-based authorization
* Environment-based secret management
* No plaintext password storage

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │   React + TypeScript  │
                    │      Vite Frontend    │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend API      │
                    └──────────┬───────────┘
                               │
                         Prisma ORM
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │       Database       │
                    └──────────────────────┘

                               │
                               ▼
                         Stripe Payments
```

### ☁️ Deployment Architecture

```text
Customer
   │
   ▼
Vercel
React + Vite
   │
   │ HTTPS REST API
   ▼
Render
Node.js + Express
   │
   ├──────────────► PostgreSQL
   │
   └──────────────► Stripe
```

---

## 🛠️ Technology Stack

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Context API

### Backend

* Node.js
* Express.js
* TypeScript
* JWT
* Bcrypt
* Stripe SDK

### Database

* PostgreSQL
* Prisma ORM

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```text
ecommerce-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── ...
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secure_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
FRONTEND_URL="https://ecommerce-platform-phi-one.vercel.app"
PORT=5000
```

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL="https://ecommerce-platform-7l9c.onrender.com/api"
```

> ⚠️ Never commit `.env` files, database credentials, Stripe secret keys, JWT secrets, or other sensitive information to GitHub.

---

## 📦 Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Mobin977/ecommerce-platform.git

cd ecommerce-platform
```

---

### 2. Setup Backend

```bash
cd backend

npm install
```

Configure your `.env` file and then run:

```bash
npx prisma db push
```

Seed the database:

```bash
npx prisma db seed
```

Start the backend:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

---

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend

npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

> Note: Use `http://localhost:5173` for the Vite development server unless HTTPS has specifically been configured.

---

## 🔌 REST API

| Method | Endpoint                             | Authentication | Purpose                      |
| ------ | ------------------------------------ | -------------- | ---------------------------- |
| POST   | `/api/auth/register`                 | Public         | Register a new user          |
| POST   | `/api/auth/login`                    | Public         | Authenticate user            |
| GET    | `/api/products`                      | Public         | Retrieve products            |
| POST   | `/api/products/create`               | Admin          | Create a product             |
| POST   | `/api/payment/create-payment-intent` | Authenticated  | Create Stripe payment intent |

---

## 💳 Payment Flow

```text
Customer
   │
   ▼
Add Products
   │
   ▼
Cart
   │
   ▼
Checkout
   │
   ▼
Backend API
   │
   ▼
Stripe Payment Intent
   │
   ▼
Payment Confirmation
   │
   ▼
Order Created
```

---

## 🔒 Security

The application implements:

* JWT authentication
* Role-based authorization
* Protected API routes
* Bcrypt password hashing
* Environment-based secret management
* Database constraints
* Server-side authorization checks

Passwords are never stored in plaintext.

---

## 📸 Screenshots

Add screenshots of your actual application here.

### 🏠 Storefront

*Add screenshot here*

### 🛍️ Product Details

*Add screenshot here*

### 🛒 Shopping Cart

*Add screenshot here*

### 💳 Checkout

*Add screenshot here*

### 👨‍💼 Admin Dashboard

*Add screenshot here*

---

## 🏆 Engineering Highlights

This project demonstrates practical experience with:

* Full-stack application architecture
* TypeScript development
* REST API design
* JWT authentication
* Role-based access control
* PostgreSQL database design
* Prisma ORM
* Stripe payment integration
* State management
* Secure environment configuration
* Independent frontend/backend deployment
* Cloud deployment and production debugging

---

## 🚀 Future Improvements

* Redis caching
* Automated testing
* CI/CD with GitHub Actions
* Product image storage
* Advanced search
* Email notifications
* Inventory alerts
* Order analytics
* AWS deployment

---

## 👨‍💻 Author

**Mobin977**

Full-Stack Developer building production-ready applications with:

**React • TypeScript • Node.js • Express.js • PostgreSQL • Prisma • Redis • Docker**

---

⭐ If you find this project useful, consider giving the repository a star.
