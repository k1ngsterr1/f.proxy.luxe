"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function ProfilePage() {
  const [showAlert, setShowAlert] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ПРОФИЛЬ
        </h1>
      </div>

      {/* Form */}
      <form>
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
            E-mail: <span style={{ color: "#f3d675" }}>*</span>
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
              value="ruslanmakhmatov@gmail.com"
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
            Для изменения e-mail укажите "Текущий пароль"
          </div>
        </div>

        {/* Notification Preferences */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              defaultChecked
              style={{
                marginRight: "8px",
                accentColor: "#f3d675",
              }}
            />
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
              Получать письма о необходимости продления прокси.
            </span>
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              defaultChecked
              style={{
                marginRight: "8px",
                accentColor: "#f3d675",
              }}
            />
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
              Получать письма (рассылку) о новостях сервиса, купоны, акции.
            </span>
          </label>
        </div>

        {/* Current Password */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            Текущий пароль:
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
              type={showCurrentPassword ? "text" : "password"}
              value="********"
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
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
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
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
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
            Изменить пароль:
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
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
                placeholder="Новый пароль"
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
                placeholder="Повторите новый пароль"
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
        </div>

        {/* Security Section */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            Безопасность:
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              style={{
                marginRight: "8px",
                accentColor: "#f3d675",
              }}
            />
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
              Включить двухфакторную идентификацию через E-mail
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            backgroundColor: "#f3d675",
            border: "none",
            borderRadius: "4px",
            color: "#000000",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
