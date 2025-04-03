"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import { useTranslations } from "next-intl";
import { useSendResetEmail } from "@/entities/auth/hooks/mutations/use-reset-email.mutations";
import { useChangePassword } from "@/entities/auth/hooks/mutations/use-change-password.mutation";
import { AlertMessage } from "@/shared/ui/alert";
import { ChangePasswordForm } from "@/features/auth/change-password";
import { Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const isMobile = useIsMobile();
  const t = useTranslations("forgot-password-page");
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const { mutate: sendResetEmailMutation, isPending: isSendingEmail } =
    useSendResetEmail();

  useEffect(() => {
    // This will be replaced with actual implementation
    // sendResetEmail()
  }, []);

  const handleSendEmail = () => {
    if (!email) {
      setError(t("errors.email-required"));
      return;
    }

    sendResetEmailMutation(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true);
          setSuccess(t("success.reset-code-sent"));
          setError(null);
        },
        onError: (err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(t("errors.generic-error"));
          }
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !emailCode || !newPassword || !confirmPassword) {
      setError(t("errors.required-fields"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("errors.passwords-not-match"));
      return;
    }

    if (newPassword.length < 8) {
      setError(t("errors.password-length"));
      return;
    }

    changePassword(
      {
        code: emailCode,
        newPassword,
        //@ts-ignore
        confirmPassword,
        email,
      },
      {
        onSuccess: () => {
          setSuccess(t("success.password-changed"));
          setEmail("");
          setEmailCode("");
          setNewPassword("");
          setConfirmPassword("");
          navigate.push("/");
        },
        onError: (err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(t("errors.generic-error"));
          }
        },
      }
    );
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        marginTop: 256,
        backgroundColor: "#000000",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
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
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "24px" : "30px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #f3d675, #d4a017)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {t("changePassword")}
          </h1>
          <div
            style={{
              marginTop: "8px",
              height: "4px",
              width: "80px",
              background: "linear-gradient(to right, #f3d675, #d4a017)",
              margin: "8px auto 0",
              borderRadius: "9999px",
            }}
          ></div>
        </div>

        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}

        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            borderRadius: "8px",
            padding: "24px",
            backdropFilter: "blur(8px)",
          }}
        >
          {!isEmailSent ? (
            <div
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
                  {t("email")} <span style={{ color: "#f3d675" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Mail
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "16px",
                      width: "16px",
                      color: "#f3d675",
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder") || "Enter your email"}
                    style={{
                      width: "100%",
                      paddingLeft: "40px",
                      paddingRight: "16px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      border: "1px solid rgba(243, 214, 117, 0.2)",
                      borderRadius: "6px",
                      color: "#f3d675",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 0",
                  borderRadius: "6px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  backgroundColor: isSendingEmail
                    ? "rgba(243, 214, 117, 0.5)"
                    : "#f3d675",
                  color: "#000000",
                  border: "none",
                  cursor: isSendingEmail ? "not-allowed" : "pointer",
                }}
              >
                {isSendingEmail ? (
                  <>
                    <svg
                      style={{
                        animation: "spin 1s linear infinite",
                        height: "16px",
                        width: "16px",
                        color: "#000000",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{t("sending") || "SENDING..."}</span>
                  </>
                ) : (
                  <>
                    <span>{t("sendCode") || "SEND VERIFICATION CODE"}</span>
                    <ArrowRight style={{ height: "16px", width: "16px" }} />
                  </>
                )}
              </button>
            </div>
          ) : (
            <ChangePasswordForm
              emailCode={emailCode}
              setEmailCode={setEmailCode}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              isLoading={isChangingPassword}
              handleSubmit={handleSubmit}
              error={error}
              success={success}
              i18n={t}
            />
          )}
        </div>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "14px",
            color: "#9CA3AF",
          }}
        >
          {t("changePasswordEmail")}{" "}
          <a
            href="mailto:admin@proxy.luxe"
            style={{
              color: "#f3d675",
              textDecoration: "none",
              borderBottom: "1px dotted rgba(243, 214, 117, 0.5)",
              transition: "color 0.2s ease",
            }}
          >
            admin@proxy.luxe
          </a>
        </div>
      </div>
    </div>
  );
}
