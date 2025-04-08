"use client";

import { useState } from "react";
import {
  Copy,
  AlertTriangle,
  CheckCircle,
  Clipboard,
  Gift,
} from "lucide-react";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";

export default function PartnerPage() {
  const { data: user } = useGetUser();
  const [couponCreated, setCouponCreated] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState<
    string | null
  >(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(type);
    setTimeout(() => setShowCopyNotification(null), 2000);
  };

  const createCoupon = () => {
    setCouponCreated(true);
  };

  // Statistics data
  const stats = [
    {
      value: "743 551",
      label: "КЛИЕНТОВ ВЫБРАЛИ НАС",
    },
    {
      value: "32 277 133",
      label: "ПРОДАННЫХ ПРОКСИ",
    },
    {
      value: "477 489",
      label: "ПРОКСИ В РАБОТЕ",
    },
    {
      value: "9 206 727",
      label: "ЗАКАЗОВ ОБРАБОТАНО",
    },
  ];

  // Referral data
  const referralLinks = [
    {
      label: "Реферальная ссылка №1:",
      value: "https://px6.me/ru/?r=735461",
    },
    {
      label: "№2:",
      value: "https://px6.me/ru/e/735461",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0F0F0F",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      {/* Main content container */}
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Email verification warning */}
        {user?.isVerified === false && (
          <div
            style={{
              backgroundColor: "rgba(255, 193, 7, 0.1)",
              border: "1px solid rgba(255, 193, 7, 0.3)",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <AlertTriangle
              size={20}
              color="#FFC107"
              style={{ marginTop: "2px" }}
            />
            <div>
              <p style={{ color: "#FFC107", fontSize: "14px", margin: 0 }}>
                Вам необходимо подтвердить свой email перейдя по ссылке,
                указанной в письме.
              </p>
            </div>
          </div>
        )}

        {/* Header section */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "32px",
              margin: "0 0 16px 0",
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Партнерская программа
          </h1>
          <p
            style={{ color: "#f3d675", fontSize: "16px", marginBottom: "12px" }}
          >
            Наша партнерская программа позволит Вам зарабатывать{" "}
            <strong>30%</strong> от платежей привлеченных Вами клиентов.
          </p>
          <p style={{ color: "#FFFFFF", fontSize: "15px" }}>
            Для участия в программе Вам всего лишь нужно:
          </p>
        </div>

        {/* Statistics section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "26px",
                  color: "#f3d675",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#999999",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Participation Methods */}
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              margin: "0 0 16px 0",
              color: "#f3d675",
              fontWeight: "bold",
            }}
          >
            Способы участия
          </h2>
          <ul
            style={{
              color: "#FFFFFF",
              fontSize: "15px",
              paddingLeft: "20px",
              margin: 0,
            }}
          >
            <li style={{ marginBottom: "16px" }}>
              <span style={{ color: "#f3d675", fontWeight: "500" }}>
                Привлекать к нам новых клиентов по реферальной ссылке
              </span>{" "}
              - зарегистрировавшийся по вашей ссылке пользователь пожизненно
              закрепляется за Вами и со всех его платежей вам будет идти
              процент;
            </li>
            <li>
              <span style={{ color: "#f3d675", fontWeight: "500" }}>
                Распространять партнерский купон на скидку
              </span>{" "}
              - пользователь, использовавший ваш купон, получает 5% скидку при
              покупке, а так же пожизненно закрепляется за Вами и со всех его
              платежей вам будет идти процент.
            </li>
          </ul>
        </div>

        {/* Referral Links Section */}
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              margin: "0 0 20px 0",
              color: "#f3d675",
              fontWeight: "bold",
            }}
          >
            <Clipboard
              size={18}
              style={{ marginRight: "8px", verticalAlign: "text-bottom" }}
            />
            Ваши реферальные ссылки
          </h2>

          {referralLinks.map((link, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFFFFF",
                  fontSize: "15px",
                }}
              >
                {link.label}
              </label>
              <div
                style={{ display: "flex", gap: "8px", position: "relative" }}
              >
                <input
                  type="text"
                  value={link.value}
                  readOnly
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    backgroundColor: "rgba(243, 214, 117, 0.05)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "6px",
                    color: "#f3d675",
                    fontSize: "14px",
                    fontFamily: "monospace",
                  }}
                />
                <button
                  onClick={() => copyToClipboard(link.value, `link${index}`)}
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#f3d675",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 214, 117, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 214, 117, 0.1)";
                  }}
                >
                  <Copy size={18} />
                </button>
                {showCopyNotification === `link${index}` && (
                  <div
                    style={{
                      position: "absolute",
                      right: "50px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "#f3d675",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <CheckCircle size={14} />
                    Скопировано!
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Partner Coupon */}
          <div style={{ marginTop: "24px" }}>
            <h2
              style={{
                fontSize: "20px",
                margin: "0 0 20px 0",
                color: "#f3d675",
                fontWeight: "bold",
              }}
            >
              <Gift
                size={18}
                style={{ marginRight: "8px", verticalAlign: "text-bottom" }}
              />
              Партнерский купон
            </h2>
            <div style={{ display: "flex", gap: "8px", position: "relative" }}>
              <input
                type="text"
                value={couponCreated ? "PARTNER5" : "Купон не создан"}
                readOnly
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "6px",
                  color: couponCreated ? "#f3d675" : "#666666",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              />
              {couponCreated ? (
                <button
                  onClick={() => copyToClipboard("PARTNER5", "coupon")}
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#f3d675",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 214, 117, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(243, 214, 117, 0.1)";
                  }}
                >
                  <Copy size={18} />
                </button>
              ) : (
                <button
                  onClick={createCoupon}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: "#f3d675",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5c968";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3d675";
                  }}
                >
                  Создать
                </button>
              )}
              {showCopyNotification === "coupon" && (
                <div
                  style={{
                    position: "absolute",
                    right: "50px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#f3d675",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <CheckCircle size={14} />
                  Скопировано!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              margin: "0 0 16px 0",
              color: "#f3d675",
              fontWeight: "bold",
            }}
          >
            Важная информация
          </h2>
          <p
            style={{ color: "#4CAF50", fontSize: "15px", marginBottom: "16px" }}
          >
            Начисление партнерских вознаграждений на баланс происходит каждый
            день единождый.
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "15px",
              marginBottom: "16px",
              lineHeight: "1.5",
            }}
          >
            Для выплаты партнерского вознаграждения напишите заявку на{" "}
            <a
              href="mailto:admin@proxy.luxe"
              style={{ color: "#f3d675", textDecoration: "none" }}
            >
              admin@proxy.luxe
            </a>{" "}
            с указанием кошелька для выплаты - WebMoney (WMZ), Payeer. Выплаты
            производятся каждые 7-14 дней.
          </p>
          <p style={{ color: "#FF5252", fontSize: "15px", margin: 0 }}>
            Запрещена регистрация мультиаккаунтов с целью получения партнерских
            выплат, т.е. нельзя быть рефералом самому себе.
          </p>
        </div>

        {/* Statistics Section */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              margin: "0 0 24px 0",
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Статистика
          </h2>

          {/* Statistics table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                color: "#FFFFFF",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                      color: "#f3d675",
                    }}
                  >
                    Дата
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                      color: "#f3d675",
                    }}
                  >
                    Реферал
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                      color: "#f3d675",
                    }}
                  >
                    Сумма платежа
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                      color: "#f3d675",
                    }}
                  >
                    Вознаграждение
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Empty state */}
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      padding: "40px 16px",
                      textAlign: "center",
                      color: "#999999",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(243, 214, 117, 0.05)",
                    }}
                  >
                    У вас пока нет рефералов. Поделитесь своей реферальной
                    ссылкой или купоном, чтобы начать зарабатывать!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              borderRadius: "6px",
              border: "1px solid rgba(243, 214, 117, 0.1)",
            }}
          >
            <div>
              <span
                style={{
                  color: "#999999",
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                Всего рефералов:
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                0
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#999999",
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                Заработано:
              </span>
              <span
                style={{
                  color: "#f3d675",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                0.00 ₽
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#999999",
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                Доступно к выводу:
              </span>
              <span
                style={{
                  color: "#4CAF50",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                0.00 ₽
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
