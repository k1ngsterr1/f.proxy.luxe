"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProxyOrders } from "@/entities/orders/hooks/queries/use-get-proxy-orders.query";
import { AlertMessage } from "@/shared/ui/alert";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { Button } from "@/shared/ui/button";

export default function OrdersPage() {
  const navigate = useRouter();
  const { data: user } = useGetUser();
  const { data: ordersData, isLoading, isError, error } = useProxyOrders();

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
      {user?.isVerified === false && (
        <AlertMessage
          type="warning"
          isEmail
          message="Вам необходимо подтвердить свой email перейдя по ссылке, указанной в письме."
        />
      )}
      <div
        style={{
          width: "100%",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          ЗАКАЗЫ
        </h1>
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
          Загрузка заказов...
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
          Ошибка при загрузке заказов: {error?.message || "Неизвестная ошибка"}
        </div>
      )}

      {/* Orders Table */}
      {!isLoading &&
      !isError &&
      ordersData?.data &&
      ordersData.data.length > 0 ? (
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
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(243, 214, 117, 0.1)",
                  color: "#f3d675",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "12px 16px" }}>ID</th>
                <th style={{ padding: "12px 16px" }}>Страна</th>
                <th style={{ padding: "12px 16px" }}>Количество</th>
                <th style={{ padding: "12px 16px" }}>Период</th>
                <th style={{ padding: "12px 16px" }}>Тип</th>
                <th style={{ padding: "12px 16px" }}>Статус</th>
                <th style={{ padding: "12px 16px" }}>Цена</th>
                <th style={{ padding: "12px 16px" }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.data.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderTop: "1px solid rgba(243, 214, 117, 0.1)",
                    color: "#FFFFFF",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{order.id}</td>
                  <td style={{ padding: "12px 16px" }}>{order.country}</td>
                  <td style={{ padding: "12px 16px" }}>{order.quantity}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {order.periodDays} дней
                  </td>
                  <td style={{ padding: "12px 16px" }}>{order.proxyType}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        display: "flex",
                        fontWeight: "500",
                        backgroundColor:
                          order.status === "ACTIVE"
                            ? "rgba(76, 175, 80, 0.1)"
                            : order.status === "PENDING"
                            ? "rgba(255, 193, 7, 0.1)"
                            : "rgba(255, 82, 82, 0.1)",
                        color:
                          order.status === "ACTIVE"
                            ? "#4CAF50"
                            : order.status === "PENDING"
                            ? "#FFC107"
                            : "#FF5252",
                      }}
                    >
                      {order.status === "ACTIVE"
                        ? "Активен"
                        : order.status === "PENDING"
                        ? "Обработка"
                        : "Истек"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", marginRight: "16px" }}>
                    {order.totalPrice} $
                  </td>
                  {order.status === "PENDING" && (
                    <Button
                      variant="small"
                      name="ОПЛАТИТЬ"
                      onClick={() =>
                        navigate.push(`/personal-account/orders/${order.id}`)
                      }
                    />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading &&
        !isError && (
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              padding: "24px",
              textAlign: "center",
              borderRadius: "4px",
              color: "#f3d675",
              fontSize: "14px",
              border: "1px solid rgba(243, 214, 117, 0.2)",
            }}
          >
            Ничего не найдено...
          </div>
        )
      )}
    </div>
  );
}
