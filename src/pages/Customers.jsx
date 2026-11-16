
import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Users,
  UserCheck,
  UserPlus,
  ShoppingBag,
  MoreHorizontal,
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const customersData = [
  {
    id: "CUS-1001",
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    phone: "+1 202 555 0142",
    location: "New York, USA",
    joined: "Nov 16, 2026",
    orders: 24,
    spent: 2840,
    status: "Active",
  },
  {
    id: "CUS-1002",
    name: "Michael Smith",
    email: "michael.smith@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "+1 202 555 0183",
    location: "Los Angeles, USA",
    joined: "Nov 15, 2026",
    orders: 18,
    spent: 1960,
    status: "Active",
  },
  {
    id: "CUS-1003",
    name: "Emily Davis",
    email: "emily.davis@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=44",
    phone: "+1 202 555 0194",
    location: "Chicago, USA",
    joined: "Nov 14, 2026",
    orders: 12,
    spent: 1450,
    status: "Active",
  },
  {
    id: "CUS-1004",
    name: "James Wilson",
    email: "james.wilson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    phone: "+1 202 555 0175",
    location: "Houston, USA",
    joined: "Nov 12, 2026",
    orders: 3,
    spent: 320,
    status: "Inactive",
  },
  {
    id: "CUS-1005",
    name: "Olivia Brown",
    email: "olivia.brown@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=49",
    phone: "+1 202 555 0126",
    location: "Seattle, USA",
    joined: "Nov 10, 2026",
    orders: 31,
    spent: 4280,
    status: "Active",
  },
  {
    id: "CUS-1006",
    name: "William Taylor",
    email: "william.taylor@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=14",
    phone: "+1 202 555 0167",
    location: "Miami, USA",
    joined: "Nov 08, 2026",
    orders: 7,
    spent: 780,
    status: "Inactive",
  },
  {
    id: "CUS-1007",
    name: "Sophia Anderson",
    email: "sophia.anderson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=45",
    phone: "+1 202 555 0138",
    location: "Boston, USA",
    joined: "Nov 06, 2026",
    orders: 16,
    spent: 2130,
    status: "Active",
  },
  {
    id: "CUS-1008",
    name: "Benjamin Martin",
    email: "benjamin.martin@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=15",
    phone: "+1 202 555 0119",
    location: "Austin, USA",
    joined: "Nov 03, 2026",
    orders: 5,
    spent: 540,
    status: "Active",
  },
  {
    id: "CUS-1009",
    name: "Isabella Thomas",
    email: "isabella.thomas@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=48",
    phone: "+1 202 555 0150",
    location: "Denver, USA",
    joined: "Oct 29, 2026",
    orders: 0,
    spent: 0,
    status: "Inactive",
  },
  {
    id: "CUS-1010",
    name: "Lucas Garcia",
    email: "lucas.garcia@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=16",
    phone: "+1 202 555 0101",
    location: "San Diego, USA",
    joined: "Oct 25, 2026",
    orders: 22,
    spent: 3250,
    status: "Active",
  },
];

