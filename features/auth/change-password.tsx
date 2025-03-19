import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Lock, KeyRound, ArrowRight } from "lucide-react";

export const ChangePasswordAuthForm = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!verificationCode) {
      setError("Пожалуйста, введите код подтверждения");
      return;
    }

    if (!newPassword) {
      setError("Пожалуйста, введите новый пароль");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (newPassword.length < 8) {
      setError("Пароль должен содержать не менее 8 символов");
      return;
    }

    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // If successful
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setVerificationCode("");
    } catch (err) {
      setError(
        "Произошла ошибка при изменении пароля. Пожалуйста, попробуйте снова."
      );
    } finally {
      setIsLoading(false);
    }
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
            Код подтверждения: <span style={{ color: "#f3d675" }}>*</span>
          </label>
          <div
            style={{
              position: "relative",
            }}
          >
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
              placeholder="Введите код из письма"
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
            Код подтверждения был отправлен на ваш email
          </div>
        </div>

        {/* New Password Field */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            Новый пароль: <span style={{ color: "#f3d675" }}>*</span>
          </label>
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
              placeholder="Введите новый пароль"
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
          <div style={{ color: "#999999", fontSize: "12px", marginTop: "4px" }}>
            Минимум 8 символов, включая буквы и цифры
          </div>
        </div>

        {/* Confirm Password Field */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            Подтверждение пароля: <span style={{ color: "#f3d675" }}>*</span>
          </label>
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
              placeholder="Повторите новый пароль"
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

        {/* Submit Button */}
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
              ОБРАБОТКА...
            </>
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
