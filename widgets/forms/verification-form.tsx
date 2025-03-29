"use client";

import { useSendVerifyCode } from "@/entities/auth/hooks/queries/use-send-verify.query";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { ArrowRight, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const VerificationForm = () => {
  const { openPopup } = usePopupStore();
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useRouter();
  const i18n = useTranslations("forms.verification");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, []);

  const {
    mutate,
    isPending: isLoading,
    error,
    isSuccess,
  } = useSendVerifyCode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode) {
      alert(i18n("errors.required"));
      return;
    }

    if (verificationCode.length < 6) {
      alert(i18n("errors.length"));
      return;
    }

    mutate(
      { code: verificationCode, email: email },
      {
        onSuccess: () => {
          navigate.push("/");
          openPopup("auth-enter");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          backgroundColor: "rgba(243, 214, 117, 0.05)",
          borderRadius: "8px",
          border: "1px solid rgba(243, 214, 117, 0.2)",
          padding: "24px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            {i18n("codeLabel")} <span style={{ color: "#f3d675" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <KeyRound
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#f3d675",
              }}
            />
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder={i18n("codePlaceholder")}
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#f3d675",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ color: "#999999", fontSize: "12px", marginTop: "4px" }}>
            {i18n("codeHelp")}
          </div>
        </div>

        {/* Error */}
        {error instanceof Error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
            {error.message}
          </p>
        )}

        {/* Success message */}
        {isSuccess && (
          <p style={{ color: "green", fontSize: "14px", marginBottom: "8px" }}>
            {i18n("success")}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "12px",
            backgroundColor: isLoading ? "rgba(243, 214, 117, 0.5)" : "#f3d675",
            border: "none",
            borderRadius: "4px",
            color: "#000000",
            fontSize: "14px",
            fontWeight: "600",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {i18n("processing")}
            </>
          ) : (
            <>
              {i18n("confirmButton")}{" "}
              <ArrowRight size={16} style={{ marginLeft: "8px" }} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
