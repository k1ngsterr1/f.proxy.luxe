"use client";
import type React from "react";
import { Eye, EyeOff, Lock, KeyRound, ArrowRight } from "lucide-react";

interface Props {
  emailCode: string;
  setEmailCode: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showNewPassword: boolean;
  setShowNewPassword: (val: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (val: boolean) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  success?: string | null;
  i18n: ReturnType<typeof import("next-intl").useTranslations>;
  codeError?: string | null;
  passwordError?: string | null;
  confirmPasswordError?: string | null;
}

export const ChangePasswordForm = ({
  emailCode,
  setEmailCode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
  handleSubmit,
  i18n,
  codeError,
  passwordError,
  confirmPasswordError,
}: Props) => {
  const formStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  };

  const getInputStyle = (hasError: boolean) => ({
    ...inputStyle,
    border: hasError ? "1px solid #ff4d4f" : inputStyle.border,
  });

  const fieldGroupStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#FFFFFF",
  };

  const inputContainerStyle = {
    position: "relative" as const,
  };

  const iconStyle = {
    position: "absolute" as const,
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    height: "16px",
    width: "16px",
    color: "#f3d675",
  };

  const inputStyle = {
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "rgba(243, 214, 117, 0.1)",
    border: "1px solid rgba(243, 214, 117, 0.2)",
    borderRadius: "6px",
    color: "#f3d675",
    fontSize: "14px",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  const eyeButtonStyle = {
    position: "absolute" as const,
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "#f3d675",
    transition: "color 0.2s ease",
  };

  const helperTextStyle = {
    fontSize: "12px",
    color: "#9CA3AF",
    marginTop: "4px",
  };

  const buttonStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 0",
    borderRadius: "6px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    backgroundColor: isLoading ? "rgba(243, 214, 117, 0.5)" : "#f3d675",
    color: "#000000",
    border: "none",
    cursor: isLoading ? "not-allowed" : "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle} autoComplete="off">

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          {i18n("verificationCode")} <span style={{ color: "#f3d675" }}>*</span>
        </label>
        <div style={inputContainerStyle}>
          <KeyRound style={iconStyle} />
          <input
            type="text"
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            placeholder={i18n("codePlaceholder")}
            style={getInputStyle(!!codeError)}
          />
        </div>
        {codeError && (
          <p style={{ ...helperTextStyle, color: "#ff4d4f" }}>{codeError}</p>
        )}
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          {i18n("newPassword")} <span style={{ color: "#f3d675" }}>*</span>
        </label>
        <div style={inputContainerStyle}>
          <Lock style={iconStyle} />
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={i18n("newPasswordPlaceholder")}
            style={getInputStyle(!!passwordError)}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={eyeButtonStyle}
          >
            {showNewPassword ? (
              <EyeOff style={{ height: "16px", width: "16px" }} />
            ) : (
              <Eye style={{ height: "16px", width: "16px" }} />
            )}
          </button>
        </div>
        <p style={{ ...helperTextStyle, color: passwordError ? "#ff4d4f" : "#9CA3AF" }}>
          {passwordError || i18n("errors.password-length")}
        </p>
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          {i18n("confirmPassword")} <span style={{ color: "#f3d675" }}>*</span>
        </label>
        <div style={inputContainerStyle}>
          <Lock style={iconStyle} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={i18n("confirmPasswordPlaceholder")}
            style={getInputStyle(!!confirmPasswordError)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={eyeButtonStyle}
          >
            {showConfirmPassword ? (
              <EyeOff style={{ height: "16px", width: "16px" }} />
            ) : (
              <Eye style={{ height: "16px", width: "16px" }} />
            )}
          </button>
        </div>
        {confirmPasswordError && (
          <p style={{ ...helperTextStyle, color: "#ff4d4f" }}>{confirmPasswordError}</p>
        )}
      </div>

      <button type="submit" disabled={isLoading} style={buttonStyle}>
        {isLoading ? (
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
            <span>{i18n("processing") || "PROCESSING..."}</span>
          </>
        ) : (
          <>
            <span>{i18n("changePasswordButton") || "CHANGE PASSWORD"}</span>
            <ArrowRight style={{ height: "16px", width: "16px" }} />
          </>
        )}
      </button>
    </form>
  );
};
