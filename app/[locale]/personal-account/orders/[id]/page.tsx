"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { useGetOrderDetails } from "@/entities/orders/hooks/queries/use-get-order-details.query";
import { useFinishOrder } from "@/entities/orders/hooks/mutation/use-finish-order.mutation";
import { AlertMessage } from "@/shared/ui/alert";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { Button } from "@/shared/ui/button";
import { useDeleteOrder } from "@/entities/orders/hooks/mutation/use-delete-order.mutation";
import { useTranslations } from "next-intl";
import { useCheckCouponValidity } from "@/entities/orders/hooks/mutation/use-check-coupong.mutation";
import { useIsMobile } from "@/shared/utils/use-is-mobile";

export default function OrderDetailPage() {
  const i18n = useTranslations();
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
  const [proxyType, setProxyType] = useState<"HTTPS" | "SOCKS5">("HTTPS");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Автоматически скрываем сообщения через 5 секунд
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (order?.proxyType === "HTTPS" || order?.proxyType === "SOCKS5") {
      setProxyType(order.proxyType);
    }
  }, [order?.proxyType]);
  const { mutate: finishOrder, isPending: isFinishing } = useFinishOrder();
  const { mutate: checkCouponValidity, isPending: isCheckingCoupon } =
    useCheckCouponValidity();
  const navigate = useRouter();
  const isMobile = useIsMobile();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          setSuccessMessage(
            `Coupon applied: ${data.coupon.discount}% discount`
          );
        } else {
          // Reset discount if coupon is invalid
          setAppliedDiscount(null);
          // Show invalid coupon message
          setErrorMessage("Invalid coupon code");
        }
      },
      onError: (error) => {
        setAppliedDiscount(null);
        setErrorMessage(`Error checking coupon: ${error.message}`);
      },
    });
  };

  const handleContinue = () => {
    if (isFinishing) {
      return;
    }

    setErrorMessage(null);

    const orderTotal = Number(order?.totalPrice) || 0;
    const discountMultiplier = 1 - (appliedDiscount || 0) / 100;
    const payableTotal = orderTotal * discountMultiplier;
    const currentBalance = Number(user?.balance) || 0;
    const canCheckBalance =
      user?.balance !== undefined &&
      (!couponCode || appliedDiscount !== null);

    if (canCheckBalance && currentBalance < payableTotal) {
      setErrorMessage(t("insufficient-funds"));
      return;
    }

    const payload = {
      orderId: orderId,
      promocode: couponCode,
      proxyType: order?.type === "ipv6" ? proxyType : undefined,
    };

    finishOrder(payload, {
      onSuccess: (order: any) => {
        localStorage.setItem("proxyType", order.type);
        navigate.push(`/personal-account/proxy`);
      },
      onError: (error: any) => {
        const responseMessage = error?.response?.data?.message;
        const messages = [
          ...(Array.isArray(responseMessage)
            ? responseMessage
            : [responseMessage]),
          error?.response?.data?.error,
          error?.message,
        ].filter((message): message is string => typeof message === "string");

        const hasInsufficientFundsError = messages.some((message) =>
          /insufficient (balance|funds)|недостаточно средств/i.test(message)
        );

        if (hasInsufficientFundsError) {
          setErrorMessage(t("insufficient-funds"));
        } else {
          setErrorMessage(messages[0] || t("generic"));
        }
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU");
  };

  // Responsive styles
  const containerPadding = isMobile ? "16px" : "20px";
  const titleFontSize = isMobile ? "20px" : "32px";
  const headerMarginBottom = isMobile ? "16px" : "24px";
  const tableFontSize = isMobile ? "13px" : "14px";
  const cellPadding = isMobile ? "10px 12px" : "12px 16px";
  const buttonPadding = isMobile ? "8px 12px" : "10px 16px";
  const inputPadding = isMobile ? "6px 10px" : "8px 12px";
  const labelGap = isMobile ? "6px" : "8px";
  const buttonGap = isMobile ? "8px" : "12px";
  const alertMarginBottom = isMobile ? "16px" : "24px";

  return (
    <div
      style={{
        padding: containerPadding,
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#000000",
      }}
    >
      <title>{i18n("orderDetail.title")}</title>
      {errorMessage && (
        <div
          style={{
            position: "fixed",
            top: isMobile ? "16px" : "24px",
            right: isMobile ? "16px" : "24px",
            left: isMobile ? "16px" : "auto",
            width: isMobile ? "auto" : "min(420px, calc(100vw - 48px))",
            zIndex: 1200,
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "14px 16px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 82, 82, 0.45)",
            backgroundColor: "#211313",
            color: "#ff7b7b",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
          }}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle
            size={20}
            style={{ flexShrink: 0, marginTop: "1px" }}
          />
          <span style={{ flex: 1, lineHeight: 1.45 }}>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            title={t("notification.close")}
            aria-label={t("notification.close")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              padding: 0,
              border: 0,
              background: "transparent",
              color: "currentColor",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div style={{ marginBottom: alertMarginBottom }}>
        <AlertMessage
          type="success"
          message={successMessage || ""}
          show={!!successMessage}
        />
      </div>

      {user?.isVerified === false && (
        <div style={{ marginBottom: alertMarginBottom }}>
          <AlertMessage
            type="warning"
            isEmail
            message={alertT("resend.verify-email")}
          />
        </div>
      )}

      {/* Header with back link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: headerMarginBottom,
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {isMobile && (
          <Link
            href="/personal-account/orders"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#f3d675",
              textDecoration: "none",
              marginBottom: "8px",
              width: "100%",
            }}
          >
            <ArrowLeft size={16} style={{ marginRight: "4px" }} />
            {t("back-to-orders")}
          </Link>
        )}

        <Link
          href="/orders"
          style={{
            fontSize: titleFontSize,
            color: "#FFFFFF",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          {t("title")}
        </Link>
        <ChevronRight
          size={isMobile ? 16 : 24}
          style={{ color: "#f3d675", margin: "0 8px" }}
        />
        <span
          style={{
            fontSize: titleFontSize,
            color: "#f3d675",
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {orderId}
        </span>
      </div>

      {isLoading && (
        <div
          style={{
            backgroundColor: "rgba(243, 214, 117, 0.1)",
            padding: isMobile ? "16px" : "24px",
            textAlign: "center",
            borderRadius: "4px",
            color: "#f3d675",
            fontSize: tableFontSize,
            border: "1px solid rgba(243, 214, 117, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Loader2 size={isMobile ? 16 : 20} className="animate-spin" />
          {t("loading")}
        </div>
      )}

      {isError && (
        <div
          style={{
            backgroundColor: "rgba(255, 82, 82, 0.1)",
            padding: isMobile ? "16px" : "24px",
            textAlign: "center",
            borderRadius: "4px",
            color: "#FF5252",
            fontSize: tableFontSize,
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
          {/* Mobile view: Display as stacked divs instead of table */}
          {isMobile ? (
            <div>
              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.order-number")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
                  }}
                >
                  {order.orderNumber || orderId}
                </div>
              </div>

              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.order-date")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
                  }}
                >
                  {formatDate(order.createdAt)}
                </div>
              </div>

              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.order-type")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
                  }}
                >
                  {t("table.purchase")}
                </div>
              </div>

              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.ip-quantity")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
                  }}
                >
                  {order.type === "resident" ? "∞" : order.quantity}
                </div>
              </div>

              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.days-quantity")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
                  }}
                >
                  {(order.periodDays as any) == "1m"
                    ? t("month")
                    : order.periodDays}
                </div>
              </div>

              {order.type === "resident" && (
                <div
                  style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
                >
                  <div
                    style={{
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      fontSize: tableFontSize,
                      fontWeight: "500",
                    }}
                  >
                    {t("table.tariff")}
                  </div>
                  <div
                    style={{
                      padding: cellPadding,
                      color: "#FFFFFF",
                      fontSize: tableFontSize,
                    }}
                  >
                    {order.tariff || "-"}
                  </div>
                </div>
              )}

              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.order-amount")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
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
                </div>
              </div>

              <div
                style={{ borderBottom: "1px solid rgba(243, 214, 117, 0.2)" }}
              >
                <div
                  style={{
                    padding: cellPadding,
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    fontSize: tableFontSize,
                    fontWeight: "500",
                  }}
                >
                  {t("table.discount-coupon")}
                </div>
                <div
                  style={{
                    padding: cellPadding,
                    color: "#FFFFFF",
                    fontSize: tableFontSize,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setAppliedDiscount(null);
                      }}
                      placeholder={t("coupon.placeholder")}
                      style={{
                        padding: inputPadding,
                        backgroundColor: "rgba(243, 214, 117, 0.1)",
                        border: "1px solid rgba(243, 214, 117, 0.2)",
                        borderRadius: "4px",
                        color: "#f3d675",
                        fontSize: tableFontSize,
                        width: "100%",
                      }}
                    />
                    <Button
                      name={t("coupon.apply")}
                      onClick={handleApplyCoupon}
                      variant="default"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Desktop view: Table layout
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: tableFontSize,
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: cellPadding,
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
                      padding: cellPadding,
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
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.order-date")}
                  </td>
                  <td
                    style={{
                      padding: cellPadding,
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
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.order-type")}
                  </td>
                  <td
                    style={{
                      padding: cellPadding,
                      color: "#FFFFFF",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {order.type}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.ip-quantity")}
                  </td>
                  <td
                    style={{
                      padding: cellPadding,
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
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.days-quantity")}
                  </td>
                  <td
                    style={{
                      padding: cellPadding,
                      color: "#FFFFFF",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {(order.periodDays as any) == "1m"
                      ? t("month")
                      : order.periodDays}
                  </td>
                </tr>
                {order.type === "resident" && (
                  <tr>
                    <td
                      style={{
                        padding: cellPadding,
                        backgroundColor: "rgba(243, 214, 117, 0.1)",
                        color: "#f3d675",
                        borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                      }}
                    >
                      {t("table.tariff")}
                    </td>
                    <td
                      style={{
                        padding: cellPadding,
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
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.order-amount")}
                  </td>
                  <td
                    style={{
                      padding: cellPadding,
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
                      padding: cellPadding,
                      backgroundColor: "rgba(243, 214, 117, 0.1)",
                      color: "#f3d675",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    {t("table.discount-coupon")}
                  </td>
                  <td
                    style={{
                      padding: cellPadding,
                      color: "#FFFFFF",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.2)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setAppliedDiscount(null);
                        }}
                        placeholder={t("coupon.placeholder")}
                        style={{
                          padding: inputPadding,
                          backgroundColor: "rgba(243, 214, 117, 0.1)",
                          border: "1px solid rgba(243, 214, 117, 0.2)",
                          borderRadius: "4px",
                          color: "#f3d675",
                          fontSize: tableFontSize,
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
          )}

          <div
            style={{
              display: order?.type === "ipv6" ? "block" : "none",
              padding: isMobile ? "12px" : "16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: labelGap,
                alignItems: "center",
                marginBottom: "8px",
                flexDirection: isMobile ? "column" : "row",
                //@ts-ignore
                alignItems: isMobile ? "flex-start" : "center",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                  marginBottom: isMobile ? "8px" : "0",
                }}
              >
                <input
                  type="radio"
                  name="proxyType"
                  checked={proxyType === "HTTPS"}
                  onChange={() => setProxyType("HTTPS")}
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
                  width: isMobile ? "100%" : "auto",
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
              padding: isMobile ? "12px" : "16px",
              borderTop: "1px solid rgba(243, 214, 117, 0.2)",
              display: "flex",
              justifyContent: "flex-start",
              gap: buttonGap,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Button
              onClick={handleContinue}
              disabled={isFinishing}
              name={isFinishing ? t("buttons.loading") : t("buttons.pay")}
              variant="medium"
              style={{ width: isMobile ? "100%" : "auto" }}
            />
            <Button
              onClick={handleDelete}
              name={isDeleting ? t("buttons.deleting") : t("buttons.delete")}
              variant="medium"
              style={{ width: isMobile ? "100%" : "auto" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
