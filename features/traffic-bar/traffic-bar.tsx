"use client";

import type React from "react";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface TrafficBarProps {
  totalBandwidthGB: number;
  usedBandwidthMB: number;
  reserveBandwidthGB: number;
  reserveUsedMB: number;
  rotationType: "sticky" | "rotating";
  rotationInterval: number;
  autoRenewal: boolean;
  expiryDate: string;
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

export const TrafficBar: React.FC<TrafficBarProps> = ({
  totalBandwidthGB,
  usedBandwidthMB,
  reserveBandwidthGB,
  reserveUsedMB,
  rotationType,
  rotationInterval,
  autoRenewal,
  expiryDate,
}) => {
  const i18n = useTranslations("trafficBar");

  const [isRotating, setIsRotating] = useState(rotationType === "rotating");
  const [isAutoRenewal, setIsAutoRenewal] = useState(autoRenewal);

  const usedBandwidthPercentage =
    (usedBandwidthMB / (totalBandwidthGB * 1024)) * 100;
  const remainingBandwidthGB = totalBandwidthGB - usedBandwidthMB / 1024;

  return (
    <div
      style={{
        backgroundColor: "#000000",
        borderRadius: "8px",
        border: "1px solid rgba(243, 214, 117, 0.2)",
        padding: "24px",
        color: "#FFFFFF",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            onClick={() => setIsRotating(false)}
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
            onClick={() => setIsRotating(true)}
            aria-label={i18n("rotationTypes.rotating")}
          />

          <span style={{ fontSize: "14px", color: "#f3d675" }}>
            {i18n("rotationTypes.rotating")}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <select
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "14px",
              color: "#f3d675",
            }}
            aria-label={i18n("rotationInterval")}
          >
            <option>{i18n("rotationIntervals.sixtyMinutes")}</option>
          </select>
          <button style={primaryButton}>{i18n("changeButton")}</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            fontSize: "16px",
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
            fontSize: "12px",
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

      {/* Usage Details */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          color: "#CCCCCC",
          marginBottom: "8px",
        }}
      >
        <div>
          {i18n("totalUsed")}
          <p style={{ color: "#4CAF50" }}>{usedBandwidthMB} MB</p>
        </div>
        <div>
          {i18n("remains")}
          <p style={{ color: "#4CAF50" }}>
            {remainingBandwidthGB.toFixed(1)} GB
          </p>
        </div>
      </div>

      {/* Reserve Details */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          color: "#CCCCCC",
          marginBottom: "16px",
        }}
      >
        <div>
          {i18n("reserveUsed")}
          <p style={{ color: "#FFC107" }}>{reserveUsedMB} B</p>
        </div>
        <div>
          {i18n("remainingReserve")}
          <p style={{ color: "#4CAF50" }}>{reserveBandwidthGB} GB</p>
        </div>
      </div>

      {/* Package Info and Expiry Date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "14px", color: "#CCCCCC" }}>
            {i18n("bandwidthInPackage")}
          </div>
          <div
            style={{ color: "#4CAF50", fontWeight: "600", fontSize: "16px" }}
          >
            {totalBandwidthGB} GB
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", color: "#CCCCCC" }}>
            {i18n("activeUntil", { date: "" })}
          </div>
          <div
            style={{
              color: "#f3d675",
              fontWeight: "600",
              fontSize: "16px",
              background: "rgba(243, 214, 117, 0.1)",
              padding: "4px 12px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            {expiryDate}
          </div>
        </div>
      </div>
    </div>
  );
};
