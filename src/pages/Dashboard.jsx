
import { Download, ArrowUpRight, MoreHorizontal } from "lucide-react";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import { stats, transactions } from "../data/mockData";

function Dashboard() {
  return (
    <>
      <div className="welcome-row">
        <div>
          <h1>Good morning, Himadree <span>✦</span></h1>
          <p>Here's what's happening with your store today.</p>
        </div>

        <button className="export-button" onClick={() => window.print()}>
          <Download size={16} /> Export report
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="dashboard-grid">
        <RevenueChart />

        <div className="panel goal-panel">
          <div className="panel-heading">
            <div>
              <h3>Monthly Target</h3>
              <p>Your progress this month</p>
            </div>
            <button className="more-button">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="goal-content">
            <div className="goal-circle">
              <div className="goal-circle-inner">
                <strong>78%</strong>
                <span>Achieved</span>
              </div>
            </div>

            <h3>$39,200 <span>/ $50,000</span></h3>
            <p className="goal-caption">
              You're doing great! Keep it up to reach your monthly target.
            </p>
          </div>

          <div className="goal-footer">
            <span>Remaining</span>
            <strong>$10,800</strong>
          </div>
        </div>
      </div>

      <div className="panel transactions-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Transactions</h3>
            <p>Keep track of your latest customer payments</p>
          </div>

          <a href="/transactions" className="view-all">
            View all <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Desktop Table */}
        <div className="table-responsive dashboard-desktop-transactions">
          <table className="table dashboard-table align-middle">
            <thead>
              <tr>
                <th>TRANSACTION</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {transactions.slice(0, 4).map((item) => (
                <tr key={item.id}>
                  <td className="transaction-id">{item.id}</td>

                  <td>
                    <div className="customer-cell">
                      <img
                        src={item.avatar}
                        alt={item.customer}
                        className="dashboard-customer-avatar"
                      />
                      <div>
                        <strong>{item.customer}</strong>
                        <small>{item.email}</small>
                      </div>
                    </div>
                  </td>

                  <td className="date-cell">{item.date}</td>
                  <td className="amount-cell">{item.amount}</td>

                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="dashboard-mobile-transactions">
          {transactions.slice(0, 4).map((item) => (
            <div className="mobile-transaction-card" key={item.id}>
              <div className="mobile-transaction-top">
                <div className="customer-cell">
                  <img
                    src={item.avatar}
                    alt={item.customer}
                    className="dashboard-customer-avatar"
                  />
                  <div>
                    <strong>{item.customer}</strong>
                    <small>{item.email}</small>
                  </div>
                </div>

                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              <div className="mobile-transaction-bottom">
                <div>
                  <span>Transaction ID</span>
                  <strong>{item.id}</strong>
                </div>

                <div className="mobile-transaction-amount">
                  <span>{item.date}</span>
                  <strong>{item.amount}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
