"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function PartnerPage() {
  const [showAlert, setShowAlert] = useState(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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

      {/* Header and Description */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            margin: "0 0 16px 0",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ПАРТНЕРСКАЯ ПРОГРАММА
        </h1>
        <p style={{ color: "#f3d675", fontSize: "14px", marginBottom: "8px" }}>
          Наша партнерская программа позволит Вам зарабатывать{" "}
          <strong>30%</strong> от платежей привлеченных Вами клиентов.
        </p>
        <p style={{ color: "#FFFFFF", fontSize: "14px" }}>
          Для участия в программе Вам всего лишь нужно:
        </p>
      </div>

      {/* Participation Methods */}
      <div style={{ marginBottom: "32px" }}>
        <ul style={{ color: "#FFFFFF", fontSize: "14px", paddingLeft: "20px" }}>
          <li style={{ marginBottom: "12px" }}>
            <span style={{ color: "#f3d675" }}>
              Привлекать к нам новых клиентов по реферальной ссылке
            </span>{" "}
            - зарегистрировавшийся по вашей ссылке пользователь пожизненно
            закрепляется за Вами и со всех его платежей вам будет идти процент;
          </li>
          <li>
            <span style={{ color: "#f3d675" }}>
              Распространять партнерский купон на скидку
            </span>{" "}
            - пользователь, использовавший ваш купон, получает 5% скидку при
            покупке, а так же пожизненно закрепляется за Вами и со всех его
            платежей вам будет идти процент.
          </li>
        </ul>
      </div>

      {/* Referral Links */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            Реферальная ссылка №1:
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value="https://px6.me/ru/?r=735461"
              readOnly
              style={{
                flex: 1,
                padding: "10px 12px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#f3d675",
                fontSize: "14px",
              }}
            />
            <button
              onClick={() => copyToClipboard("https://px6.me/ru/?r=735461")}
              style={{
                padding: "10px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                cursor: "pointer",
                color: "#f3d675",
              }}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            №2:
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value="https://px6.me/ru/e/735461"
              readOnly
              style={{
                flex: 1,
                padding: "10px 12px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#f3d675",
                fontSize: "14px",
              }}
            />
            <button
              onClick={() => copyToClipboard("https://px6.me/ru/e/735461")}
              style={{
                padding: "10px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                cursor: "pointer",
                color: "#f3d675",
              }}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Partner Coupon */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#FFFFFF",
              fontSize: "14px",
            }}
          >
            Партнерский купон:
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value="Купон не создан"
              readOnly
              style={{
                flex: 1,
                padding: "10px 12px",
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                border: "1px solid rgba(243, 214, 117, 0.2)",
                borderRadius: "4px",
                color: "#666666",
                fontSize: "14px",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#f3d675",
                border: "none",
                borderRadius: "4px",
                color: "#000000",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Создать
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div style={{ marginBottom: "32px" }}>
          <p
            style={{ color: "#4CAF50", fontSize: "14px", marginBottom: "12px" }}
          >
            Начисление партнерских вознаграждений на баланс происходит каждый
            день единождый.
          </p>
          <p
            style={{ color: "#FFFFFF", fontSize: "14px", marginBottom: "12px" }}
          >
            Для выплаты партнерского вознаграждения напишите заявку на{" "}
            <a
              href="mailto:support@proxy6.net"
              style={{ color: "#f3d675", textDecoration: "none" }}
            >
              support@proxy6.net
            </a>{" "}
            с указанием кошелька для выплаты - WebMoney (WMZ), Payeer. Выплаты
            производятся каждые 7-14 дней.
          </p>
          <p style={{ color: "#FF5252", fontSize: "14px" }}>
            Запрещена регистрация мультиаккаунтов с целью получения партнерских
            выплат, т.е. нельзя быть рефералом самому себе.
          </p>
        </div>

        {/* Statistics Header */}
        <h2
          style={{
            fontSize: "24px",
            margin: "0 0 16px 0",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          СТАТИСТИКА
        </h2>
      </div>
    </div>
  );
}
