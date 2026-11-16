
import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  DollarSign,
  Users,
  ShoppingBag,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CalendarDays,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

const analyticsData = {
  "7 Days": [
    { name: "Mon", revenue: 4200, expenses: 1800 },
    { name: "Tue", revenue: 5100, expenses: 2200 },
    { name: "Wed", revenue: 3900, expenses: 1700 },
    { name: "Thu", revenue: 6200, expenses: 2600 },
    { name: "Fri", revenue: 5700, expenses: 2300 },
    { name: "Sat", revenue: 7400, expenses: 3100 },
    { name: "Sun", revenue: 6800, expenses: 2800 },
  ],
  "30 Days": [
    { name: "Week 1", revenue: 18500, expenses: 8200 },
    { name: "Week 2", revenue: 22800, expenses: 9500 },
    { name: "Week 3", revenue: 19600, expenses: 7800 },
    { name: "Week 4", revenue: 28400, expenses: 11200 },
  ],
  "90 Days": [
    { name: "Jan", revenue: 52000, expenses: 22000 },
    { name: "Feb", revenue: 61000, expenses: 26000 },
    { name: "Mar", revenue: 74000, expenses: 31000 },
  ],
  "12 Months": [
    { name: "Jan", revenue: 42000, expenses: 18000 },
    { name: "Feb", revenue: 48000, expenses: 21000 },
    { name: "Mar", revenue: 55000, expenses: 23000 },
    { name: "Apr", revenue: 51000, expenses: 22000 },
    { name: "May", revenue: 65000, expenses: 28000 },
    { name: "Jun", revenue: 72000, expenses: 31000 },
    { name: "Jul", revenue: 68000, expenses: 29000 },
    { name: "Aug", revenue: 79000, expenses: 34000 },
    { name: "Sep", revenue: 74000, expenses: 32000 },
    { name: "Oct", revenue: 85000, expenses: 36000 },
    { name: "Nov", revenue: 92000, expenses: 39000 },
    { name: "Dec", revenue: 105000, expenses: 44000 },
  ],
};

const performanceData = [
  { name: "Jan", sales: 35, customers: 25 },
  { name: "Feb", sales: 45, customers: 32 },
  { name: "Mar", sales: 38, customers: 30 },
  { name: "Apr", sales: 55, customers: 42 },
  { name: "May", sales: 48, customers: 38 },
  { name: "Jun", sales: 68, customers: 50 },
];

const trafficData = [
  { name: "Organic Search", value: 42, color: "#6378ea" },
  { name: "Social Media", value: 28, color: "#9275e8" },
  { name: "Direct", value: 18, color: "#f08b70" },
  { name: "Referral", value: 12, color: "#56b9d5" },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$84,254",
    change: "+12.8%",
    positive: true,
    icon: DollarSign,
    color: "blue",
    note: "Compared to last month",
  },
  {
    title: "Total Customers",
    value: "12,840",
    change: "+8.2%",
    positive: true,
    icon: Users,
    color: "violet",
    note: "Compared to last month",
  },
  {
    title: "Total Orders",
    value: "3,642",
    change: "+5.4%",
    positive: true,
    icon: ShoppingBag,
    color: "coral",
    note: "Compared to last month",
  },
  {
    title: "Conversion Rate",
    value: "4.85%",
    change: "-1.2%",
    positive: false,
    icon: MousePointerClick,
    color: "cyan",
    note: "Compared to last month",
  },
];

const topProducts = [
  { name: "Premium Subscription", category: "Software", sales: 1240, revenue: "$24,800" },
  { name: "Business Plan", category: "Subscription", sales: 980, revenue: "$19,600" },
  { name: "Starter Package", category: "Software", sales: 760, revenue: "$11,400" },
  { name: "Enterprise Plan", category: "Subscription", sales: 520, revenue: "$10,400" },
];