function Customers({ showToast }) {
  const [customers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 6;

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0
  );

  const exportCSV = () => {
    if (filteredCustomers.length === 0) {
      showToast?.(
        "There are no customer records available to export.",
        "warning",
        "No Data Found"
      );
      return;
    }

    try {
      const headers = [
        "Customer ID",
        "Name",
        "Email",
        "Phone",
        "Location",
        "Joined",
        "Orders",
        "Total Spent",
        "Status",
      ];

      const rows = filteredCustomers.map((customer) => [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.location,
        customer.joined,
        customer.orders,
        customer.spent,
        customer.status,
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
      link.download = "nexus-customers.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      showToast?.(
        `${filteredCustomers.length} customer records exported successfully.`,
        "success",
        "Export Complete"
      );
    } catch (error) {
      showToast?.(
        "Something went wrong while exporting customer records.",
        "error",
        "Export Failed"
      );
    }
  };

  const changeFilter = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="customers-page">
      <div className="welcome-row customers-welcome">
        <div>
          <div className="page-eyebrow">CUSTOMER MANAGEMENT</div>
          <h1>Customers</h1>
          <p>Manage your customers and build stronger relationships.</p>
        </div>

        <button className="customer-export-btn" onClick={exportCSV}>
          <Download size={17} />
          Export Customers
        </button>
      </div>

      <div className="customer-stats-grid">
        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon purple">
              <Users size={21} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 12.8%
            </span>
          </div>
          <p>Total Customers</p>
          <h2>{totalCustomers.toLocaleString()}</h2>
          <span className="customer-stat-note">Across all customers</span>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon blue">
              <UserCheck size={21} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 8.4%
            </span>
          </div>
          <p>Active Customers</p>
          <h2>{activeCustomers.toLocaleString()}</h2>
          <span className="customer-stat-note">
            {Math.round((activeCustomers / totalCustomers) * 100)}% of total customers
          </span>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon orange">
              <UserPlus size={21} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 16.2%
            </span>
          </div>
          <p>Inactive Customers</p>
          <h2>{inactiveCustomers.toLocaleString()}</h2>
          <span className="customer-stat-note">Currently inactive</span>
        </div>

        <div className="customer-stat-card">
          <div className="customer-stat-top">
            <div className="customer-stat-icon cyan">
              <ShoppingBag size={21} />
            </div>
            <span className="customer-stat-trend positive">
              <ArrowUpRight size={14} /> 10.5%
            </span>
          </div>
          <p>Customer Revenue</p>
          <h2>${totalRevenue.toLocaleString()}</h2>
          <span className="customer-stat-note">Total customer spending</span>
        </div>
      </div>

      <div className="customers-table-panel">
        <div className="customers-panel-header">
          <div>
            <h3>All Customers</h3>
            <p>View and manage your customer information.</p>
          </div>
          <div className="customers-total-label">
            {filteredCustomers.length} customers
          </div>
        </div>

        <div className="customers-toolbar">
          <div className="customers-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button
                className="customer-search-clear"
                onClick={() => handleSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="customers-filter">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(e) => changeFilter(e.target.value)}
            >
              <option value="All">All Customers</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="customers-table-wrap">
          <table className="customers-table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>CUSTOMER ID</th>
                <th>JOINED DATE</th>
                <th>ORDERS</th>
                <th>TOTAL SPENT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-profile-cell">
                      <img
                        className="customer-avatar"
                        src={customer.avatar}
                        alt={customer.name}
                        loading="lazy"
                      />
                      <div className="customer-name-info">
                        <strong>{customer.name}</strong>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="customer-id">{customer.id}</span>
                  </td>

                  <td>
                    <span className="customer-date">{customer.joined}</span>
                  </td>

                  <td>
                    <span className="customer-order-count">
                      {customer.orders}
                    </span>
                  </td>

                  <td>
                    <strong className="customer-spent">
                      ${customer.spent.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`customer-status ${
                        customer.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      <span className="status-dot"></span>
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="customer-action-btn"
                      onClick={() => setSelectedCustomer(customer)}
                      aria-label={`View ${customer.name}`}
                      title="View customer details"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}

              {currentCustomers.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="customers-empty">
                      <Users size={32} />
                      <strong>No customers found</strong>
                      <span>Try changing your search or filter.</span>
                      <button
                        onClick={() => {
                          handleSearch("");
                          changeFilter("All");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customers-pagination">
          <span>
            Showing{" "}
            {filteredCustomers.length === 0
              ? 0
              : (currentPage - 1) * customersPerPage + 1}
            {" "}to{" "}
            {Math.min(
              currentPage * customersPerPage,
              filteredCustomers.length
            )}{" "}
            of {filteredCustomers.length} customers
          </span>

          <div className="customer-page-controls">
            <button
              disabled={currentPage === 1 || totalPages === 0}
              onClick={() => setCurrentPage((page) => page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "selected" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="customer-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="customer-modal-header">
              <div>
                <h3>Customer Details</h3>
                <p>Customer profile and purchase information</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="customer-modal-profile">
              <img
                className="customer-modal-avatar"
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
              />
              <h2>{selectedCustomer.name}</h2>
              <span>{selectedCustomer.id}</span>
              <span
                className={`customer-status ${
                  selectedCustomer.status === "Active" ? "active" : "inactive"
                }`}
              >
                <span className="status-dot"></span>
                {selectedCustomer.status}
              </span>
            </div>

            <div className="customer-contact-list">
              <div>
                <Mail size={17} />
                <span>{selectedCustomer.email}</span>
              </div>
              <div>
                <Phone size={17} />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div>
                <MapPin size={17} />
                <span>{selectedCustomer.location}</span>
              </div>
              <div>
                <CalendarDays size={17} />
                <span>Joined {selectedCustomer.joined}</span>
              </div>
            </div>

            <div className="customer-modal-stats">
              <div>
                <span>Total Orders</span>
                <strong>{selectedCustomer.orders}</strong>
              </div>
              <div>
                <span>Total Spent</span>
                <strong>${selectedCustomer.spent.toLocaleString()}</strong>
              </div>
            </div>

            <div className="customer-modal-footer">
              <button onClick={() => setSelectedCustomer(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
