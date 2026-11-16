
import { useMemo, useState } from "react";
import {
  Bell,
  ShoppingBag,
  CreditCard,
  UserRound,
  Settings,
  Check,
  CheckCheck,
  Trash2,
  MoreHorizontal,
  Inbox,
  Filter,
} from "lucide-react";

const notificationConfig = {
  order: {
    icon: ShoppingBag,
    color: "blue",
    label: "Order",
  },
  payment: {
    icon: CreditCard,
    color: "green",
    label: "Payment",
  },
  customer: {
    icon: UserRound,
    color: "purple",
    label: "Customer",
  },
  system: {
    icon: Settings,
    color: "orange",
    label: "System",
  },
};

function Notifications({ notifications, setNotifications, showToast }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);

  const unreadCount = notifications.filter((item) => !item.read).length;
  const readCount = notifications.length - unreadCount;

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter((item) => !item.read);
    }

    if (activeFilter === "read") {
      return notifications.filter((item) => item.read);
    }

    return notifications;
  }, [notifications, activeFilter]);

  const markAsRead = (id) => {
    const notification = notifications.find((item) => item.id === id);

    if (!notification || notification.read) {
      setOpenMenu(null);
      return;
    }

    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );

    setOpenMenu(null);

    showToast?.(
      "The notification has been marked as read.",
      "success",
      "Marked as Read"
    );
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) return;

    const updatedCount = unreadCount;

    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );

    showToast?.(
      `${updatedCount} notifications have been marked as read.`,
      "success",
      "All Caught Up"
    );
  };

  const deleteNotification = (id) => {
    const notification = notifications.find((item) => item.id === id);

    if (!notification) return;

    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setOpenMenu(null);

    showToast?.(
      `"${notification.title}" has been deleted.`,
      "success",
      "Notification Deleted"
    );
  };

  const clearAll = () => {
    if (notifications.length === 0) return;

    const deletedCount = notifications.length;

    setNotifications([]);
    setOpenMenu(null);

    showToast?.(
      `${deletedCount} notifications have been cleared.`,
      "success",
      "Notifications Cleared"
    );
  };

  return (
    <div className="notifications-page">

      {/* Page Header */}
      <div className="notifications-heading">
        <div>
          <div className="notification-title">
            <h1>Notifications</h1>
            <span className="notification-title-count">
              {notifications.length}
            </span>
          </div>
          <p>Stay updated with everything happening in your workspace.</p>
        </div>

        <button
          className="mark-all-button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* Summary Cards */}
      <div className="notification-stats">

        <div className="notification-stat-card">
          <div className="notification-stat-icon total-icon">
            <Bell size={19} />
          </div>
          <div>
            <span>Total Notifications</span>
            <h3>{notifications.length}</h3>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="notification-stat-icon unread-icon">
            <Inbox size={19} />
          </div>
          <div>
            <span>Unread Notifications</span>
            <h3>{unreadCount}</h3>
          </div>
        </div>

        <div className="notification-stat-card">
          <div className="notification-stat-icon read-icon">
            <Check size={19} />
          </div>
          <div>
            <span>Read Notifications</span>
            <h3>{readCount}</h3>
          </div>
        </div>

      </div>

      {/* Notification Panel */}
      <div className="notification-panel">

        <div className="notification-panel-header">
          <div>
            <h3>Recent Activity</h3>
            <p>You have {unreadCount} unread notifications</p>
          </div>

          <button
            className="clear-all-button"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 size={15} />
            Clear all
          </button>
        </div>

        {/* Filters */}
        <div className="notification-filter-row">
          <div className="notification-tabs">
            {[
              { key: "all", label: "All", count: notifications.length },
              { key: "unread", label: "Unread", count: unreadCount },
              { key: "read", label: "Read", count: readCount },
            ].map((tab) => (
              <button
                key={tab.key}
                className={
                  activeFilter === tab.key
                    ? "notification-tab active"
                    : "notification-tab"
                }
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
                <span>{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="notification-filter-label">
            <Filter size={15} />
            <span>Activity feed</span>
          </div>
        </div>

        {/* Notification List */}
        <div className="notification-list">

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => {
              const config =
                notificationConfig[item.type] || notificationConfig.system;

              const Icon = config.icon;

              return (
                <div
                  key={item.id}
                  className={`notification-item ${
                    !item.read ? "notification-unread" : ""
                  }`}
                >

                  <div className={`notification-item-icon ${config.color}`}>
                    <Icon size={19} />
                  </div>

                  <div className="notification-item-content">
                    <div className="notification-item-top">
                      <div className="notification-item-title">
                        <h4>{item.title}</h4>

                        {!item.read && (
                          <span className="unread-indicator" />
                        )}
                      </div>

                      <span className="notification-time">
                        {item.time}
                      </span>
                    </div>

                    <p>{item.message}</p>

                    <div className="notification-item-bottom">
                      <span className={`notification-category ${config.color}`}>
                        {config.label}
                      </span>

                      <span className="notification-date">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="notification-actions">
                    <button
                      className="notification-more"
                      title="More options"
                      onClick={() =>
                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {openMenu === item.id && (
                      <div className="notification-dropdown">
                        {!item.read && (
                          <button onClick={() => markAsRead(item.id)}>
                            <Check size={15} />
                            Mark as read
                          </button>
                        )}

                        <button
                          className="delete-option"
                          onClick={() => deleteNotification(item.id)}
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })
          ) : (
            <div className="notification-empty">
              <div className="notification-empty-icon">
                <Bell size={28} />
              </div>

              <h3>
                {activeFilter === "unread"
                  ? "You're all caught up!"
                  : activeFilter === "read"
                  ? "No read notifications"
                  : "No notifications yet"}
              </h3>

              <p>
                {activeFilter === "unread"
                  ? "You don't have any unread notifications."
                  : "Notifications will appear here when there's new activity."}
              </p>

              {activeFilter !== "all" && (
                <button onClick={() => setActiveFilter("all")}>
                  View all notifications
                </button>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="notification-panel-footer">
          <span>
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </span>
          <span>Updated just now</span>
        </div>

      </div>

    </div>
  );
}

export default Notifications;