function Analytics({ showToast }) {
  const [period, setPeriod] = useState("12 Months");

  const currentData = analyticsData[period];

  const handleExport = () => {
    showToast?.(
      "Your analytics report is ready to print or save as PDF.",
      "info",
      "Preparing Report"
    );

    window.print();
  };

  return (
    <div className="analytics-page">

      {/* PAGE INTRO */}
      <div className="welcome-row analytics-welcome">
        <div>
          <h1>Analytics Overview</h1>
          <p>Track your business performance and discover valuable insights.</p>
        </div>

        <button className="export-button" onClick={handleExport}>
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* DATE FILTER */}
      <div className="analytics-toolbar">
        <div className="analytics-toolbar-info">
          <CalendarDays size={16} />
          <span>Performance Overview</span>
        </div>

        <div className="analytics-periods">
          {Object.keys(analyticsData).map((item) => (
            <button
              key={item}
              className={period === item ? "period-button active" : "period-button"}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="analytics-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="analytics-stat-card" key={stat.title}>
              <div className="analytics-stat-top">
                <div className={`analytics-stat-icon ${stat.color}`}>
                  <Icon size={19} />
                </div>

                <span className={`analytics-change ${stat.positive ? "up" : "down"}`}>
                  {stat.positive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  {stat.change}
                </span>
              </div>

              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <small>{stat.note}</small>
            </div>
          );
        })}
      </div>

      {/* REVENUE CHART */}
      <div className="analytics-main-grid">
        <div className="analytics-panel revenue-analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <h3>Revenue & Expenses</h3>
              <p>Monitor your income and spending trends</p>
            </div>

            <button className="analytics-more-button">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="analytics-chart-legend">
            <span><i className="revenue-legend"></i> Revenue</span>
            <span><i className="expense-legend"></i> Expenses</span>
          </div>

          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6378ea" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6378ea" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="analyticsExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f08b70" stopOpacity={0.20} />
                    <stop offset="95%" stopColor="#f08b70" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8991a4", fontSize: 11 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8991a4", fontSize: 10 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    border: "1px solid #edf0f5",
                    borderRadius: "10px",
                    fontSize: "12px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6378ea"
                  strokeWidth={2.5}
                  fill="url(#analyticsRevenue)"
                  activeDot={{ r: 5 }}
                />

                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f08b70"
                  strokeWidth={2.5}
                  fill="url(#analyticsExpense)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TRAFFIC SOURCES */}
        <div className="analytics-panel traffic-panel">
          <div className="analytics-panel-header">
            <div>
              <h3>Traffic Sources</h3>
              <p>Where your visitors come from</p>
            </div>

            <button className="analytics-more-button">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="traffic-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={88}
                  paddingAngle={4}
                  stroke="none"
                >
                  {trafficData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>

            <div className="traffic-center">
              <strong>100%</strong>
              <span>Total Traffic</span>
            </div>
          </div>

          <div className="traffic-legend">
            {trafficData.map((item) => (
              <div className="traffic-legend-item" key={item.name}>
                <span>
                  <i style={{ background: item.color }}></i>
                  {item.name}
                </span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERFORMANCE CHART */}
      <div className="analytics-panel performance-panel">
        <div className="analytics-panel-header">
          <div>
            <h3>Sales Performance</h3>
            <p>Sales and customer growth over the last six months</p>
          </div>

          <span className="performance-badge">
            <TrendingUp size={13} />
            Growing
          </span>
        </div>

        <div className="performance-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5" />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8991a4", fontSize: 11 }}
                dy={8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8991a4", fontSize: 10 }}
              />

              <Tooltip
                contentStyle={{
                  border: "1px solid #edf0f5",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="sales"
                name="Sales"
                fill="#6378ea"
                radius={[5, 5, 0, 0]}
                maxBarSize={22}
              />

              <Bar
                dataKey="customers"
                name="Customers"
                fill="#9275e8"
                radius={[5, 5, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="analytics-panel products-panel">
        <div className="analytics-panel-header">
          <div>
            <h3>Top Performing Products</h3>
            <p>Your best-selling products by revenue</p>
          </div>

          <button className="analytics-view-all">View all →</button>
        </div>

        <div className="analytics-table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>PRODUCT NAME</th>
                <th>CATEGORY</th>
                <th>UNITS SOLD</th>
                <th>REVENUE</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.name}>
                  <td>
                    <div className="analytics-product-name">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{product.name}</strong>
                    </div>
                  </td>

                  <td>{product.category}</td>
                  <td>{product.sales.toLocaleString()}</td>
                  <td className="analytics-product-revenue">{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Analytics;
