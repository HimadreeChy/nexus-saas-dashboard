
import { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const toastConfig = {
  success: {
    icon: CheckCircle2,
    title: "Success",
    className: "toast-success",
  },
  error: {
    icon: AlertCircle,
    title: "Error",
    className: "toast-error",
  },
  warning: {
    icon: AlertTriangle,
    title: "Warning",
    className: "toast-warning",
  },
  info: {
    icon: Info,
    title: "Information",
    className: "toast-info",
  },
};

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const config = toastConfig[toast.type] || toastConfig.success;
  const Icon = config.icon;

  return (
    <div className={`toast-message ${config.className}`}>
      <div className="toast-icon">
        <Icon size={21} />
      </div>

      <div className="toast-content">
        <strong>{toast.title || config.title}</strong>
        <p>{toast.message}</p>
      </div>

      <button
        className="toast-close"
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
      >
        <X size={17} />
      </button>
    </div>
  );
}

export default Toast;
