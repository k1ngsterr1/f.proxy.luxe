"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

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
        handleClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, onClose, showDeleteConfirmation]);

  const handleClose = () => {
    setIsVisible(false);
    // Immediate close without animation delay for better UX
    setTimeout(onClose, 100);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleConfirmDelete = () => {
    if (onDeleteConfirm) {
      onDeleteConfirm();
    }
    handleClose();
  };

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

  // Create overlay backdrop
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
    opacity: isVisible ? 1 : 0,
  };

  // Create popup style
  const popupStyle: React.CSSProperties = {
    backgroundColor: "#0a0a0a",
    border: "1px solid rgba(243, 214, 117, 0.3)",
    borderRadius: "16px",
    padding: "32px 28px",
    width: "90%",
    maxWidth: "450px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(243, 214, 117, 0.1)",
    animation: "fadeIn 0.3s ease-out",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)",
    transition: "all 0.3s ease",
  };

  // Button styles
  const buttonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "rgba(255, 59, 48, 0.15)",
    color: "#FF4444",
    border: "1px solid rgba(255, 59, 48, 0.3)",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    color: "#f3d675",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
  };

  const popupAnimationStyles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateY(-30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  return (
    <>
      <style>{popupAnimationStyles}</style>
      <div style={overlayStyle}>
        <div style={popupStyle}>
        <button
          style={closeButtonStyle}
          onClick={handleClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(243, 214, 117, 0.2)";
            e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(243, 214, 117, 0.1)";
            e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.2)";
          }}
        >
          <X size={16} />
        </button>
        
        {/* Message container with better styling */}
        <div
          style={{
            fontSize: "16px",
            color: getTextColor(),
            textAlign: "center",
            lineHeight: "1.5",
            paddingTop: "8px",
            fontWeight: "500",
            letterSpacing: "0.01em",
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
              marginTop: "16px",
              gap: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.15)",
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                ...buttonStyle,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#cccccc",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              {t("cancel") || "Cancel"}
            </button>
            <button 
              onClick={handleConfirmDelete} 
              style={deleteButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 59, 48, 0.25)";
                e.currentTarget.style.borderColor = "rgba(255, 59, 48, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 59, 48, 0.15)";
                e.currentTarget.style.borderColor = "rgba(255, 59, 48, 0.3)";
              }}
            >
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
                marginTop: "16px",
                gap: "16px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(243, 214, 117, 0.15)",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  ...buttonStyle,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#cccccc",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                {t("cancel") || "Cancel"}
              </button>
              <button
                onClick={handleRefresh}
                style={{
                  ...buttonStyle,
                  backgroundColor: "rgba(243, 214, 117, 0.15)",
                  color: "#f3d675",
                  border: "1px solid rgba(243, 214, 117, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(243, 214, 117, 0.25)";
                  e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(243, 214, 117, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(243, 214, 117, 0.3)";
                }}
              >
                {t("refreshNow")}
              </button>
            </div>
          )
        )}
      </div>
    </div>
    </>
  );
};

export default NotificationPopup;
