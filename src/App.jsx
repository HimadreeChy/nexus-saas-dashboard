
import { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

import "./App.css";

const initialNotifications = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    message: "A new order #NX-2026 has been placed by Sarah Johnson.",
    time: "2 minutes ago",
    date: "Nov 16, 2026",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment successful",
    message: "Payment of $249.00 was successfully received.",
    time: "25 minutes ago",
    date: "Nov 16, 2026",
    read: false,
  },
  {
    id: 3,
    type: "customer",
    title: "New customer registered",
    message: "Michael Smith joined your workspace.",
    time: "1 hour ago",
    date: "Nov 16, 2026",
    read: false,
  },
  {
    id: 4,
    type: "system",
    title: "System update completed",
    message: "Your dashboard has been updated successfully.",
    time: "3 hours ago",
    date: "Nov 16, 2026",
    read: true,
  },
  {
    id: 5,
    type: "order",
    title: "Order status updated",
    message: "Order #NX-1842 has been marked as completed.",
    time: "Yesterday",
    date: "Nov 15, 2026",
    read: true,
  },
  {
    id: 6,
    type: "payment",
    title: "Payment failed",
    message: "Payment for order #NX-1839 could not be processed.",
    time: "Yesterday",
    date: "Nov 15, 2026",
    read: false,
  },
];

const initialProfile = {
  name: "Himadree Chowdhury",
  email: "himadree@example.com",
  phone: "+880 1XXX-XXXXXX",
  role: "Administrator",
  bio: "Managing Nexus Studio workspace and business operations.",
  avatar: "",
};

const getSavedProfile = () => {
  try {
    const savedProfile = localStorage.getItem("nexus-profile");

    return savedProfile
      ? { ...initialProfile, ...JSON.parse(savedProfile) }
      : initialProfile;
  } catch {
    return initialProfile;
  }
};

function App() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [profile, setProfile] = useState(getSavedProfile);
  const [toast, setToast] = useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Global Toast Handler
  const showToast = useCallback((message, type = "success", title) => {
    setToast({
      id: Date.now(),
      message,
      type,
      title,
    });
  }, []);

  const closeToast = useCallback((id) => {
    setToast((currentToast) =>
      currentToast?.id === id ? null : currentToast
    );
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        unreadCount={unreadCount}
        profile={profile}
      />

      <main className="main-content">
        {/* Header */}
        <Header
          notifications={notifications}
          setNotifications={setNotifications}
          unreadCount={unreadCount}
          profile={profile}
          showToast={showToast}
        />

        {/* Main Pages */}
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard showToast={showToast} />}
            />

            <Route
              path="/analytics"
              element={<Analytics showToast={showToast} />}
            />

            <Route
              path="/transactions"
              element={<Transactions showToast={showToast} />}
            />

            <Route
              path="/notifications"
              element={
                <Notifications
                  notifications={notifications}
                  setNotifications={setNotifications}
                  showToast={showToast}
                />
              }
            />

            <Route
              path="/customers"
              element={<Customers showToast={showToast} />}
            />

            <Route
              path="/settings"
              element={
                <Settings
                  profile={profile}
                  setProfile={setProfile}
                  showToast={showToast}
                />
              }
            />

            {/* Invalid Route */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>

      {/* Global Toast Container */}
      <div className="toast-container">
        <Toast
          toast={toast}
          onClose={closeToast}
        />
      </div>
    </div>
  );
}

export default App;
