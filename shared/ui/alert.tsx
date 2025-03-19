import type React from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertMessageProps {
  type: AlertType;
  message: React.ReactNode;
  show?: boolean;
  className?: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  show = true,
  className = "",
}) => {
  if (!show) return null;

  const styles = {
    success: {
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      border: "1px solid rgba(76, 175, 80, 0.3)",
      color: "#4CAF50",
    },
    error: {
      backgroundColor: "rgba(255, 82, 82, 0.1)",
      border: "1px solid rgba(255, 82, 82, 0.3)",
      color: "#FF5252",
    },
    warning: {
      backgroundColor: "rgba(255, 193, 7, 0.1)",
      border: "1px solid rgba(255, 193, 7, 0.3)",
      color: "#FFC107",
    },
    info: {
      backgroundColor: "rgba(33, 150, 243, 0.1)",
      border: "1px solid rgba(33, 150, 243, 0.3)",
      color: "#2196F3",
    },
  };

  return (
    <div
      style={{
        ...styles[type],
        borderRadius: "4px",
        padding: "16px",
        marginBottom: "24px",
        fontSize: "14px",
      }}
      className={className}
      role={type === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
};
