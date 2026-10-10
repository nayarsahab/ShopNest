# 🛒 ShopNest - Modern Full-Stack E-Commerce Platform

ShopNest is a full-featured, modern E-Commerce web application built using the MERN stack (**MongoDB, Express.js, React, Node.js**). It provides an intuitive shopping experience for customers and a robust administrative suite for managing products, tracking orders, analyzing revenue, and handling user accounts.

---

## 🌟 Key Features

### 👤 Customer Features
- **User Authentication & Authorization**:
  - Secure Registration & Login powered by **JWT (JSON Web Tokens)** and **bcryptjs** password hashing.
  - Automated welcome email with OTP registration verification sent via **Nodemailer**.
- **Product Browsing & Search**:
  - Browse available catalog products with responsive layout cards.
  - Live product search filtering by name and category.
  - Detailed product view page with ratings, stock availability, description, and reviews count.
- **Shopping Cart & State Management**:
  - Interactive shopping cart managed globally using **Redux Toolkit**.
  - Dynamic price, tax, and total price calculation.
  - Increment, decrement, or remove item functionalities.
- **Seamless Checkout & Payments**:
  - Shipping address collection during checkout.
  - Integrated **Razorpay** payment gateway for secure transactions in INR (`₹`).
  - Includes a fallback test mode for local student/development environments when API keys are pending setup.
- **Order Management & History**:
  - Automated HTML email order confirmation upon successful purchase.
  - User profile section displaying personal details, role status, and full order history.
  - Live order tracking statuses (**Pending**, **Shipped**, **Delivered**).

---

### 🛡️ Admin Dashboard Features
- **Real-Time Analytics & Metrics**:
  - Overview cards displaying Total Revenue (`₹`), Total Orders, Total Products, and Total Registered Users.
- **Product Management (CRUD)**:
  - Add new products with image upload support powered by **Cloudinary** and **Multer**.
  - Edit existing product details (name, description, price, category, stock, image).
  - Delete products from the store catalog.
- **Order Processing**:
  - View all user orders placed across the system.
  - Update order delivery status (**Pending** ➔ **Shipped** ➔ **Delivered**).
- **User Directory**:
  - List registered users with name, email, and system role (`user` / `admin`).

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 18
- **Routing**: React Router DOM (v7)
- **State Management**: Redux Toolkit & React-Redux (`cartSlice`)
- **Context API**: `AuthContext` for user session & token persistence
- **Styling**: Modern dark-themed CSS with glassmorphism visual aesthetics

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JSON Web Token (`jsonwebtoken`) & `bcryptjs`
- **File Uploads & Media Storage**: Multer & Cloudinary SDK
- **Payment Processing**: Razorpay SDK
- **Email Dispatch**: Nodemailer
- **Utility Tools**: `dotenv`, `cors`, `dns`

---

## 📁 Project Architecture

```
ShopNest/
├── BackEnd/
│   ├── configs/          # MongoDB & Cloudinary configuration
│   ├── controllers/      # Auth, Product, Order, Payment & Analytics controllers
│   ├── middlewares/      # Authentication & Admin authorization middlewares
│   ├── models/           # Mongoose schemas (User, Product, Order)
│   ├── routes/           # Express routes API endpoints
│   ├── utils/            # Helper utilities (Nodemailer email sender)
│   ├── index.js          # Express server entry point
│   ├── seed.js           # Database seeding script for sample products/admin
│   └── .env              # Backend environment variables
├── FrontEnd/
│   └── shopnest/
│       ├── public/       # Public static assets & index.html
│       └── src/
│           ├── admin/        # Admin management pages (Dashboard, Add/Edit Products, Orders, Users)
│           ├── components/   # Reusable UI components (Navbar, Footer, ProductCard)
│           ├── context/      # React AuthContext provider
│           ├── pages/        # Main route pages (Home, Shop, Cart, Checkout, Profile, etc.)
│           ├── redux/        # Redux store & cartSlice
│           ├── styles/       # Application styling sheets
│           └── App.jsx       # Main App routing component
├── package.json          # Root package.json with workspace scripts
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **MongoDB** instance (local or MongoDB Atlas cluster)

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ShopNest.git
   cd ShopNest
   ```

2. **Install all dependencies** (Root, Backend, and Frontend):
   ```bash
   npm run install-all
   ```

---

### Environment Configuration

Create a `.env` file inside the `BackEnd/` directory with the following keys:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopnest
JWT_SECRET=your_jwt_secret_key

# Nodemailer Credentials
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay Payment Gateway Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

---

### Database Seeding (Optional)

To seed initial sample products and an admin account (`admin@shopnest.com` / `password123`):

```bash
cd BackEnd
npm run seed
```

---

### Running the Application

Run both backend server and frontend client concurrently from the root directory:

```bash
npm run dev
```

- **Frontend Client**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

## 📡 API Endpoint Summary

| Module | Method | Endpoint | Description | Access |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/auth/register` | Register a new user & send OTP email | Public |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & return JWT token | Public |
| **Auth** | `GET` | `/api/auth/users` | Fetch list of all registered users | Admin |
| **Products** | `GET` | `/api/products` | Get all products | Public |
| **Products** | `GET` | `/api/products/:id` | Get single product by ID | Public |
| **Products** | `POST` | `/api/products` | Create product (with Cloudinary image) | Admin |
| **Products** | `PUT` | `/api/products/:id` | Update product details or image | Admin |
| **Products** | `DELETE` | `/api/products/:id` | Delete product | Admin |
| **Orders** | `POST` | `/api/orders` | Place a new order & send confirmation email | User |
| **Orders** | `GET` | `/api/orders/myorders` | Get logged-in user's order history | User |
| **Orders** | `GET` | `/api/orders` | Get all customer orders | Admin |
| **Orders** | `PUT` | `/api/orders/:id` | Update order status (`Pending`/`Shipped`/`Delivered`) | Admin |
| **Payments** | `POST` | `/api/payments/order` | Generate Razorpay order ID | User |
| **Payments** | `POST` | `/api/payments/verify` | Verify Razorpay payment signature | User |
| **Analytics**| `GET` | `/api/analytics` | Get total orders, products, users & revenue | Admin |

---

## 📄 License

This project is licensed under the **MIT License**.
