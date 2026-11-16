
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Bell,
  CalendarDays,
  ShoppingBag,
  CreditCard,
  UserRound,
  Settings,
  CheckCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Receipt,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { customersData } from "../pages/Customers";
import { transactionsData } from "../pages/Transactions";

const notificationIcons = {
  order: ShoppingBag,
  payment: CreditCard,
  customer: UserRound,
  system: Settings,
};

const notificationColors = {
  order: "blue",
  payment: "green",
  customer: "purple",
  system: "orange",
};

const safeText = (value) =>
  value === null || value === undefined ? "" : String(value);

function Header({
  notifications = [],
  setNotifications,
  unreadCount = 0,
  profile,
  showToast,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dropdownRef = useRef(null);
  const calendarRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const titles = {
    "/": "Overview",
    "/analytics": "Analytics",
    "/transactions": "Transactions",
    "/customers": "Customers",
    "/notifications": "Notifications",
    "/settings": "Settings",
  };

  const title = titles[location.pathname] || "Dashboard";
  const recentNotifications = notifications.slice(0, 3);

  const profileName = profile?.name || "Himadree Chowdhury";
  const profileEmail = profile?.email || "himadree@example.com";

  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const today = new Date();

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const formattedSelectedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  // GLOBAL SEARCH
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return {
        customers: [],
        transactions: [],
      };
    }

    const customers = customersData
      .filter((customer) => {
        const searchableText = [
          customer.name,
          customer.email,
          customer.id,
          customer.phone,
        ]
          .map(safeText)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 5);

    const transactions = transactionsData
      .filter((transaction) => {
        const searchableText = [
          transaction.id,
          transaction.customer,
          transaction.email,
          transaction.status,
          transaction.method,
        ]
          .map(safeText)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 5);

    return {
      customers,
      transactions,
    };
  }, [searchQuery]);

  const searchItems = useMemo(() => {
    return [
      ...searchResults.customers.map((customer) => ({
        type: "customer",
        data: customer,
      })),
      ...searchResults.transactions.map((transaction) => ({
        type: "transaction",
        data: transaction,
      })),
    ];
  }, [searchResults]);

  const totalSearchResults = searchItems.length;

  // Reset selected result when query changes
  useEffect(() => {
    setSelectedResultIndex(0);
  }, [searchQuery]);

  // KEYBOARD SHORTCUT
  useEffect(() => {
    const handleShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen(true);
        setDropdownOpen(false);
        setCalendarOpen(false);

        requestAnimationFrame(() => {
          searchInputRef.current?.focus();
        });
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  // CLICK OUTSIDE AND ESCAPE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setCalendarOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setDropdownOpen(false);
        setCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // SEARCH NAVIGATION
  const handleSearchResult = (result) => {
    if (!result) return;

    const destination =
      result.type === "customer"
        ? "/customers"
        : result.type === "transaction"
        ? "/transactions"
        : null;

    if (!destination) return;

    // Close search and reset its state
    setSearchOpen(false);
    setSearchQuery("");
    setSelectedResultIndex(0);

    // Navigate to selected result's page
    navigate(destination);
  };

  // KEYBOARD RESULT NAVIGATION
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!searchOpen || searchItems.length === 0) return;

      event.preventDefault();
      event.stopPropagation();

      const safeIndex = Math.min(
        Math.max(selectedResultIndex, 0),
        searchItems.length - 1
      );

      const selectedResult = searchItems[safeIndex];

      handleSearchResult(selectedResult);

      return;
    }

    if (!searchOpen || searchItems.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedResultIndex((prev) =>
        prev >= searchItems.length - 1 ? 0 : prev + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedResultIndex((prev) =>
        prev <= 0 ? searchItems.length - 1 : prev - 1
      );
    }
  };

  // NOTIFICATION ACTIONS
  const markAllAsRead = () => {
    if (unreadCount === 0) return;

    const updatedCount = unreadCount;

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );

    showToast?.(
      `${updatedCount} notifications have been marked as read.`,
      "success",
      "All Caught Up"
    );
  };

  const openNotificationsPage = () => {
    setDropdownOpen(false);
    navigate("/notifications");
  };

  const openNotification = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );

    setDropdownOpen(false);
    navigate("/notifications");
  };

  // CALENDAR ACTIONS
  const changeMonth = (direction) => {
    setCurrentMonth((prev) =>
      new Date(
        prev.getFullYear(),
        prev.getMonth() + direction,
        1
      )
    );
  };

  const selectDate = (day) => {
    if (!day) return;

    setSelectedDate(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      )
    );

    setCalendarOpen(false);
  };

  const isToday = (day) =>
    day &&
    today.getDate() === day &&
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();

  const isSelected = (day) =>
    day &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === currentMonth.getMonth() &&
    selectedDate.getFullYear() === currentMonth.getFullYear();

  const goToToday = () => {
    const now = new Date();

    setSelectedDate(now);
    setCurrentMonth(now);
    setCalendarOpen(false);
  };

  // TRANSACTION HELPERS
  const getTransactionAmount = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return "—";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  const getTransactionStatus = (status) => {
    const value = safeText(status).toLowerCase();

    return [
      "completed",
      "pending",
      "failed",
      "refunded",
    ].includes(value)
      ? value
      : "unknown";
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <div className="breadcrumb">
          Workspace <span>/</span> {title}
        </div>

        <h2>{title}</h2>
      </div>

      <div className="header-actions">

        {/* GLOBAL SEARCH */}
        <div className="search-box-wrapper" ref={searchRef}>
          <div
            className={`search-box ${
              searchOpen ? "global-search-active" : ""
            }`}
          >
            <Search size={17} />

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              aria-label="Search customers and transactions"
              aria-expanded={searchOpen && !!searchQuery.trim()}
              aria-controls="global-search-results"
              onFocus={() => {
                setSearchOpen(true);
                setDropdownOpen(false);
                setCalendarOpen(false);
              }}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
            />

            {searchQuery ? (
              <button
                type="button"
                className="global-search-clear"
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(true);
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            ) : (
              <kbd>
                {typeof navigator !== "undefined" &&
                navigator.platform?.includes("Mac")
                  ? "⌘ K"
                  : "Ctrl K"}
              </kbd>
            )}
          </div>

          {searchOpen && searchQuery.trim() && (
            <div
              className="global-search-dropdown"
              id="global-search-results"
            >
              <div className="global-search-heading">
                <span>SEARCH RESULTS</span>
                <small>{totalSearchResults} found</small>
              </div>

              {totalSearchResults > 0 ? (
                <>
                  {/* CUSTOMER RESULTS */}
                  {searchResults.customers.length > 0 && (
                    <div className="global-search-section">
                      <div className="global-search-section-title">
                        <UserRound size={14} />
                        Customers
                        <span>
                          {searchResults.customers.length}
                        </span>
                      </div>

                      {searchResults.customers.map((customer, index) => (
                        <button
                          type="button"
                          key={customer.id}
                          className={`global-search-result ${
                            selectedResultIndex === index
                              ? "search-result-selected"
                              : ""
                          }`}
                          onMouseEnter={() =>
                            setSelectedResultIndex(index)
                          }
                          onClick={() =>
                            handleSearchResult({
                              type: "customer",
                              data: customer,
                            })
                          }
                        >
                          <div className="global-search-avatar">
                            {customer.avatar ? (
                              <img
                                src={customer.avatar}
                                alt={safeText(customer.name)}
                              />
                            ) : (
                              <UserRound size={18} />
                            )}
                          </div>

                          <div className="global-search-result-info">
                            <strong>
                              {safeText(customer.name) ||
                                "Unknown Customer"}
                            </strong>

                            <span>
                              {safeText(customer.email)}
                            </span>

                            <small>
                              Customer ID: {safeText(customer.id)}
                            </small>
                          </div>

                          <ArrowRight
                            size={16}
                            className="global-search-arrow"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* TRANSACTION RESULTS */}
                  {searchResults.transactions.length > 0 && (
                    <div className="global-search-section">
                      <div className="global-search-section-title">
                        <Receipt size={14} />
                        Transactions
                        <span>
                          {searchResults.transactions.length}
                        </span>
                      </div>

                      {searchResults.transactions.map(
                        (transaction, index) => {
                          const resultIndex =
                            searchResults.customers.length + index;

                          const status = getTransactionStatus(
                            transaction.status
                          );

                          return (
                            <button
                              type="button"
                              key={transaction.id}
                              className={`global-search-result ${
                                selectedResultIndex === resultIndex
                                  ? "search-result-selected"
                                  : ""
                              }`}
                              onMouseEnter={() =>
                                setSelectedResultIndex(resultIndex)
                              }
                              onClick={() =>
                                handleSearchResult({
                                  type: "transaction",
                                  data: transaction,
                                })
                              }
                            >
                              <div className="global-search-avatar transaction-search-icon">
                                {transaction.avatar ? (
                                  <img
                                    src={transaction.avatar}
                                    alt={safeText(transaction.customer)}
                                  />
                                ) : (
                                  <Receipt size={18} />
                                )}
                              </div>

                              <div className="global-search-result-info">
                                <strong>
                                  {safeText(transaction.customer) ||
                                    "Unknown Customer"}
                                </strong>

                                <span>
                                  {safeText(transaction.id)}
                                </span>

                                <small>
                                  {safeText(transaction.email)}
                                </small>
                              </div>

                              <div className="global-search-transaction-meta">
                                <strong>
                                  {getTransactionAmount(
                                    transaction.amount
                                  )}
                                </strong>

                                <span
                                  className={`search-status ${status}`}
                                >
                                  {safeText(transaction.status) ||
                                    "Unknown"}
                                </span>
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="global-search-empty">
                  <div>
                    <Search size={23} />
                  </div>

                  <strong>No results found</strong>

                  <span>
                    Try searching with a customer name, email or transaction ID.
                  </span>
                </div>
              )}

              <div className="global-search-footer">
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> Navigate
                  <kbd>Enter</kbd> Open
                  <kbd>ESC</kbd> Close
                </span>

                <span>Search across Nexus</span>
              </div>
            </div>
          )}
        </div>

        {/* CALENDAR */}
        <div className="header-calendar-wrapper" ref={calendarRef}>
          <button
            type="button"
            className={`header-icon ${
              calendarOpen ? "calendar-active" : ""
            }`}
            aria-label="Open calendar"
            aria-expanded={calendarOpen}
            onClick={() => {
              setCalendarOpen((prev) => !prev);
              setDropdownOpen(false);
              setSearchOpen(false);
            }}
          >
            <CalendarDays size={19} />
          </button>

          {calendarOpen && (
            <div className="header-calendar-dropdown">
              <div className="calendar-dropdown-header">
                <div>
                  <h3>Calendar</h3>
                  <p>{formattedSelectedDate}</p>
                </div>

                <button
                  type="button"
                  className="calendar-close"
                  onClick={() => setCalendarOpen(false)}
                  aria-label="Close calendar"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="calendar-month-navigation">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>

                <strong>{monthYear}</strong>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <span className="calendar-weekday" key={day}>
                      {day}
                    </span>
                  )
                )}

                {calendarDays.map((day, index) => (
                  <button
                    type="button"
                    key={index}
                    disabled={!day}
                    className={[
                      "calendar-day",
                      isToday(day) ? "calendar-today" : "",
                      isSelected(day) ? "calendar-selected" : "",
                    ].join(" ")}
                    onClick={() => selectDate(day)}
                  >
                    {day || ""}
                  </button>
                ))}
              </div>

              <div className="calendar-dropdown-footer">
                <span>
                  <CalendarDays size={14} />
                  Select a date
                </span>

                <button
                  type="button"
                  onClick={goToToday}
                >
                  Today
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className="header-notification-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className={`header-icon notification-button ${
              dropdownOpen ? "notification-active" : ""
            }`}
            aria-label="Notifications"
            aria-expanded={dropdownOpen}
            onClick={() => {
              setDropdownOpen((prev) => !prev);
              setCalendarOpen(false);
              setSearchOpen(false);
            }}
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span className="header-notification-dot" />
            )}
          </button>

          {dropdownOpen && (
            <div className="notification-dropdown-panel">
              <div className="dropdown-header">
                <div>
                  <h3>Notifications</h3>

                  <p>
                    {unreadCount > 0
                      ? `${unreadCount} unread notifications`
                      : "You're all caught up"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="dropdown-mark-all"
                    onClick={markAllAsRead}
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="dropdown-notification-list">
                {recentNotifications.length > 0 ? (
                  recentNotifications.map((item) => {
                    const Icon =
                      notificationIcons[item.type] || Bell;

                    const color =
                      notificationColors[item.type] || "blue";

                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`dropdown-notification-item ${
                          !item.read ? "dropdown-item-unread" : ""
                        }`}
                        onClick={() => openNotification(item.id)}
                      >
                        <div
                          className={`dropdown-notification-icon ${color}`}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="dropdown-notification-content">
                          <div className="dropdown-notification-title">
                            <strong>{safeText(item.title)}</strong>

                            {!item.read && (
                              <span className="dropdown-unread-dot" />
                            )}
                          </div>

                          <p>{safeText(item.message)}</p>

                          <span className="dropdown-notification-time">
                            {safeText(item.time)}
                          </span>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="dropdown-empty">
                    <Bell size={25} />
                    <strong>No notifications</strong>
                    <span>You're all caught up!</span>
                  </div>
                )}
              </div>

              <div className="dropdown-footer">
                <button
                  type="button"
                  onClick={openNotificationsPage}
                >
                  View all notifications
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <button
          type="button"
          className="header-user"
          title={`${profileName} - ${profileEmail}`}
          aria-label="Open profile settings"
          onClick={() => navigate("/settings")}
        >
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profileName}
              className="header-profile-avatar"
            />
          ) : (
            <span>{initials || "HC"}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
