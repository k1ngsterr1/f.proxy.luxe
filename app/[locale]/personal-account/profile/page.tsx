"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, KeyRound, ArrowRight } from "lucide-react";
import { AlertMessage } from "@/shared/ui/alert";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useSendResetEmail } from "@/entities/auth/hooks/mutations/use-reset-email.mutations";
import { useChangePassword } from "@/entities/auth/hooks/mutations/use-change-password.mutation";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const { data } = useGetUser();
  const [emailCode, setEmailCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const t = useTranslations("personal-profile");

  const {
    mutate: sendResetEmail,
    isPending: isSendingResetEmail,
    isSuccess: sendResetEmailMutationIsSuccess,
    isError: sendResetEmailMutationIsError,
    error: sendResetEmailMutationError,
  } = useSendResetEmail();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate passwords match if both are provided
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError(t("errors.passwords-not-match"));
        return;
      }

      if (newPassword.length < 8) {
        setError(t("errors.password-length"));
        return;
      }
    }

    // Validate email code if changing email or password
    if ((newPassword || confirmPassword) && !emailCode) {
      setError(t("errors.code-required"));
      return;
    }

    if (newPassword && emailCode) {
      changePassword(
        {
          code: emailCode,
          newPassword: newPassword as any,
          //@ts-ignore
          confirmPassword: confirmPassword as any,
          email: data?.email as any,
        },
        {
          onSuccess: () => {
            // Success message
            setSuccess(t("success.password-changed"));

            // Reset form fields
            setNewPassword("");
            setConfirmPassword("");
            setEmailCode("");
          },
          onError: (err) => {
            if (err instanceof Error) {
              // Check if the error contains validation messages
              if (err.message && err.message.includes("[")) {
                try {
                  // Try to parse the error message as JSON
                  const validationErrors = JSON.parse(err.message);
                  if (Array.isArray(validationErrors)) {
                    // Join all validation errors into a single message
                    setError(validationErrors.join(", "));
                  } else {
                    setError(err.message);
                  }
                } catch {
                  // If parsing fails, just use the error message
                  setError(err.message);
                }
              } else {
                setError(
                  err.message || t("errors.generic-error")
                );
              }
            } else {
              setError(t("errors.generic-error"));
            }
            console.error(err);
          },
        }
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        maxWidth: "920px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      {data?.isVerified === false && (
        <AlertMessage
          type="warning"
          isEmail
          message={t("verification-warning")}
        />
      )}
      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}
      {sendResetEmailMutationIsSuccess && (
        <AlertMessage
          type="success"
          message={t("success.reset-code-sent")}
        />
      )}
      {sendResetEmailMutationIsError && (
        <AlertMessage
          type="error"
          message={
            sendResetEmailMutationError instanceof Error
              ? sendResetEmailMutationError.message
              : t("errors.generic-error")
          }
        />
      )}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: isMobile ? "24px" : "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          {t("title")}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            {t("email")} <span style={{ color: "#f3d675" }}>{t("email-required")}</span>
          </label>
          <div
            style={{
              position: "relative",
              marginBottom: "4px",
            }}
          >
            <Mail
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
              type="email"
              value={data?.email}
              readOnly
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#f3d675",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ color: "#f3d675", fontSize: "12px" }}>
            {t("email-change-hint")}
          </div>
          <div style={{ marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => {
                if (data?.email) {
                  sendResetEmail(
                    { email: data.email },
                    {
                      onError: (err) => {
                        console.error("Error sending reset email:", err);
                      },
                    }
                  );
                }
              }}
              disabled={isSendingResetEmail}
              style={{
                backgroundColor: isSendingResetEmail
                  ? "rgba(243, 214, 117, 0.5)"
                  : "rgba(243, 214, 117, 0.2)",
                border: "1px solid rgba(243, 214, 117, 0.3)",
                color: "#f3d675",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: isSendingResetEmail ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {isSendingResetEmail ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ width: "12px", height: "12px", color: "#f3d675" }}
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
                  Отправка...
                </>
              ) : (
                t("button-request-code")
              )}
            </button>
          </div>
        </div>

        {/* Email Code Field */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            {t("code")}{t("code-required")}
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
              type={showEmailCode ? "text" : "password"}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              placeholder={t("code-placeholder")}
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#f3d675",
                fontSize: "14px",
              }}
            />
            <button
              type="button"
              onClick={() => setShowEmailCode(!showEmailCode)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#f3d675",
              }}
            >
              {showEmailCode ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div style={{ color: "#999999", fontSize: "12px", marginTop: "4px" }}>
            {t("success.reset-code-sent")}
          </div>
        </div>

        {/* Change Password Section */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            {t("new-password")}
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px",
            }}
          >
            {/* New Password */}
            <div style={{ position: "relative" }}>
              <Lock
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
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("new-password-placeholder")}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#f3d675",
                }}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div style={{ position: "relative" }}>
              <Lock
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
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("confirm-password-placeholder")}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "4px",
                  color: "#f3d675",
                  fontSize: "14px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#f3d675",
                }}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div style={{ color: "#999999", fontSize: "12px", marginTop: "8px" }}>
            {t("errors.password-length")}
          </div>
        </div>
        <button
          type="submit"
          disabled={isChangingPassword}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 24px",
            backgroundColor: isChangingPassword
              ? "rgba(243, 214, 117, 0.5)"
              : "#f3d675",
            border: "none",
            borderRadius: "4px",
            color: "#000000",
            fontSize: "14px",
            cursor: isChangingPassword ? "not-allowed" : "pointer",
            fontWeight: "500",
            gap: "8px",
          }}
        >
          {isChangingPassword ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ width: "16px", height: "16px" }}
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
              {t("submit-button")}...
            </>
          ) : (
            <>
              {t("submit-button")}
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
