"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface NotificationPopupProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
  showRefreshButton?: boolean;
  countdown?: number;
  showDeleteConfirmation?: boolean;
  onDeleteConfirm?: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
  showRefreshButton = false,
  countdown = 5,
  showDeleteConfirmation = false,
  onDeleteConfirm,
}) => {
  const t = useTranslations("proxyList.notification");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-close after duration (only if not a delete confirmation)
    if (!showDeleteConfirmation) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow time for fade-out animation
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, onClose, showDeleteConfirmation]);

  // Get text color based on type
  const getTextColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#FF3B30";
      case "info":
      default:
        return "#f3d675";
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow time for fade-out animation
  };

  const handleConfirmDelete = () => {
    if (onDeleteConfirm) {
      onDeleteConfirm();
    }
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Create overlay backdrop
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(3px)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "opacity 0.3s",
    opacity: isVisible ? 1 : 0,
  };

  // Create popup style
  const popupStyle: React.CSSProperties = {
    backgroundColor: "#111111",
    border: "1px solid rgba(243, 214, 117, 0.25)",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    animation: "fadeIn 0.25s ease-out",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  // Button styles
  const buttonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    color: "#FF3B30",
    border: "1px solid rgba(255, 59, 48, 0.3)",
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div
          style={{
            fontSize: "16px",
            color: getTextColor(),
            textAlign: "center",
          }}
        >
          {message}
        </div>

        {showDeleteConfirmation ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "8px",
              gap: "12px",
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                ...buttonStyle,
                backgroundColor: "transparent",
                color: "#999999",
                border: "1px solid #333333",
              }}
            >
              {t("cancel") || "Cancel"}
            </button>
            <button onClick={handleConfirmDelete} style={deleteButtonStyle}>
              {t("delete-confirm") || "Delete"}
            </button>
          </div>
        ) : (
          showRefreshButton && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "8px",
                gap: "12px",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  ...buttonStyle,
                  backgroundColor: "transparent",
                  color: "#999999",
                  border: "1px solid #333333",
                }}
              >
                {t("cancel") || "Cancel"}
              </button>
              <button
                onClick={handleRefresh}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#f3d675",
                  color: "#000000",
                }}
              >
                {t("refreshNow")}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
