import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { revenueData } from "../data/mockData";

function RevenueChart() {
  return (
    <div className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <h3>Revenue Overview</h3>
          <p>Track your revenue performance over time</p>
        </div>

        <select className="period-select" defaultValue="12">
          <option value="12">Last 12 months</option>
          <option value="6">Last 6 months</option>
        </select>
      </div>

      <div className="chart-legend">
        <span><i className="legend-dot revenue-dot" /> Revenue</span>
        <span><i className="legend-dot expense-dot" /> Expenses</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 8, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6378ea" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#f08b70" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e5ad8e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#e5ad8e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#edf0ec" vertical={false} strokeDasharray="4 4" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#929b92", fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#929b92", fontSize: 10 }} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            <Area type="monotone" dataKey="revenue" stroke="#6378ea" strokeWidth={2.5} fill="url(#revenueGradient)" />
            <Area type="monotone" dataKey="expenses" stroke="#f08b70" strokeWidth={2} fill="url(#expenseGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
