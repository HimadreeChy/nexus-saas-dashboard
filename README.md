# Nexus — SaaS Admin Dashboard

A modern, responsive SaaS admin dashboard built with React and Vite. Nexus provides a clean interface for monitoring business performance, managing transactions and customers, tracking notifications, and configuring account preferences.

🚀 **Live Demo:** [View Website](https://nexus-saas-dashboard-xi.vercel.app/)

💻 **GitHub:** [Source Code](https://github.com/HimadreeChy/nexus-saas-dashboard)

## ✨ Features

- **Dashboard Overview** — KPI cards, revenue summary, recent transactions, and business insights.
- **Analytics** — Interactive charts, performance metrics, and time-based filters.
- **Transaction Management** — Search, sorting, status filtering, pagination, transaction details, and CSV export.
- **Customer Management** — Customer search, status filters, profile details, and CSV export.
- **Notification Center** — View, filter, mark as read, and manage notifications.
- **Global Search** — Quickly navigate to relevant customers and transactions.
- **Settings** — Profile management, avatar upload, preferences, and security options.
- **Responsive UI** — Layout designed for desktop, tablet, and mobile screens.
- **Toast Notifications** — Interactive feedback for user actions.

## 🛠️ Tech Stack

- **React** — Component-based UI development
- **Vite** — Development server and build tool
- **React Router DOM** — Client-side navigation
- **Bootstrap 5** — Responsive layout utilities
- **Lucide React** — Icons
- **Recharts** — Data visualization
- **CSS3** — Custom styling and responsive design
- **JavaScript (ES6+)** — Application logic

## 📸 Screenshots

<!-- Add screenshots of your dashboard here -->

| Dashboard | Analytics |
|---|---|
| Add dashboard screenshot | Add analytics screenshot |

| Transactions | Customers |
|---|---|
| Add transactions screenshot | Add customers screenshot |

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HimadreeChy/nexus-saas-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nexus-saas-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
nexus-saas-dashboard/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── RevenueChart.jsx
│   │   └── Toast.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Analytics.jsx
│   │   ├── Transactions.jsx
│   │   ├── Customers.jsx
│   │   ├── Notifications.jsx
│   │   └── Settings.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚠️ Project Notes

Nexus is currently a frontend dashboard project using sample data for demonstration purposes. Features such as transaction management, customer management, and analytics are implemented on the client side. A production backend, database, authentication system, and real payment integration are not included.

## 🔮 Future Improvements

- Backend and database integration
- Secure authentication and authorization
- Real-time analytics and data updates
- API-based customer and transaction management
- Payment gateway integration

## 👩‍💻 Author

**Himadree Chowdhury**

GitHub: [@HimadreeChy](https://github.com/HimadreeChy)

---

*Built with React, Vite, and a focus on clean, responsive dashboard design.*
