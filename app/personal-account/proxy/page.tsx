"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function ProxyPage() {
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          ПРОКСИ
        </h1>
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#f3d675",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#000000",
            }}
          >
            Пополнение баланса
          </button>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              border: "1px solid #f3d675",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#f3d675",
            }}
          >
            Купить прокси
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Продлить", count: 0 },
          { label: "Автопродление", count: 0 },
          { label: "Изменить тип", count: 0 },
          { label: "Привязка к IP" },
          { label: "Экспорт" },
          { label: "Блокнот" },
        ].map((button, index) => (
          <button
            key={index}
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#f3d675",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "400",
            }}
          >
            {button.label}
            {typeof button.count === "number" && (
              <span
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.2)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                {button.count}
              </span>
            )}
          </button>
        ))}
        <button
          style={{
            padding: "8px",
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
          }}
        >
          <MoreVertical size={16} color="#f3d675" />
        </button>
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
