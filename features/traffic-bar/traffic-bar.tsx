"use client";

import { useState } from "react";

interface TrafficBarProps {
  totalBandwidthGB: number;
  usedBandwidthMB: number;
  reserveBandwidthGB: number;
  reserveUsedMB: number;
  rotationType: "sticky" | "rotating";
  rotationInterval: number;
  autoRenewal: boolean;
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
}) => {
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
              backgroundColor: isRotating ? "#4CAF50" : "transparent",
              padding: 0,
            }}
            onClick={() => setIsRotating(false)}
          />

          <span style={{ fontSize: "14px", color: "#f3d675" }}>Sticky</span>
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
          />

          <span style={{ fontSize: "14px", color: "#f3d675" }}>Rotating</span>
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
          >
            <option>60 minutes</option>
          </select>
          <button style={primaryButton}>Change</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#f3d675" }}>
            Auto-renewal
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
          Bandwidth statistics
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
          Total used
          <p style={{ color: "#4CAF50" }}>{usedBandwidthMB} MB</p>
        </div>
        <div>
          Remains
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
          Reserve used
          <p style={{ color: "#FFC107" }}>{reserveUsedMB} B</p>
        </div>
        <div>
          Remaining reserve
          <p style={{ color: "#4CAF50" }}>{reserveBandwidthGB} GB</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button style={primaryButton}>+ Add GB</button>

        <div style={{ display: "flex", gap: "16px" }}>
          <button style={ghostButton}>Tariff history</button>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", color: "#CCCCCC" }}>
            Bandwidth in this package
          </div>
          <div style={{ color: "#4CAF50" }}>{totalBandwidthGB} GB</div>
          <div style={{ fontSize: "14px", color: "#CCCCCC" }}>
            Active until 28.04.2025 23:59:59
          </div>
        </div>
      </div>
    </div>
  );
};
