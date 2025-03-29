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
  error,
  success,
  i18n,
}: Props) => {
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
        {/* Код подтверждения */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              color: "#FFFFFF",
              marginBottom: "8px",
              display: "block",
              fontSize: "14px",
            }}
          >
            Код подтверждения: <span style={{ color: "#f3d675" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <KeyRound size={16} style={iconStyle as any} />
            <input
              type="text"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              placeholder="Введите код из письма"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Новый пароль */}
        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>
            Новый пароль: <span style={{ color: "#f3d675" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={iconStyle as any} />
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Придумайте пароль"
              style={inputStyle}
            />
            <ToggleEyeIcon
              show={showNewPassword}
              toggle={() => setShowNewPassword(!showNewPassword)}
            />
          </div>
        </div>

        {/* Подтверждение пароля */}
        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>
            Подтверждение пароля: <span style={{ color: "#f3d675" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={iconStyle as any} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              style={inputStyle}
            />
            <ToggleEyeIcon
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "12px" }}>
            {error}
          </p>
        )}
        {success && (
          <p style={{ color: "green", fontSize: "14px", marginBottom: "12px" }}>
            {success}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isLoading ? "rgba(243, 214, 117, 0.5)" : "#f3d675",
            border: "none",
            borderRadius: "4px",
            color: "#000000",
            fontSize: "14px",
            fontWeight: "600",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? (
            <>ОБРАБОТКА...</>
          ) : (
            <>
              ИЗМЕНИТЬ ПАРОЛЬ{" "}
              <ArrowRight size={16} style={{ marginLeft: "8px" }} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const iconStyle = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#f3d675",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px 10px 36px",
  backgroundColor: "rgba(243, 214, 117, 0.1)",
  border: "1px solid rgba(243, 214, 117, 0.2)",
  borderRadius: "4px",
  color: "#f3d675",
  fontSize: "14px",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#FFFFFF",
  fontSize: "14px",
};

const ToggleEyeIcon = ({
  show,
  toggle,
}: {
  show: boolean;
  toggle: () => void;
}) => (
  <button
    type="button"
    onClick={toggle}
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
    {show ? <EyeOff size={16} /> : <Eye size={16} />}
  </button>
);
