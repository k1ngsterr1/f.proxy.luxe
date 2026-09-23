"use client";

import type React from "react";
import { useState } from "react";
import { useIpAuth } from "@/entities/auth/hooks/mutations/use-ip-auth.mutation";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { useTranslations } from "next-intl";
import { IpAuthorizationList } from "./ip-authorization-list";

export default function IpAuthorizationForm() {
  const t = useTranslations("proxyList.ipAuth");
  const [ip, setIp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // The backend resolves the provider order number from this internal order ID.
  const getParams = usePopupStore((state) => state.getParams);
  const params = getParams("ip-auth-enter");
  const orderId = typeof params?.orderId === "string" ? params.orderId : "";
  const providerProxyId =
    typeof params?.providerProxyId === "string"
      ? params.providerProxyId
      : undefined;
  const { mutate: authByIp, isPending } = useIpAuth(
    orderId,
    providerProxyId,
  );

  const isValidIp = (value: string): boolean => {
    const normalizedValue = value.trim();
    const ipv4Pattern =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    if (ipv4Pattern.test(normalizedValue)) {
      return true;
    }

    if (
      !normalizedValue.includes(":") ||
      !/^[0-9a-f:.]+$/i.test(normalizedValue)
    ) {
      return false;
    }

    try {
      new URL(`http://[${normalizedValue}]`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!orderId || !ip.trim()) {
      setError(t("requiredFields"));
      return;
    }

    if (!isValidIp(ip)) {
      setError(t("invalidIp"));
      return;
    }

    authByIp(
      {
        ip: ip.trim(),
      },
      {
        onSuccess: () => {
          setSuccess(t("authSuccess"));
          setIp("");
        },
        onError: (err) => {
          setError(err.message || t("authError"));
        },
      },
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
            onSubmit={handleSubmit}
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
                {t("ipAddressLabel")}{" "}
                <span style={{ color: "#f3d675" }}>*</span>
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => {
                  setIp(e.target.value);
                  setError(null); // Сбрасываем ошибку при изменении
                }}
                placeholder={t("ipAddressPlaceholder")}
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
                autoFocus
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
            {success && (
              <div
                style={{
                  color: "#4BB543", // зелёный цвет
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {success}
              </div>
            )}

            <button
              type="submit"
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
              {isPending ? t("authInProgress") : t("authButton")}
            </button>
          </form>
        </div>
        {orderId && (
          <IpAuthorizationList
            orderId={orderId}
            providerProxyId={providerProxyId}
          />
        )}
      </div>
    </div>
  );
}
