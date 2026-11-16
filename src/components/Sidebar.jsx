
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  ArrowLeftRight,
  Users,
  Settings,
  CircleHelp,
  Layers,
  X,
  Bell,
  Check,
  Headset,
  Mail,
  MessageCircle,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

import { transactionsData } from "../pages/Transactions";

function Sidebar({ unreadCount = 0, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const profileName = profile?.name || "Himadree Chowdhury";
  const profileEmail = profile?.email || "himadree@example.com";

  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const transactionCount = transactionsData.length;

  const menuItems = [
    { label: "Overview", path: "/", icon: LayoutDashboard },
    { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
    { label: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { label: "Notifications", path: "/notifications", icon: Bell },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveModal(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openSettings = () => {
    setMobileOpen(false);
    navigate("/settings");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={22} /> : <Layers size={22} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Layers size={22} />
          </div>
          <span>
            nexus<span className="brand-dot">.</span>
          </span>
        </div>

        {/* Workspace */}
        <div className="workspace">
          <div className="workspace-avatar">N</div>
          <div>
            <strong>Nexus Studio</strong>
            <small>Free workspace</small>
          </div>
          <span className="workspace-arrow">⌄</span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          {menuItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={19} />
              <span>{label}</span>

              {label === "Transactions" && (
                <span className="nav-count">
                  {transactionCount}
                </span>
              )}

              {label === "Notifications" && unreadCount > 0 && (
                <span className="nav-count notification-count">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <p className="sidebar-label management-label">MANAGEMENT</p>

        <div className="sidebar-nav">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setMobileOpen(false)}
          >
            <Users size={19} />
            <span>Customers</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setMobileOpen(false)}
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => {
              setMobileOpen(false);
              setActiveModal("support");
            }}
          >
            <CircleHelp size={19} />
            <span>Help & Support</span>
          </button>

          {/* Upgrade Card */}
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Upgrade your plan</strong>
            <p>Get more insights and unlock advanced features.</p>
            <button
              onClick={() => {
                setMobileOpen(false);
                setActiveModal("plans");
              }}
            >
              Explore plans <span>→</span>
            </button>
          </div>

          {/* Dynamic Profile */}
          <button
            type="button"
            className="profile sidebar-profile-button"
            title={`${profileName} - ${profileEmail}`}
            onClick={openSettings}
          >
            <div className="profile-avatar">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profileName}
                  className="sidebar-profile-avatar"
                />
              ) : (
                <span>{initials || "HC"}</span>
              )}
            </div>

            <div className="profile-info">
              <strong>{profileName}</strong>
              <small>{profile?.role || "Administrator"}</small>
            </div>

            <span className="profile-more">•••</span>
          </button>
        </div>
      </aside>

      {/* Help & Support Modal */}
      {activeModal === "support" && (
        <div
          className="sidebar-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="sidebar-modal support-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="sidebar-modal-close"
              onClick={closeModal}
              aria-label="Close support modal"
            >
              <X size={19} />
            </button>

            <div className="sidebar-modal-icon support-modal-icon">
              <Headset size={25} />
            </div>

            <h2 id="support-modal-title">How can we help?</h2>
            <p className="sidebar-modal-description">
              Find help and guidance for using your Nexus workspace.
            </p>

            <div className="support-option">
              <div className="support-option-icon">
                <MessageCircle size={19} />
              </div>
              <div>
                <strong>Help Center</strong>
                <span>Explore guides and frequently asked questions.</span>
              </div>
            </div>

            <div className="support-option">
              <div className="support-option-icon">
                <Mail size={19} />
              </div>
              <div>
                <strong>Email Support</strong>
                <span>Support contact integration coming soon.</span>
              </div>
            </div>

            <div className="support-option">
              <div className="support-option-icon">
                <ShieldCheck size={19} />
              </div>
              <div>
                <strong>Account & Security</strong>
                <span>Manage your profile and security preferences.</span>
              </div>
            </div>

            <button
              className="sidebar-modal-primary"
              onClick={() => {
                closeModal();
                navigate("/settings");
              }}
            >
              Go to Settings
            </button>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {activeModal === "plans" && (
        <div
          className="sidebar-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="sidebar-modal pricing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="sidebar-modal-close"
              onClick={closeModal}
              aria-label="Close pricing modal"
            >
              <X size={19} />
            </button>

            <div className="sidebar-modal-icon pricing-modal-icon">
              <Sparkles size={25} />
            </div>

            <h2 id="pricing-modal-title">Choose your plan</h2>
            <p className="sidebar-modal-description">
              Find the right workspace experience for your business.
            </p>

            <div className="pricing-plan-list">
              <div className="pricing-plan-card current-plan">
                <div className="pricing-plan-top">
                  <div>
                    <span className="pricing-plan-label">CURRENT PLAN</span>
                    <h3>Free</h3>
                  </div>
                  <strong>$0 <small>/ month</small></strong>
                </div>

                <ul>
                  <li><Check size={15} /> Dashboard overview</li>
                  <li><Check size={15} /> Basic analytics</li>
                  <li><Check size={15} /> Customer management</li>
                  <li><Check size={15} /> Transaction tracking</li>
                </ul>

                <button disabled className="pricing-current-button">
                  Current Plan
                </button>
              </div>

              <div className="pricing-plan-card pro-plan">
                <div className="pricing-plan-top">
                  <div>
                    <span className="pricing-plan-label">ADVANCED</span>
                    <h3>Pro</h3>
                  </div>
                  <strong>$19 <small>/ month</small></strong>
                </div>

                <ul>
                  <li><Check size={15} /> Advanced analytics</li>
                  <li><Check size={15} /> Detailed business reports</li>
                  <li><Check size={15} /> Priority support</li>
                  <li><Check size={15} /> Advanced workspace tools</li>
                </ul>

                <button
                  disabled
                  className="pricing-coming-button"
                >
                  <Zap size={15} />
                  Coming Soon
                </button>
              </div>
            </div>

            <p className="pricing-demo-note">
              <ShieldCheck size={14} />
              Demo pricing — subscription payments are not connected.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
