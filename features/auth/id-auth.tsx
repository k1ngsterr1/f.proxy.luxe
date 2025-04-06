"use client";

import type React from "react";
import { useState } from "react";
import { useIpAuth } from "@/entities/auth/hooks/mutations/use-ip-auth.mutation";

export default function IpAuthorizationForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [ip, setIp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: authByIp, isPending } = useIpAuth();

  const isValidIp = (value: string): boolean => {
    const ipv4Pattern =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    return ipv4Pattern.test(value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!orderNumber.trim() || !ip.trim()) {
      setError("Все поля обязательны для заполнения");
      return;
    }

    if (!isValidIp(ip)) {
      setError("Введите корректный IP-адрес, например: 192.168.0.1");
      return;
    }

    authByIp(
      {
        orderNumber: orderNumber.trim(),
        ip: ip.trim(),
      },
      {
        onSuccess: () => {
          console.log("Авторизация успешна");
        },
        onError: (err) => {
          setError(err.message || "Ошибка авторизации");
        },
      }
    );
  };

  return (
    <div
      style={{
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            padding: "24px",
            backdropFilter: "blur(8px)",
          }}
        >
          <form
            onSubmit={handleSubmit} // Используем onSubmit на форме
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#FFFFFF",
                }}
              >
                Order ID <span style={{ color: "#f3d675" }}>*</span>
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => {
                  setOrderNumber(e.target.value);
                  setError(null); // Сбрасываем ошибку при изменении
                }}
                placeholder="Order ID"
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: `1px solid ${
                    error ? "#ff4d4f" : "rgba(243, 214, 117, 0.2)"
                  }`,
                  borderRadius: "6px",
                  color: "#f3d675",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#FFFFFF",
                }}
              >
                IP адрес <span style={{ color: "#f3d675" }}>*</span>
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => {
                  setIp(e.target.value);
                  setError(null); // Сбрасываем ошибку при изменении
                }}
                placeholder="IP или login:password"
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: `1px solid ${
                    error ? "#ff4d4f" : "rgba(243, 214, 117, 0.2)"
                  }`,
                  borderRadius: "6px",
                  color: "#f3d675",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  color: "#ff4d4f",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit" // Оставляем type="submit"
              disabled={isPending}
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: "6px",
                fontWeight: "500",
                backgroundColor: isPending
                  ? "rgba(243, 214, 117, 0.5)"
                  : "#f3d675",
                color: "#000000",
                border: "none",
                cursor: isPending ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isPending ? "Авторизация..." : "АВТОРИЗАЦИЯ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
