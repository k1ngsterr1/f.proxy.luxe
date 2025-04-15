"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProxyOrders } from "@/entities/orders/hooks/queries/use-get-proxy-orders.query";
import { AlertMessage } from "@/shared/ui/alert";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { Button } from "@/shared/ui/button";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function OrdersPage() {
  const navigate = useRouter();
  const { data: user } = useGetUser();
  const i18n = useTranslations();
  const { data: ordersData, isLoading, isError, error } = useProxyOrders();
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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
          message={i18n("personal-orders.verify-email")}
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
          {i18n("personal-orders.title")}
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
          {i18n("personal-orders.orders-loading")}
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
          {i18n("personal-orders.orders-error")}:{" "}
          {error?.message || "Неизвестная ошибка"}
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
          <div
            style={{
              overflowX: "auto",
              WebkitOverflowScrolling:
                "touch" /* For smoother scrolling on iOS */,
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth:
                  "800px" /* Ensure table doesn't shrink below this width */,
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
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.id")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.country")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.quantity")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.period")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.type")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.status")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.price")}
                  </th>
                  <th style={{ padding: "12px 16px" }}>
                    {i18n("personal-orders.table.actions")}
                  </th>
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
                      {order.periodDays} {i18n("personal-orders.table.days")}
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
                          ? `${i18n("personal-orders.status.active")}`
                          : order.status === "PENDING"
                          ? `${i18n("personal-orders.status.pending")}`
                          : `${i18n("personal-orders.status.expired")}`}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", marginRight: "16px" }}>
                      {order.totalPrice} $
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {order.status === "PENDING" && (
                        <Button
                          variant="small"
                          name={`${i18n("personal-orders.pay-button")}`}
                          onClick={() =>
                            navigate.push(
                              `/personal-account/orders/${order.id}`
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            {i18n(`personal-orders.empty`)}
          </div>
        )
      )}
    </div>
  );
}
