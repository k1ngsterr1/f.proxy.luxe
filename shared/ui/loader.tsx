"use client";
import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
}

export const Loader = ({
  size = "medium",
  text = "Загрузка...",
  fullScreen = false,
}: LoaderProps) => {
  const sizeMap = {
    small: { outer: 30, inner: 15 },
    medium: { outer: 50, inner: 25 },
    large: { outer: 70, inner: 35 },
  };

  const dimensions = sizeMap[size];

  // Calculate inner ring position
  const innerPosition = (dimensions.outer - dimensions.inner) / 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...(fullScreen
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 100)",
              zIndex: 9999,
            }
          : {
              padding: "20px",
            }),
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${dimensions.outer}px`,
          height: `${dimensions.outer}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px solid #1E1E1E",
            borderTopColor: "#F2D675",
            animation: "spin 1.5s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: `${innerPosition}px`,
            left: `${innerPosition}px`,
            width: `${dimensions.inner}px`,
            height: `${dimensions.inner}px`,
            borderRadius: "50%",
            border: "2px solid #1E1E1E",
            borderBottomColor: "#F2D675",
            animation: "spinReverse 1s linear infinite",
          }}
        />
      </div>
      {text && (
        <div
          style={{
            marginTop: "15px",
            color: "#F2D675",
            fontFamily: "Arial, sans-serif",
            fontSize:
              size === "small" ? "12px" : size === "medium" ? "14px" : "16px",
            fontWeight: 500,
          }}
        >
          {text}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spinReverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};
