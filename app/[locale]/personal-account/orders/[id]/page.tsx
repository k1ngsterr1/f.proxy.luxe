"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ChevronRight } from "lucide-react";
import { useGetOrderDetails } from "@/entities/orders/hooks/queries/use-get-order-details.query";
import { useFinishOrder } from "@/entities/orders/hooks/mutation/use-finish-order.mutation";
import { AlertMessage } from "@/shared/ui/alert";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { Button } from "@/shared/ui/button";
import { useDeleteOrder } from "@/entities/orders/hooks/mutation/use-delete-order.mutation";
import { useTranslations } from "next-intl";
import { useCheckCouponValidity } from "@/entities/orders/hooks/mutation/use-check-coupong.mutation";

export default function OrderDetailPage() {
  const t = useTranslations("order-detail");
  const alertT = useTranslations("alert");
  const { id } = useParams();
  const orderId = Array.isArray(id) ? id[0] : id;
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderDetails(orderId as any);
  const { data: user } = useGetUser();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [proxyType, setProxyType] = useState<"HTTP" | "SOCKS5">("HTTP");
  const { mutate: finishOrder, isPending: isFinishing } = useFinishOrder();
  const { mutate: checkCouponValidity, isPending: isCheckingCoupon } =
    useCheckCouponValidity();
  const navigate = useRouter();

  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();

  const handleDelete = () => {
    if (confirm(t("confirm-delete"))) {
      deleteOrder(orderId as string, {
        onSuccess: () => navigate.push("/personal-account/orders"),
      });
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    checkCouponValidity(couponCode, {
      onSuccess: (data) => {
        if (data.isValid && data.coupon) {
          // Store the discount
          setAppliedDiscount(data.coupon.discount);
          // Show success message
          alert(`Coupon applied: ${data.coupon.discount}% discount`);
        } else {
          // Reset discount if coupon is invalid
          setAppliedDiscount(null);
          // Show invalid coupon message
          alert("Invalid coupon code");
        }
      },
      onError: (error) => {
        setAppliedDiscount(null);
        alert(`Error checking coupon: ${error.message}`);
      },
    });
  };

  const handleContinue = () => {
    const payload = {
      orderId: orderId,
      promocode: couponCode,
    };

    finishOrder(payload, {
      onSuccess: (order: any) => {
        localStorage.setItem("proxyType", order.type);
        navigate.push(`/personal-account/proxy`);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || error?.message || alertT("generic");

        if (errorMessage === "Insufficient balance") {
          // Access the translation directly as a property instead of using the function call
          // This ensures we get the exact translation we want
          const insufficientFundsMessage = alertT.raw("insufficient-funds");
          alert(insufficientFundsMessage);
        } else {
          alert(errorMessage);
        }
      },
    });
  };

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
      {user?.isVerified === false && (
        <AlertMessage
          type="warning"
          isEmail
          message={alertT("resend.verify-email")}
        />
      )}
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
          {t("title")}
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
          {t("loading")}
        </div>
      )}
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
          {t("error")} {error?.message || t("unknown-error")}
        </div>
      )}
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
                  {t("table.order-number")}
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
                  {t("table.order-date")}
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
                  {t("table.order-type")}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {t("table.purchase")}
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
                  {t("table.ip-quantity")}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {order.type === "resident" ? "∞" : order.quantity}
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
                  {t("table.days-quantity")}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {order.periodDays === "1m"
                    ? t("table.thirty-days")
                    : t("table.thirty-days")}
                </td>
              </tr>
              {order.type === "resident" && (
                <tr>
                  <td
                    style={{
                      padding: "12px 16px",
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.tariff")}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#FFFFFF",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {order.tariff || "-"}
                  </td>
                </tr>
              )}
              <tr>
                <td
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                  }}
                >
                  {t("table.order-amount")}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#FFFFFF",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    fontWeight: "bold",
                  }}
                >
                  {appliedDiscount ? (
                    <div>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999999",
                          marginRight: "8px",
                        }}
                      >
                        ${order.totalPrice}
                      </span>
                      <span style={{ color: "#f3d675" }}>
                        $
                        {(
                          order.totalPrice *
                          (1 - appliedDiscount / 100)
                        ).toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#f3d675",
                          marginLeft: "4px",
                        }}
                      >
                        (-{appliedDiscount}%)
                      </span>
                    </div>
                  ) : (
                    `$${order.totalPrice}`
                  )}
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
                  {t("table.discount-coupon")}
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
                      placeholder={t("coupon.placeholder")}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "rgba(243, 214, 117, 0.1)",
                        border: "1px solid rgba(243, 214, 117, 0.2)",
                        borderRadius: "4px",
                        color: "#f3d675",
                        fontSize: "14px",
                      }}
                    />
                    <Button
                      name={t("coupon.apply")}
                      onClick={handleApplyCoupon}
                      variant="default"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
                <span style={{ color: "#FFFFFF" }}>{t("proxy-type.http")}</span>
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
                <span style={{ color: "#FFFFFF" }}>
                  {t("proxy-type.socks5")}
                </span>
              </label>
            </div>
            <p
              style={{
                color: "#999999",
                fontSize: "12px",
                margin: "0",
              }}
            >
              {t("proxy-type.label")}
            </p>
          </div>
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.2)",
              display: "flex",
              justifyContent: "flex-start",
              gap: "12px",
            }}
          >
            <Button
              onClick={handleContinue}
              name={isFinishing ? t("buttons.loading") : t("buttons.pay")}
              variant="medium"
            />
            <Button
              onClick={handleDelete}
              name={isDeleting ? t("buttons.deleting") : t("buttons.delete")}
              variant="medium"
            />
          </div>
        </div>
      )}
    </div>
  );
}
