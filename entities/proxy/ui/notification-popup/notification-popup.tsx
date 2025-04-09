"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface NotificationPopupProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
  showRefreshButton?: boolean;
  countdown?: number;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
  showRefreshButton = false,
  countdown = 5,
}) => {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-close after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for fade-out animation
    }, duration);

    // Countdown timer without auto-refresh
    let countdownInterval: NodeJS.Timeout | null = null;
    if (showRefreshButton && countdown > 0) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Don't auto-refresh, just show "0" seconds
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [duration, onClose, showRefreshButton, countdown]);

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

        {showRefreshButton && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#999999" }}>
              {timeLeft > 0
                ? `Обновите страницу через ${timeLeft} сек.`
                : "Пожалуйста, обновите страницу"}
            </span>
            <button
              onClick={handleRefresh}
              style={{
                backgroundColor: "#f3d675",
                color: "#000000",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Обновить сейчас
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
