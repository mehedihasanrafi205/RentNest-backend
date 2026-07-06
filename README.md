<div align="center">
  
# 🏢 RentNest
**The Ultimate Backend Infrastructure for Modern Property Rentals**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://stripe.com/)

**[View Live API (Vercel) 🚀](https://rent-nest-backend.vercel.app)**

</div>

---

## 📖 Overview

**RentNest** is a scalable, robust, and highly secure RESTful API built for a comprehensive property rental marketplace. It bridges the gap between **Tenants** looking for their next home and **Landlords** managing their properties, all while providing **Admins** with top-level moderation capabilities. 

Built with enterprise-grade technologies like TypeScript, Prisma ORM, and Zod validation, RentNest ensures high performance, strictly typed data flows, and an impeccable developer experience.

---

## ✨ Comprehensive Features

### 👤 Tenant Experience
*   **Intelligent Property Discovery:** Browse and search properties using complex filters including location, price range, categories, and amenities.
*   **Seamless Booking Flow:** Request to rent properties for specific dates.
*   **Secure Payments:** Integrated with **Stripe Checkout Sessions** for industry-standard, secure payments once a landlord approves a booking request.
*   **Financial Tracking:** Access a detailed history of all transactions and booking statuses.
*   **Community Trust:** Leave ratings and descriptive reviews for properties post-rental to help future tenants.

### 🔑 Landlord Operations
*   **Portfolio Management:** Full CRUD capabilities for property listings, including rich descriptions, location data, and specific amenities.
*   **Tenant Screening:** View, approve, or reject incoming rental requests based on property availability.
*   **Business Insights:** Track successful rentals, monitor property statuses, and read tenant reviews to improve service quality.

### 🛡️ Administrative Oversight
*   **Global Moderation:** Monitor the entire platform's user base. Ban or unban users to enforce platform guidelines.
*   **Category Engineering:** Create and manage dynamic property categories (e.g., Apartments, Villas, Offices) to keep listings organized.
*   **System Auditing:** Access comprehensive lists of all platform bookings and transactions.

---

## 🛠️ Architecture & Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js & Express** | Core runtime and web framework providing a fast, unopinionated foundation for the REST API. |
| **TypeScript** | Ensures strict type safety, reducing runtime errors and vastly improving code predictability. |
| **Prisma ORM** | Next-generation database toolkit providing type-safe database queries and automated migrations. |
| **PostgreSQL** | Highly reliable, scalable, and ACID-compliant relational database system. |
| **Zod** | Schema declaration and validation library to strictly validate all incoming API payloads. |
| **JWT & bcrypt** | Industry-standard authentication via JSON Web Tokens, coupled with secure password hashing. |
| **Stripe** | Global payment gateway for handling highly secure financial transactions and webhooks. |

---

## 🔐 Security & Error Handling

RentNest prioritizes data integrity and security:
*   **Role-Based Access Control (RBAC):** Middleware interceptors ensure `TENANT`, `LANDLORD`, and `ADMIN` boundaries are strictly enforced.
*   **Zod Interceptors:** Every endpoint is shielded by a Zod validation layer. Invalid data structures are rejected instantly.
*   **Unified Error Responses:** Every error (Validation, Database constraints, Authentication) is caught by a Global Error Handler and formatted into a consistent, predictable JSON structure:
    ```json
    {
      "success": false,
      "message": "Human readable error message",
      "errorDetails": { ... }
    }
    ```

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/en/) (v18 or higher)
*   [PostgreSQL](https://www.postgresql.org/) (Running locally or via cloud like Supabase/Neon)
*   [Stripe Account](https://stripe.com/) (For API and Webhook keys)

### 2️⃣ Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/RentNest-backend.git
cd RentNest-backend
npm install
```

### 3️⃣ Environment Configuration
Create a `.env` file in the root directory and populate it with your specific keys:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rentnest?schema=public"

# Application
PORT=5000
ENV="development"
APP_URL="http://localhost:5000"

# Authentication (JWT)
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET="generate_a_strong_secret_key"
JWT_REFRESH_SECRET="generate_a_strong_refresh_key"
JWT_ACCESS_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="365d"

# Payment Gateway (Stripe)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4️⃣ Database Migration
Push the Prisma schema to your PostgreSQL database to generate the tables:
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Booting the Server
Start the development server using `tsx`:
```bash
npm run dev
```
The API will be available at: `http://localhost:5000`

---

## 🌐 Core API Endpoints

### 🔐 Authentication
*   `POST /api/auth/register` - Register a new account.
*   `POST /api/auth/login` - Authenticate and receive a JWT.

### 🏢 Properties
*   `GET /api/properties` - Fetch all properties (supports queries: `location`, `minPrice`, `maxPrice`).
*   `GET /api/properties/:id` - Fetch a single property.
*   `POST /api/properties/create-listing` - (Landlord) Create a new listing.

### 📅 Bookings
*   `POST /api/bookings/book-property` - (Tenant) Request to rent a property.
*   `PATCH /api/bookings/:id/update-status` - (Landlord) Approve or reject a request.
*   `GET /api/bookings/my-bookings` - (Tenant) View personal bookings.

### 💳 Payments
*   `POST /api/payments/create-checkout-session` - (Tenant) Generate Stripe payment URL for an approved booking.
*   `GET /api/payments/my-payments` - (Tenant) View transaction history.
*   `POST /api/payments/webhook` - (Stripe) Automated webhook for payment confirmation.

### 🌟 Reviews & Categories
*   `POST /api/reviews` - (Tenant) Leave a review for a property.
*   `POST /api/categories` - (Admin) Create property categories.

---
*Designed and engineered to provide a robust, scalable, and secure backend architecture for modern real estate solutions.*
