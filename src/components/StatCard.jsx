import {
  Wallet,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const icons = {
  revenue: Wallet,
  customers: Users,
  orders: ShoppingBag,
  conversion: TrendingUp,
};

function StatCard({ item }) {
  const Icon = icons[item.icon];
  const ChangeIcon = item.positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{item.title}</span>
        <div className="stat-icon"><Icon size={19} /></div>
      </div>

      <h3>{item.value}</h3>

      <div className="stat-card-bottom">
        <span className={item.positive ? "change positive" : "change negative"}>
          <ChangeIcon size={14} />
          {item.change}
        </span>
        <span className="stat-note">{item.note}</span>
      </div>
    </div>
  );
}

export default StatCard;
