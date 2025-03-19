"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ChevronRight } from "lucide-react";
import { useGetOrderDetails } from "@/entities/orders/hooks/queries/use-get-order-details.query";

export default function OrderDetailPage() {
  const { id } = useParams();
  const orderId = Array.isArray(id) ? id[0] : id;
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderDetails(orderId as any);
  const [showAlert, setShowAlert] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [proxyType, setProxyType] = useState<"HTTP" | "SOCKS5">("HTTP");

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    alert(`Применение купона: ${couponCode}`);
    // Here you would typically call an API to apply the coupon
  };

  const handleContinue = () => {};

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU");
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

      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Link
          href="/orders"
          style={{
            fontSize: "32px",
            color: "#FFFFFF",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          ЗАКАЗЫ
        </Link>
        <ChevronRight
          size={24}
          style={{ color: "#f3d675", margin: "0 12px" }}
        />
        <span
          style={{
            fontSize: "32px",
            color: "#f3d675",
            fontWeight: "bold",
          }}
        >
          {orderId}
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: "24px",
            textAlign: "center",
            borderRadius: "4px",
            color: "#f3d675",
            fontSize: "14px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Loader2 size={20} className="animate-spin" />
          Загрузка информации о заказе...
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div
          style={{
            backgroundColor: "rgba(255, 82, 82, 0.1)",
            padding: "24px",
            textAlign: "center",
            borderRadius: "4px",
            color: "#FF5252",
            fontSize: "14px",
            border: "1px solid rgba(255, 82, 82, 0.2)",
          }}
        >
          Ошибка при загрузке заказа: {error?.message || "Неизвестная ошибка"}
        </div>
      )}

      {/* Order Details */}
      {!isLoading && !isError && order && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            borderRadius: "4px",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    width: "30%",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Номер заказа:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {order.orderNumber || orderId}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Дата заказа:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {formatDate(order.createdAt)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Тип заказа:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Покупка
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Кол-во IP:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {order.quantity}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Кол-во дней:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {order.periodDays}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Сумма заказа:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    fontWeight: "bold",
                  }}
                >
                  {order.totalPrice} ₽
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  Купон на скидку:
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Купон на скидку"
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "rgba(243, 214, 117, 0.1)",
                        border: "1px solid rgba(243, 214, 117, 0.2)",
                        borderRadius: "4px",
                        color: "#f3d675",
                        fontSize: "14px",
                      }}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#f3d675",
                        border: "none",
                        borderRadius: "4px",
                        color: "#000000",
                        fontSize: "14px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Применить
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Proxy Type Selection */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="proxyType"
                  checked={proxyType === "HTTP"}
                  onChange={() => setProxyType("HTTP")}
                  style={{
                    accentColor: "#f3d675",
                  }}
                />
                <span style={{ color: "#FFFFFF" }}>HTTP(s)</span>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="proxyType"
                  checked={proxyType === "SOCKS5"}
                  onChange={() => setProxyType("SOCKS5")}
                  style={{
                    accentColor: "#f3d675",
                  }}
                />
                <span style={{ color: "#FFFFFF" }}>SOCKS5</span>
              </label>
            </div>
            <p
              style={{
                color: "#999999",
                fontSize: "12px",
                margin: "0",
              }}
            >
              Тип прокси можно будет изменить в личном кабинете после покупки.
            </p>
          </div>

          {/* Continue Button */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.2)",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <button
              onClick={handleContinue}
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
              Продолжить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
