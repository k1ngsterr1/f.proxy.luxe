"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useUpdateRotation } from "@/entities/proxy/hooks/mutation/use-update-rotation.mutation";

interface TrafficBarProps {
  totalBandwidthGB: number;
  usedBandwidthMB: number;
  rotationType: "sticky" | "rotating";
  rotationInterval: number;
  autoRenewal: boolean;
  expiryDate: string;
  package_key: string;
}

const buttonBase: React.CSSProperties = {
  borderRadius: "4px",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background-color 0.2s, color 0.2s",
};

const primaryButton: React.CSSProperties = {
  ...buttonBase,
  backgroundColor: "#f3d675",
  color: "#000000",
  border: "none",
};

const ghostButton: React.CSSProperties = {
  ...buttonBase,
  backgroundColor: "transparent",
  color: "#4CAF50",
  border: "1px solid #4CAF50",
};

// Rotation interval options in minutes
const ROTATION_INTERVALS = [5, 10, 15, 20, 60];

export const TrafficBar: React.FC<TrafficBarProps> = ({
  totalBandwidthGB,
  usedBandwidthMB,
  rotationType,
  rotationInterval,
  autoRenewal,
  expiryDate,
  package_key,
}) => {
  const i18n = useTranslations("trafficBar");
  const { mutate: updateRotation, isPending: isUpdatingRotation } =
    useUpdateRotation();

  const [isRotating, setIsRotating] = useState(rotationType === "rotating");
  const [isAutoRenewal, setIsAutoRenewal] = useState(autoRenewal);
  const [selectedInterval, setSelectedInterval] = useState<number>(() => {
    // Initialize with the closest matching interval from our options
    // If rotationInterval is -1 (sticky), default to 60 minutes
    if (rotationInterval === -1) return 60;

    const intervalInMinutes = rotationInterval / 60;
    return ROTATION_INTERVALS.reduce((prev, curr) =>
      Math.abs(curr - intervalInMinutes) < Math.abs(prev - intervalInMinutes)
        ? curr
        : prev
    );
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Update isRotating and selectedInterval when rotationType or rotationInterval changes
  useEffect(() => {
    setIsRotating(rotationType === "rotating");

    if (rotationInterval !== -1) {
      const intervalInMinutes = rotationInterval / 60;
      const closestInterval = ROTATION_INTERVALS.reduce((prev, curr) =>
        Math.abs(curr - intervalInMinutes) < Math.abs(prev - intervalInMinutes)
          ? curr
          : prev
      );
      setSelectedInterval(closestInterval);
    }
  }, [rotationType, rotationInterval]);

  const usedBandwidthPercentage =
    (usedBandwidthMB / (totalBandwidthGB * 1024)) * 100;

  // Calculate remaining bandwidth with 1 decimal place precision
  const usedBandwidthGB = usedBandwidthMB / 1024;
  const remainingBandwidthGB = totalBandwidthGB - usedBandwidthGB;

  // Format the remaining bandwidth to 1 decimal place
  const formattedRemainingGB = remainingBandwidthGB.toFixed(1);

  // Handle rotation type change
  const handleRotationTypeChange = (rotating: boolean) => {
    setIsRotating(rotating);

    // When switching to sticky, set rotation to -1
    // When switching to rotating, use the selected interval
    const newRotation = rotating ? selectedInterval * 60 : -1;

    updateRotation({
      package_key,
      rotation: newRotation,
    });
  };

  // Handle interval change
  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minutes = Number.parseInt(e.target.value, 10);
    setSelectedInterval(minutes);
  };

  // Apply rotation change
  const handleApplyRotation = () => {
    // Only send update if rotating
    if (isRotating) {
      updateRotation({
        package_key,
        rotation: selectedInterval * 60, // Convert minutes to seconds
      });
    }
  };

  // Get the translation key for a specific minute value
  const getIntervalTranslation = (minutes: number) => {
    switch (minutes) {
      case 5:
        return i18n("rotationIntervals.fiveMinutes");
      case 10:
        return i18n("rotationIntervals.tenMinutes");
      case 15:
        return i18n("rotationIntervals.fifteenMinutes");
      case 20:
        return i18n("rotationIntervals.twentyMinutes");
      case 60:
        return i18n("rotationIntervals.sixtyMinutes");
      default:
        return `${minutes} ${i18n("rotationIntervals.minutes")}`;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        borderRadius: "8px",
        border: "1px solid rgba(243, 214, 117, 0.2)",
        padding: isMobile ? "16px" : "24px",
        color: "#FFFFFF",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header - Restructured for mobile */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "16px" : "8px",
          marginBottom: "16px",
        }}
      >
        {/* Rotation Type Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            style={{
              ...buttonBase,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: isRotating ? "#999999" : "#4CAF50",
              backgroundColor: isRotating ? "transparent" : "#4CAF50",
              padding: 0,
            }}
            onClick={() => handleRotationTypeChange(false)}
            aria-label={i18n("rotationTypes.sticky")}
          />

          <span style={{ fontSize: "14px", color: "#f3d675" }}>
            {i18n("rotationTypes.sticky")}
          </span>
          <button
            style={{
              ...buttonBase,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: isRotating ? "#4CAF50" : "#999999",
              backgroundColor: isRotating ? "#4CAF50" : "transparent",
              padding: 0,
            }}
            onClick={() => handleRotationTypeChange(true)}
            aria-label={i18n("rotationTypes.rotating")}
          />

          <span style={{ fontSize: "14px", color: "#f3d675" }}>
            {i18n("rotationTypes.rotating")}
          </span>
        </div>

        {/* Interval Selection */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-start",
          }}
        >
          <select
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              padding: "8px 12px",
              fontSize: "14px",
              color: "#f3d675",
              opacity: isRotating ? 1 : 0.5,
              pointerEvents: isRotating ? "auto" : "none",
              appearance: "auto", // Ensure native dropdown styling
              width: isMobile ? "60%" : "auto",
              height: isMobile ? "40px" : "auto",
            }}
            value={selectedInterval}
            onChange={handleIntervalChange}
            disabled={!isRotating}
            aria-label={i18n("rotationInterval")}
          >
            {ROTATION_INTERVALS.map((minutes) => (
              <option
                key={minutes}
                value={minutes}
                style={{
                  backgroundColor: "#1a1a1a", // Dark background for dropdown options
                  color: "#f3d675", // Gold text color
                  padding: "8px",
                }}
              >
                {getIntervalTranslation(minutes)}
              </option>
            ))}
          </select>
          <button
            style={{
              ...primaryButton,
              opacity: isRotating ? 1 : 0.5,
              cursor: isRotating ? "pointer" : "not-allowed",
              width: isMobile ? "38%" : "auto",
              height: isMobile ? "40px" : "auto",
            }}
            onClick={handleApplyRotation}
            disabled={!isRotating || isUpdatingRotation}
          >
            {isUpdatingRotation ? i18n("updateButton") : i18n("changeButton")}
          </button>
        </div>

        {/* Auto Renewal Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-start",
          }}
        >
          <span style={{ fontSize: "14px", color: "#f3d675" }}>
            {i18n("autoRenewal")}
          </span>
          <button
            onClick={() => setIsAutoRenewal(!isAutoRenewal)}
            style={{
              width: "40px",
              height: "20px",
              backgroundColor: isAutoRenewal ? "#4CAF50" : "#999999",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: 0,
            }}
            aria-checked={isAutoRenewal}
            aria-label={i18n("autoRenewal")}
            role="switch"
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                position: "absolute",
                top: "2px",
                left: isAutoRenewal ? "20px" : "2px",
                transition: "left 0.2s",
              }}
            />
          </button>
        </div>
      </div>

      {/* Bandwidth Statistics */}
      <div style={{ marginBottom: "16px" }}>
        <h4
          style={{
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#f3d675",
          }}
        >
          {i18n("bandwidthStatistics")}
        </h4>
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            height: "8px",
            borderRadius: "9999px",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3d675",
              height: "8px",
              borderRadius: "9999px",
              position: "absolute",
              left: 0,
              top: 0,
              width: `${usedBandwidthPercentage}%`,
            }}
            aria-label={`${Math.round(usedBandwidthPercentage)}% ${i18n(
              "used"
            )}`}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: isMobile ? "10px" : "12px",
            color: "#999999",
            marginTop: "4px",
          }}
        >
          <span>0</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Usage Details - Restructured for mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr",
          gap: isMobile ? "12px" : "8px",
          fontSize: isMobile ? "13px" : "14px",
          color: "#CCCCCC",
          marginBottom: "16px",
        }}
      >
        <div>
          {i18n("totalUsed")}
          <p style={{ color: "#4CAF50", margin: "4px 0 0 0" }}>
            {usedBandwidthMB} MB
          </p>
        </div>
        <div>
          {i18n("remains")}
          <p style={{ color: "#4CAF50", margin: "4px 0 0 0" }}>
            {formattedRemainingGB} GB
          </p>
        </div>
      </div>

      {/* Package Info and Expiry Date - Restructured for mobile */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "16px" : "8px",
        }}
      >
        <div>
          <div
            style={{ fontSize: isMobile ? "13px" : "14px", color: "#CCCCCC" }}
          >
            {i18n("bandwidthInPackage")}
          </div>
          <div
            style={{
              color: "#4CAF50",
              fontWeight: "600",
              fontSize: isMobile ? "15px" : "16px",
              marginTop: "4px",
            }}
          >
            {totalBandwidthGB} GB
          </div>
        </div>
        <div
          style={{
            textAlign: isMobile ? "left" : "right",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <div
            style={{ fontSize: isMobile ? "13px" : "14px", color: "#CCCCCC" }}
          >
            {i18n("activeUntil", { date: "" })}
          </div>
          <div
            style={{
              color: "#f3d675",
              fontWeight: "600",
              fontSize: isMobile ? "15px" : "16px",
              background: "rgba(243, 214, 117, 0.1)",
              padding: "4px 12px",
              borderRadius: "4px",
              display: "inline-block",
              marginTop: "4px",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {expiryDate}
          </div>
        </div>
      </div>
    </div>
  );
};
