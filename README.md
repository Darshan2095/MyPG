# 🏠 MyPG - Full-Stack PG Discovery & Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-Shield-blueviolet?style=for-the-badge)](https://next-auth.js.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A robust discovery and property management platform designed to bridge the gap between students/professionals and PG owners. Built with a focus on **Role-Based Access Control (RBAC)** and seamless property searching.

---

## 🌐 Live Experience
🔗 **[View Live Demo](https://your-vercel-link.vercel.app)** | **[GitHub Repository](https://github.com/Darshan2095/mypg)**

---

## ✨ Core Features

### 👤 For Renters (Users)
- **Location-Based Search:** Filter PGs by City and specific popular areas.
- **Detailed Insights:** View exhaustive PG details including dynamic image galleries, amenities, and specific gender-based permissions.
- **Direct Connect:** Access owner contact details (Phone/Email) instantly.
- **Responsive Navigation:** Optimized for finding housing on the go via mobile devices.

### 🏢 For Property Owners
- **Personalized Dashboard:** A dedicated workspace to monitor listed properties.
- **Dynamic Property Listing:** Intuitive multi-step forms to add PGs with pricing breakdown (Rent + Deposit).
- **Listing Management:** View and edit "My PGs" through a sleek sidebar-driven interface.

### 🔐 Security & Auth
- **Role-Based System:** Strict separation of User, Owner, and Admin routes using **NextAuth.js**.
- **Secure Sessions:** JWT-based authentication for persistent and secure logins.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Lucide Icons
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MongoDB Atlas with Mongoose ODM
- **Auth:** NextAuth.js (Credentials Provider)
- **Deployment:** Vercel

---

## 📂 Architecture

```text
app/
 ├── (user)/           # Public & Renter routes (Search, Details)
 ├── owner/            # Protected Owner routes (Dashboard, Add-PG)
 ├── admin/            # Administrative management (In-development)
 ├── api/              # Serverless backend endpoints
 ├── (auth)/           # Login & Registration logic
components/            # Shared UI: Navbar, Footer, OwnerSidebar
models/                # Mongoose Schema definitions
lib/                   # MongoDB connection singleton


# Developer

**Darshan Babariya** *Full-Stack Developer | VGEC Computer Engineering*

[LinkedIn](https://www.linkedin.com/in/darshanbabariya/) • [GitHub](https://github.com/Darshan2095) • [Email](mailto:darshanb2390@gmail.com)

---
*If you find this project helpful for your PG search or as a template, please give it a ⭐!*
