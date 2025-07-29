

# 📚 Remote Learning System (RLS)

A full-stack MERN web application for managing online learning with authentication, instructor-student role management, course purchases, and secure payment integration.

---

## 🚀 Tech Stack

### 🌐 Frontend
- **React (Vite)**
- **Tailwind CSS**
- **ShadCN UI** (for beautiful, reusable components)
- **Redux Toolkit + RTK Query** (optimized API handling and caching)

### 🔐 Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Stripe** for secure payment integration
- **Cloudinary** for image/video storage

---

## ⚙️ Features

- 🔐 **Authentication** using JWT (student/instructor role based)
- 📚 **Instructor Panel** for uploading courses, lectures, and managing students
- 🧑‍🎓 **Student Panel** to enroll in courses, view content
- 💳 **Stripe Payment Integration**
- 📦 **Cloudinary Uploads** (Images/Videos)
- ⚡ **RTK Query** for API handling with automatic caching and refetch control

---

## 📁 Folder Structure

```bash
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── services/  # RTK Query endpoints
│   └── App.jsx

server/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── config/
│   └── dbConnect.js
└── index.js


💡 Important Notes
RTK Query reduces unnecessary API calls by caching data and auto-refetching only when needed.

shadcn/ui makes building beautiful, accessible UI components easy and fast.

Stripe's test mode is used for secure payments.

README.md intentionally excludes sensitive .env configs (kept in .gitignore).