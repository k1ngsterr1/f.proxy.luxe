"use client";

import { useState } from "react";

export default function PaymentsPage() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      {/* Alert Banner */}
      {showAlert && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: "16px",
            textAlign: "center",
            marginBottom: "32px",
            borderRadius: "4px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
          }}
        >
          <div
            style={{
              color: "#f3d675",
              fontSize: "14px",
            }}
          >
            Вам необходимо{" "}
            <span style={{ fontWeight: "500" }}>подтвердить свой email</span>{" "}
            перейдя по ссылке, указанной в письме.{" "}
            <button
              onClick={() => setShowAlert(false)}
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px dotted #f3d675",
                color: "#f3d675",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
            >
              Отправить еще раз
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ПЛАТЕЖИ
        </h1>
      </div>

      {/* Empty State */}
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.1)",
          padding: "24px",
          textAlign: "center",
          borderRadius: "4px",
          color: "#f3d675",
          fontSize: "14px",
          border: "1px solid rgba(243, 214, 117, 0.2)",
        }}
      >
        Ничего не найдено...
      </div>
    </div>
  );
}
