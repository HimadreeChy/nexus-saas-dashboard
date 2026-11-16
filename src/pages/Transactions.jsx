
import { useMemo, useState } from "react";
import {
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  CheckCircle2,
  Clock3,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  CalendarDays,
  ArrowUpDown,
  X,
  UserRound,
  Mail,
  Hash,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";

// Same customer data and avatar URLs as Customers.jsx
export const transactionsData = [
  {
    id: "TXN-2026-001",
    customer: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    date: "Nov 16, 2026",
    amount: 2450,
    method: "Visa ending 4242",
    status: "Completed",
  },
  {
    id: "TXN-2026-002",
    customer: "Michael Smith",
    email: "michael.smith@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    date: "Nov 15, 2026",
    amount: 1250,
    method: "Mastercard ending 8831",
    status: "Pending",
  },
  {
    id: "TXN-2026-003",
    customer: "Emily Davis",
    email: "emily.davis@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=44",
    date: "Nov 15, 2026",
    amount: 3200,
    method: "PayPal",
    status: "Completed",
  },
  {
    id: "TXN-2026-004",
    customer: "James Wilson",
    email: "james.wilson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    date: "Nov 14, 2026",
    amount: 890,
    method: "Visa ending 1920",
    status: "Failed",
  },
  {
    id: "TXN-2026-005",
    customer: "Olivia Brown",
    email: "olivia.brown@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=49",
    date: "Nov 14, 2026",
    amount: 1750,
    method: "Mastercard ending 5612",
    status: "Completed",
  },
  {
    id: "TXN-2026-006",
    customer: "William Taylor",
    email: "william.taylor@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=14",
    date: "Nov 13, 2026",
    amount: 2100,
    method: "PayPal",
    status: "Refunded",
  },
  {
    id: "TXN-2026-007",
    customer: "Sophia Anderson",
    email: "sophia.anderson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=45",
    date: "Nov 12, 2026",
    amount: 4600,
    method: "Visa ending 7788",
    status: "Completed",
  },
  {
    id: "TXN-2026-008",
    customer: "Benjamin Martin",
    email: "benjamin.martin@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=15",
    date: "Nov 11, 2026",
    amount: 950,
    method: "Mastercard ending 1122",
    status: "Pending",
  },
  {
    id: "TXN-2026-009",
    customer: "Isabella Thomas",
    email: "isabella.thomas@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=48",
    date: "Nov 10, 2026",
    amount: 2800,
    method: "Visa ending 4431",
    status: "Completed",
  },
  {
    id: "TXN-2026-010",
    customer: "Lucas Garcia",
    email: "lucas.garcia@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=16",
    date: "Nov 09, 2026",
    amount: 1350,
    method: "PayPal",
    status: "Refunded",
  },
  {
    id: "TXN-2026-011",
    customer: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    date: "Nov 08, 2026",
    amount: 1950,
    method: "Visa ending 9210",
    status: "Completed",
  },
  {
    id: "TXN-2026-012",
    customer: "Michael Smith",
    email: "michael.smith@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    date: "Nov 07, 2026",
    amount: 750,
    method: "Mastercard ending 6711",
    status: "Failed",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

function Transactions({ showToast }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [dateRange, setDateRange] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const result = transactionsData.filter((transaction) => {
      const searchMatch = [
        transaction.id,
        transaction.customer,
        transaction.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || transaction.status === statusFilter;

      const transactionDate = new Date(transaction.date);

      let dateMatch = true;

      if (dateRange === "7" || dateRange === "30") {
        const days = Number(dateRange);
        const startDate = new Date(today);

        startDate.setDate(today.getDate() - (days - 1));
        startDate.setHours(0, 0, 0, 0);

        dateMatch =
          transactionDate >= startDate &&
          transactionDate <= today;
      } else if (dateRange === "custom") {
        const start = customStart
          ? new Date(`${customStart}T00:00:00`)
          : null;

        const end = customEnd
          ? new Date(`${customEnd}T23:59:59.999`)
          : null;

        dateMatch =
          (!start || transactionDate >= start) &&
          (!end || transactionDate <= end);
      }

      return searchMatch && statusMatch && dateMatch;
    });

    if (sortOrder === "amount-high") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortOrder === "amount-low") {
      result.sort((a, b) => a.amount - b.amount);
    } else {
      result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    return result;
  }, [
    search,
    statusFilter,
    sortOrder,
    dateRange,
    customStart,
    customEnd,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedTransactions = filteredTransactions.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const completedCount = transactionsData.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingCount = transactionsData.filter(
    (item) => item.status === "Pending"
  ).length;

  const refundedCount = transactionsData.filter(
    (item) => item.status === "Refunded"
  ).length;

  const totalRevenue = transactionsData
    .filter((item) => item.status === "Completed")
    .reduce((total, item) => total + item.amount, 0);

  const handleFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDateRange = (value) => {
    setDateRange(value);
    setCurrentPage(1);

    if (value !== "custom") {
      setCustomStart("");
      setCustomEnd("");
    }
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All");
    setSortOrder("newest");
    setDateRange("all");
    setCustomStart("");
    setCustomEnd("");
    setCurrentPage(1);
  };

  // Export filtered transactions as CSV
  const handleExport = () => {
    if (filteredTransactions.length === 0) {
      showToast?.(
        "There are no transactions available to export.",
        "warning"
      );
      return;
    }

    try {
      const headers = [
        "Transaction ID",
        "Customer",
        "Email",
        "Date",
        "Amount",
        "Payment Method",
        "Status",
      ];

      const rows = filteredTransactions.map((item) => [
        item.id,
        item.customer,
        item.email,
        item.date,
        item.amount,
        item.method,
        item.status,
      ]);

      const csvContent = [headers, ...rows]
        .map((row) =>
          row
            .map((value) => `"${String(value).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "nexus-transactions.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      showToast?.(
        `${filteredTransactions.length} transaction records exported successfully.`,
        "success"
      );
    } catch {
      showToast?.(
        "Unable to export transactions. Please try again.",
        "error"
      );
    }
  };

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      change: "+12.8%",
      description: "vs. previous month",
      icon: CreditCard,
      color: "blue",
      trend: "up",
    },
    {
      title: "Completed",
      value: completedCount,
      change: "+8.2%",
      description: "Successful payments",
      icon: CheckCircle2,
      color: "violet",
      trend: "up",
    },
    {
      title: "Pending",
      value: pendingCount,
      change: "Needs attention",
      description: "Awaiting confirmation",
      icon: Clock3,
      color: "orange",
      trend: "down",
    },
    {
      title: "Refunded",
      value: refundedCount,
      change: "Last 30 days",
      description: "Processed refunds",
      icon: RotateCcw,
      color: "coral",
      trend: "down",
    },
  ];

  return (
    <div className="transactions-page">
      <div className="transactions-heading">
        <div>
          <h1>Transactions</h1>
          <p>Manage, track and monitor all your payment activities.</p>
        </div>

        <button className="transactions-export" onClick={handleExport}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="transaction-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="transaction-stat-card" key={stat.title}>
              <div className="transaction-stat-top">
                <div className={`transaction-stat-icon ${stat.color}`}>
                  <Icon size={20} />
                </div>

                <span className={`transaction-stat-change ${stat.trend}`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  {stat.change}
                </span>
              </div>

              <h3>{stat.value}</h3>
              <p className="transaction-stat-title">{stat.title}</p>
              <span className="transaction-stat-description">
                {stat.description}
              </span>
            </div>
          );
        })}
      </div>

      <div className="transactions-table-panel">
        <div className="transactions-panel-heading">
          <div>
            <h3>All Transactions</h3>
            <p>View and manage your recent payment transactions.</p>
          </div>

          <span className="transaction-count">
            {filteredTransactions.length} transactions
          </span>
        </div>

        <div className="transactions-toolbar">
          <div className="transaction-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search by name, email or transaction ID..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="transactions-toolbar-actions">
            <div className="transaction-sort">
              <ArrowUpDown size={15} />
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Sort transactions"
              >
                <option value="newest">Newest first</option>
                <option value="amount-high">Highest amount</option>
                <option value="amount-low">Lowest amount</option>
              </select>
            </div>

            <div className="transaction-date-filter">
              <CalendarDays size={15} />

              <select
                value={dateRange}
                onChange={(e) => handleDateRange(e.target.value)}
                aria-label="Filter by date"
              >
                <option value="all">All Dates</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <button
              className="transaction-filter-button"
              onClick={handleReset}
            >
              <SlidersHorizontal size={15} />
              Reset
            </button>
          </div>
        </div>

        {dateRange === "custom" && (
          <div className="transaction-custom-dates">
            <div>
              <label htmlFor="transaction-start-date">Start Date</label>
              <input
                id="transaction-start-date"
                type="date"
                value={customStart}
                max={customEnd || undefined}
                onChange={(e) => {
                  setCustomStart(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div>
              <label htmlFor="transaction-end-date">End Date</label>
              <input
                id="transaction-end-date"
                type="date"
                value={customEnd}
                min={customStart || undefined}
                onChange={(e) => {
                  setCustomEnd(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        )}

        <div className="transaction-tabs">
          {["All", "Completed", "Pending", "Failed", "Refunded"].map(
            (status) => (
              <button
                key={status}
                className={`transaction-tab ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => handleFilter(status)}
              >
                {status}
                {status === "All" && (
                  <span>{transactionsData.length}</span>
                )}
              </button>
            )
          )}
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <span className="transaction-id">
                        {transaction.id}
                      </span>
                    </td>

                    <td>
                      <div className="transaction-customer">
                        <img
                          className="transaction-avatar"
                          src={transaction.avatar}
                          alt={transaction.customer}
                          loading="lazy"
                        />

                        <div className="transaction-customer-info">
                          <strong>{transaction.customer}</strong>
                          <span>{transaction.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="transaction-date">
                        <CalendarDays size={14} />
                        {transaction.date}
                      </div>
                    </td>

                    <td>
                      <span className="transaction-method">
                        {transaction.method}
                      </span>
                    </td>

                    <td>
                      <strong className="transaction-amount">
                        {formatCurrency(transaction.amount)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`transaction-status ${transaction.status.toLowerCase()}`}
                      >
                        <span className="status-dot"></span>
                        {transaction.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="transaction-action"
                        title={`View details for ${transaction.id}`}
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <MoreHorizontal size={19} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="transactions-empty">
                      <Search size={25} />
                      <strong>No transactions found</strong>
                      <span>
                        Try changing your search, date or status filter.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="transactions-pagination">
          <span>
            Showing{" "}
            {filteredTransactions.length === 0
              ? 0
              : (safePage - 1) * itemsPerPage + 1}
            {" "}to{" "}
            {Math.min(
              safePage * itemsPerPage,
              filteredTransactions.length
            )}{" "}
            of {filteredTransactions.length} results
          </span>

          <div className="pagination-controls">
            <button
              className="pagination-arrow"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-number ${
                  safePage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pagination-arrow"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {selectedTransaction && (
        <div
          className="transaction-modal-overlay"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="transaction-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-modal-title"
          >
            <div className="transaction-modal-header">
              <div>
                <span className="transaction-modal-eyebrow">
                  PAYMENT INFORMATION
                </span>
                <h2 id="transaction-modal-title">Transaction Details</h2>
              </div>

              <button
                className="transaction-modal-close"
                onClick={() => setSelectedTransaction(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="transaction-modal-body">
              <div className="transaction-modal-amount">
                <span>Transaction Amount</span>
                <h1>{formatCurrency(selectedTransaction.amount)}</h1>

                <span
                  className={`transaction-status ${selectedTransaction.status.toLowerCase()}`}
                >
                  <span className="status-dot"></span>
                  {selectedTransaction.status}
                </span>
              </div>

              <div className="transaction-modal-divider"></div>

              <div className="transaction-modal-section">
                <h4>Transaction Information</h4>

                <div className="transaction-detail-row">
                  <div className="transaction-detail-label">
                    <Hash size={16} />
                    Transaction ID
                  </div>
                  <strong>{selectedTransaction.id}</strong>
                </div>

                <div className="transaction-detail-row">
                  <div className="transaction-detail-label">
                    <CalendarDays size={16} />
                    Transaction Date
                  </div>
                  <strong>{selectedTransaction.date}</strong>
                </div>

                <div className="transaction-detail-row">
                  <div className="transaction-detail-label">
                    <Wallet size={16} />
                    Payment Method
                  </div>
                  <strong>{selectedTransaction.method}</strong>
                </div>

                <div className="transaction-detail-row">
                  <div className="transaction-detail-label">
                    <Receipt size={16} />
                    Payment Type
                  </div>
                  <strong>
                    {selectedTransaction.method.includes("PayPal")
                      ? "Digital Wallet"
                      : "Card Payment"}
                  </strong>
                </div>
              </div>

              <div className="transaction-modal-divider"></div>

              <div className="transaction-modal-section">
                <h4>Customer Information</h4>

                <div className="transaction-modal-customer">
                  <img
                    className="transaction-avatar"
                    src={selectedTransaction.avatar}
                    alt={selectedTransaction.customer}
                  />

                  <div>
                    <strong>{selectedTransaction.customer}</strong>
                    <span>Customer</span>
                  </div>
                </div>

                <div className="transaction-detail-row">
                  <div className="transaction-detail-label">
                    <UserRound size={16} />
                    Customer Name
                  </div>
                  <strong>{selectedTransaction.customer}</strong>
                </div>

                <div className="transaction-detail-row">
                  <div className="transaction-detail-label">
                    <Mail size={16} />
                    Email Address
                  </div>
                  <strong>{selectedTransaction.email}</strong>
                </div>
              </div>

              <div className="transaction-modal-note">
                <ShieldCheck size={18} />
                <span>
                  This transaction record is available in your Nexus dashboard.
                </span>
              </div>
            </div>

            <div className="transaction-modal-footer">
              <button
                className="transaction-modal-done"
                onClick={() => setSelectedTransaction(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
