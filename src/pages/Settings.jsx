
import { useState } from "react";
import {
  UserRound,
  SlidersHorizontal,
  Bell,
  ShieldCheck,
  Building2,
  Camera,
  Save,
  Check,
  LockKeyhole,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Globe,
  Clock3,
  CalendarDays,
  Moon,
  Sun,
  Monitor,
  AlertCircle,
  KeyRound,
  Trash2,
} from "lucide-react";

function Settings({ profile, setProfile, showToast }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [preferences, setPreferences] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexus-preferences")) || {
        language: "English",
        timezone: "Asia/Dhaka",
        dateFormat: "DD/MM/YYYY",
        theme: "Light",
      };
    } catch {
      return {
        language: "English",
        timezone: "Asia/Dhaka",
        dateFormat: "DD/MM/YYYY",
        theme: "Light",
      };
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexus-notifications")) || {
        emailNotifications: true,
        orderUpdates: true,
        paymentAlerts: true,
        customerUpdates: false,
        productNews: false,
        weeklyReports: true,
      };
    } catch {
      return {
        emailNotifications: true,
        orderUpdates: true,
        paymentAlerts: true,
        customerUpdates: false,
        productNews: false,
        weeklyReports: true,
      };
    }
  });

  const [security, setSecurity] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexus-security")) || {
        twoFactor: false,
        loginAlerts: true,
      };
    } catch {
      return {
        twoFactor: false,
        loginAlerts: true,
      };
    }
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const tabs = [
    { id: "profile", label: "My Profile", icon: UserRound },
    { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "account", label: "Account", icon: Building2 },
  ];

  const showSuccess = (text) => {
    setError("");
    setMessage("");
    showToast?.(text, "success");
  };

  const showError = (text) => {
    setMessage("");
    setError(text);
    showToast?.(text, "error");
  };

  const updateProfile = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updatePreference = (field, value) => {
    setPreferences((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleNotification = (field) => {
    setNotifications((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const toggleSecurity = (field) => {
    setSecurity((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const updatePassword = (field, value) => {
    setPasswords((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  // Save profile
  const handleProfileSave = (e) => {
    e.preventDefault();

    if (!profile.name.trim() || !profile.email.trim()) {
      showError("Name and email address are required.");
      return;
    }

    try {
      localStorage.setItem("nexus-profile", JSON.stringify(profile));
      setProfile({ ...profile });

      showSuccess("Profile updated successfully!");
    } catch {
      showError("Unable to save profile. Please try a smaller image.");
    }
  };

  // Save preferences
  const handlePreferencesSave = () => {
    try {
      localStorage.setItem(
        "nexus-preferences",
        JSON.stringify(preferences)
      );

      showSuccess("Your preferences have been updated.");
    } catch {
      showError("Unable to save preferences.");
    }
  };

  // Save notification settings
  const handleNotificationsSave = () => {
    try {
      localStorage.setItem(
        "nexus-notifications",
        JSON.stringify(notifications)
      );

      showSuccess("Notification settings saved successfully.");
    } catch {
      showError("Unable to save notification settings.");
    }
  };

  // Password validation
  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirm
    ) {
      showError("Please complete all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      showError("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      showError("New password and confirmation do not match.");
      return;
    }

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    showToast?.(
      "Password form validated. Connect a backend to update your password.",
      "info"
    );
  };

  // Save security settings
  const handleSecuritySave = () => {
    try {
      localStorage.setItem("nexus-security", JSON.stringify(security));

      showSuccess("Security preferences updated.");
    } catch {
      showError("Unable to save security preferences.");
    }
  };

  // Upload profile photo
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showError("Image size must be less than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateProfile("avatar", reader.result);
      setError("");
      setMessage("");

      showToast?.(
        "Photo selected! Save Changes to update your profile.",
        "info"
      );
    };

    reader.onerror = () => {
      showError("Unable to read this image. Please try another photo.");
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Remove profile photo
  const handleRemoveAvatar = () => {
    updateProfile("avatar", "");
    setMessage("");
    setError("");

    showToast?.(
      "Photo removed. Click Save Changes to confirm.",
      "info"
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage("");
    setError("");
  };

  const initials = (profile?.name || "Himadree Chowdhury")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const renderSwitch = (checked, onChange, label) => (
    <button
      type="button"
      className={`settings-switch ${checked ? "enabled" : ""}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span />
    </button>
  );

  const renderPasswordField = (label, field, placeholder) => (
    <div className="settings-form-group">
      <label>{label}</label>

      <div className="settings-password-input">
        <input
          type={showPasswords[field] ? "text" : "password"}
          value={passwords[field]}
          onChange={(e) => updatePassword(field, e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />

        <button
          type="button"
          onClick={() => togglePasswordVisibility(field)}
          aria-label={
            showPasswords[field] ? "Hide password" : "Show password"
          }
        >
          {showPasswords[field] ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your account, preferences and workspace settings.
          </p>
        </div>

        <div className="settings-heading-icon">
          <SlidersHorizontal size={21} />
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="settings-sidebar-title">
            GENERAL SETTINGS
          </div>

          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`settings-tab ${
                activeTab === id ? "active" : ""
              }`}
              onClick={() => handleTabChange(id)}
            >
              <Icon size={18} />
              <span>{label}</span>

              {activeTab === id && (
                <span className="settings-tab-indicator" />
              )}
            </button>
          ))}

          <div className="settings-sidebar-help">
            <div className="settings-help-icon">
              <ShieldCheck size={19} />
            </div>
            <strong>Your account is protected</strong>
            <p>
              Keep your profile and security information up to date.
            </p>
          </div>
        </aside>

        <section className="settings-content">
          {message && (
            <div className="settings-alert success">
              <Check size={17} />
              <span>{message}</span>
              <button
                onClick={() => setMessage("")}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {error && (
            <div className="settings-alert error">
              <AlertCircle size={17} />
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>My Profile</h2>
                  <p>
                    Manage your personal information and public profile.
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSave}>
                <div className="settings-profile-card">
                  <div className="settings-profile-photo">
                    {profile?.avatar ? (
                      <img src={profile.avatar} alt="Profile" />
                    ) : (
                      <span>{initials || "HC"}</span>
                    )}
                  </div>

                  <div className="settings-photo-info">
                    <strong>Profile Photo</strong>
                    <p>
                      Upload a JPG or PNG image. Maximum size 2 MB.
                    </p>

                    <div className="settings-photo-actions">
                      <label className="settings-upload-button">
                        <Camera size={15} />
                        Upload Photo

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleAvatarChange}
                        />
                      </label>

                      {profile?.avatar && (
                        <button
                          type="button"
                          className="settings-remove-photo"
                          onClick={handleRemoveAvatar}
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-form-group">
                    <label htmlFor="profile-name">Full Name</label>
                    <input
                      id="profile-name"
                      type="text"
                      value={profile?.name || ""}
                      onChange={(e) =>
                        updateProfile("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="profile-email">Email Address</label>
                    <div className="settings-input-icon">
                      <Mail size={16} />
                      <input
                        id="profile-email"
                        type="email"
                        value={profile?.email || ""}
                        onChange={(e) =>
                          updateProfile("email", e.target.value)
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="profile-phone">Phone Number</label>
                    <div className="settings-input-icon">
                      <Smartphone size={16} />
                      <input
                        id="profile-phone"
                        type="tel"
                        value={profile?.phone || ""}
                        onChange={(e) =>
                          updateProfile("phone", e.target.value)
                        }
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <label htmlFor="profile-role">Role</label>
                    <input
                      id="profile-role"
                      type="text"
                      value={profile?.role || "Administrator"}
                      readOnly
                    />
                  </div>

                  <div className="settings-form-group full-width">
                    <label htmlFor="profile-bio">About Me</label>
                    <textarea
                      id="profile-bio"
                      rows="4"
                      value={profile?.bio || ""}
                      onChange={(e) =>
                        updateProfile("bio", e.target.value)
                      }
                      placeholder="Write something about yourself..."
                    />
                  </div>
                </div>

                <div className="settings-form-footer">
                  <button
                    type="submit"
                    className="settings-save-button"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Preferences</h2>
                  <p>
                    Customize how Nexus looks and works for you.
                  </p>
                </div>
              </div>

              <div className="settings-option-list">
                <div className="settings-option">
                  <div className="settings-option-icon">
                    <Globe size={19} />
                  </div>

                  <div className="settings-option-info">
                    <strong>Language</strong>
                    <p>Choose your preferred display language.</p>
                  </div>

                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      updatePreference("language", e.target.value)
                    }
                  >
                    <option>English</option>
                    <option>বাংলা</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div className="settings-option">
                  <div className="settings-option-icon">
                    <Clock3 size={19} />
                  </div>

                  <div className="settings-option-info">
                    <strong>Timezone</strong>
                    <p>Set your local timezone.</p>
                  </div>

                  <select
                    value={preferences.timezone}
                    onChange={(e) =>
                      updatePreference("timezone", e.target.value)
                    }
                  >
                    <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">
                      America/New York
                    </option>
                    <option value="Asia/Dubai">Asia/Dubai</option>
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                  </select>
                </div>

                <div className="settings-option">
                  <div className="settings-option-icon">
                    <CalendarDays size={19} />
                  </div>

                  <div className="settings-option-info">
                    <strong>Date Format</strong>
                    <p>
                      Choose how dates appear across your dashboard.
                    </p>
                  </div>

                  <select
                    value={preferences.dateFormat}
                    onChange={(e) =>
                      updatePreference("dateFormat", e.target.value)
                    }
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="settings-theme-section">
                <h3>Appearance</h3>
                <p>Choose your preferred dashboard appearance.</p>

                <div className="settings-theme-options">
                  {[
                    { value: "Light", label: "Light", icon: Sun },
                    { value: "Dark", label: "Dark", icon: Moon },
                    { value: "System", label: "System", icon: Monitor },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      type="button"
                      key={value}
                      className={`settings-theme-card ${
                        preferences.theme === value ? "active" : ""
                      }`}
                      onClick={() =>
                        updatePreference("theme", value)
                      }
                    >
                      <Icon size={21} />
                      <span>{label}</span>

                      {preferences.theme === value && (
                        <Check
                          size={15}
                          className="settings-theme-check"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <p className="settings-hint">
                  Theme selection is saved as a preference; visual theme
                  switching can be connected later.
                </p>
              </div>

              <div className="settings-form-footer">
                <button
                  className="settings-save-button"
                  onClick={handlePreferencesSave}
                >
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Notification Settings</h2>
                  <p>
                    Choose which updates you want to receive.
                  </p>
                </div>
              </div>

              <div className="settings-notification-group">
                <div className="settings-notification-heading">
                  <div className="settings-option-icon">
                    <Mail size={19} />
                  </div>

                  <div>
                    <strong>Email Notifications</strong>
                    <p>
                      Receive important updates in your inbox.
                    </p>
                  </div>

                  {renderSwitch(
                    notifications.emailNotifications,
                    () => toggleNotification("emailNotifications"),
                    "Email notifications"
                  )}
                </div>

                <div className="settings-notification-items">
                  {[
                    {
                      key: "orderUpdates",
                      title: "Order Updates",
                      description:
                        "Get notified when a new order is placed or updated.",
                    },
                    {
                      key: "paymentAlerts",
                      title: "Payment Alerts",
                      description:
                        "Receive payment confirmations and failure alerts.",
                    },
                    {
                      key: "customerUpdates",
                      title: "Customer Activity",
                      description:
                        "Know when new customers register.",
                    },
                    {
                      key: "weeklyReports",
                      title: "Weekly Reports",
                      description:
                        "Receive a weekly summary of your business activity.",
                    },
                    {
                      key: "productNews",
                      title: "Product News & Updates",
                      description:
                        "Get product announcements and feature updates.",
                    },
                  ].map((item) => (
                    <div
                      className="settings-notification-item"
                      key={item.key}
                    >
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>

                      {renderSwitch(
                        notifications[item.key],
                        () => toggleNotification(item.key),
                        item.title
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-form-footer">
                <button
                  className="settings-save-button"
                  onClick={handleNotificationsSave}
                >
                  <Save size={16} />
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Security</h2>
                  <p>
                    Protect your account and manage your login security.
                  </p>
                </div>
              </div>

              <div className="settings-security-card">
                <div className="settings-security-icon">
                  <LockKeyhole size={21} />
                </div>

                <div>
                  <strong>Password</strong>
                  <p>
                    Update your password regularly to keep your account secure.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordChange}>
                <div className="settings-password-grid">
                  {renderPasswordField(
                    "Current Password",
                    "current",
                    "Enter current password"
                  )}

                  {renderPasswordField(
                    "New Password",
                    "newPassword",
                    "Enter new password"
                  )}

                  {renderPasswordField(
                    "Confirm New Password",
                    "confirm",
                    "Confirm new password"
                  )}
                </div>

                <p className="settings-hint">
                  Use at least 8 characters for your new password.
                </p>

                <div className="settings-form-footer">
                  <button
                    type="submit"
                    className="settings-save-button"
                  >
                    <KeyRound size={16} />
                    Update Password
                  </button>
                </div>
              </form>

              <div className="settings-security-divider" />

              <div className="settings-security-row">
                <div className="settings-option-icon">
                  <ShieldCheck size={19} />
                </div>

                <div className="settings-option-info">
                  <strong>Two-Factor Authentication</strong>
                  <p>
                    Add an extra layer of security to your account.
                  </p>
                </div>

                {renderSwitch(
                  security.twoFactor,
                  () => toggleSecurity("twoFactor"),
                  "Two-factor authentication"
                )}
              </div>

              <div className="settings-security-row">
                <div className="settings-option-icon">
                  <AlertCircle size={19} />
                </div>

                <div className="settings-option-info">
                  <strong>Login Alerts</strong>
                  <p>
                    Get notified about new sign-in activity.
                  </p>
                </div>

                {renderSwitch(
                  security.loginAlerts,
                  () => toggleSecurity("loginAlerts"),
                  "Login alerts"
                )}
              </div>

              <div className="settings-form-footer">
                <button
                  className="settings-save-button"
                  onClick={handleSecuritySave}
                >
                  <Save size={16} />
                  Save Security Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Account & Workspace</h2>
                  <p>
                    View your workspace information and account details.
                  </p>
                </div>
              </div>

              <div className="settings-workspace-card">
                <div className="settings-workspace-logo">N</div>

                <div>
                  <strong>Nexus Studio</strong>
                  <p>Free Workspace Plan</p>
                </div>

                <span className="settings-plan-badge">
                  FREE PLAN
                </span>
              </div>

              <div className="settings-account-details">
                <div className="settings-account-row">
                  <span>Workspace Name</span>
                  <strong>Nexus Studio</strong>
                </div>

                <div className="settings-account-row">
                  <span>Account Owner</span>
                  <strong>{profile?.name}</strong>
                </div>

                <div className="settings-account-row">
                  <span>Account Email</span>
                  <strong>{profile?.email}</strong>
                </div>

                <div className="settings-account-row">
                  <span>Account Role</span>
                  <strong>Administrator</strong>
                </div>

                <div className="settings-account-row">
                  <span>Current Plan</span>
                  <strong>Free</strong>
                </div>

                <div className="settings-account-row">
                  <span>Account Status</span>
                  <span className="settings-account-status">
                    <span /> Active
                  </span>
                </div>
              </div>

              <div className="settings-danger-zone">
                <div className="settings-danger-icon">
                  <Trash2 size={19} />
                </div>

                <div>
                  <strong>Danger Zone</strong>
                  <p>
                    Account deletion is disabled in this demo. Connect a
                    backend and add confirmation before enabling this action.
                  </p>
                </div>

                <button type="button" disabled>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Settings;
