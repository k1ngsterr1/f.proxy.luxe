"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Copy,
  AlertTriangle,
  CheckCircle,
  Clipboard,
  Gift,
} from "lucide-react";
import { useGetUser } from "@/entities/user/api/hooks/use-get-user.query";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/config/apiClient";
import { useIsTablet } from "@/shared/utils/use-is-tablet";
import { useIsSmallerTablet } from "@/shared/utils/use-is-smaller-tablet";

const useGetPartnerDetails = () => {
  return useQuery({
    queryKey: ["partner-details"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/v1/user/partner/details");
      return data;
    },
    staleTime: 60 * 1000,
  });
};

export default function PartnerPage() {
  const i18n = useTranslations();
  const t = useTranslations("personal-partner");
  const { data: partnerDetails, isLoading } = useGetPartnerDetails();
  const { data: user } = useGetUser();
  const [couponCreated, setCouponCreated] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState<
    string | null
  >(null);
  const [isPayoutPopupOpen, setPayoutPopupOpen] = useState(false);
  const [wallet, setWallet] = useState("");
  const [payoutError, setPayoutError] = useState("");
  const [isPayoutLoading, setPayoutLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isTablet = useIsTablet();
  const isSmallerTablet = useIsSmallerTablet();

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

  const handlePayoutSubmit = async () => {
    setPayoutError("");
    setPayoutLoading(true);
    try {
      await apiClient.post("/api/v1/user/partner/payout", { wallet });
      setPayoutPopupOpen(false);
      setWallet("");
    } catch (err: any) {
      setPayoutError(t("withdrawal.error"));
      console.error(err);
    } finally {
      setPayoutLoading(false);
    }
  };

  const tdStyle = {
    padding: isMobile ? "10px 12px" : "12px 16px",
    borderBottom: "1px solid rgba(243, 214, 117, 0.05)",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    fontSize: isMobile ? "13px" : "14px",
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(type);
    setTimeout(() => setShowCopyNotification(null), 2000);
  };

  const createCoupon = () => {
    setCouponCreated(true);
  };

  const id = user?.id;
  const referralLink = `${window.location.origin}/register?ref=${id}`;

  // Referral data
  const referralLinks = [
    {
      label: t("referral.title"),
      value: referralLink,
    },
  ];

  const containerStyle = isSmallerTablet
    ? "400px"
    : isTablet
    ? "600px"
    : "800px";

  return (
    <div
      style={{
        backgroundColor: "#0F0F0F",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          padding: isMobile ? "20px 16px" : "40px 20px",
          maxWidth: containerStyle as any,
          margin: "0 auto",
        }}
      >
        <title>{i18n("partnerProgramm.title")}</title>

        {/* Email verification warning */}
        {user?.isVerified === false && (
          <div
            style={{
              backgroundColor: "rgba(255, 193, 7, 0.1)",
              border: "1px solid rgba(255, 193, 7, 0.3)",
              borderRadius: "8px",
              padding: isMobile ? "12px" : "16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <AlertTriangle
              size={isMobile ? 18 : 20}
              color="#FFC107"
              style={{ marginTop: "2px", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  color: "#FFC107",
                  fontSize: isMobile ? "13px" : "14px",
                  margin: 0,
                }}
              >
                {t("verification.message")}
              </p>
            </div>
          </div>
        )}

        {/* Header section */}
        <div style={{ marginBottom: isMobile ? "30px" : "40px" }}>
          <h1
            style={{
              fontSize: isMobile ? "24px" : "32px",
              margin: "0 0 16px 0",
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              color: "#f3d675",
              fontSize: isMobile ? "15px" : "16px",
              marginBottom: "12px",
            }}
          >
            {t("description")} <strong>15%</strong> {t("description-2")}
          </p>
          <p style={{ color: "#FFFFFF", fontSize: isMobile ? "14px" : "15px" }}>
            {t("requirements")}
          </p>
        </div>

        {/* Participation Methods */}
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            padding: isMobile ? "16px" : "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "18px" : "20px",
              margin: "0 0 16px 0",
              color: "#f3d675",
              fontWeight: "bold",
            }}
          >
            {t("participation.title")}
          </h2>
          <ul
            style={{
              color: "#FFFFFF",
              fontSize: isMobile ? "14px" : "15px",
              paddingLeft: isMobile ? "16px" : "20px",
              margin: 0,
            }}
          >
            <li style={{ marginBottom: "16px" }}>
              <span style={{ color: "#f3d675", fontWeight: "500" }}>
                {t("participation.method1.title")}
              </span>{" "}
              {t("participation.method1.description")}
              15%
            </li>
            <li>
              <span style={{ color: "#f3d675", fontWeight: "500" }}>
                {t("participation.method2.title")}
              </span>{" "}
              {t("participation.method2.description")}
            </li>
          </ul>
        </div>

        {/* Referral Links Section */}
        <div
          style={{
            marginBottom: "30px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: isMobile ? "16px" : "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "18px" : "20px",
              margin: "0 0 20px 0",
              color: "#f3d675",
              fontWeight: "bold",
            }}
          >
            <Clipboard
              size={isMobile ? 16 : 18}
              style={{ marginRight: "8px", verticalAlign: "text-bottom" }}
            />
            {t("referral-links.title")}
          </h2>

          {referralLinks.map((link, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#FFFFFF",
                  fontSize: isMobile ? "14px" : "15px",
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
                    padding: isMobile ? "10px 12px" : "12px 14px",
                    backgroundColor: "rgba(243, 214, 117, 0.05)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "6px",
                    color: "#f3d675",
                    fontSize: isMobile ? "12px" : "14px",
                    fontFamily: "monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
                <button
                  onClick={() => copyToClipboard(link.value, `link${index}`)}
                  style={{
                    padding: isMobile ? "10px" : "12px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#f3d675",
                    transition: "all 0.2s",
                    flexShrink: 0,
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
                  <Copy size={isMobile ? 16 : 18} />
                </button>
                {showCopyNotification === `link${index}` && (
                  <div
                    style={{
                      position: "absolute",
                      right: isMobile ? "0" : "50px",
                      top: isMobile ? "-30px" : "50%",
                      transform: isMobile ? "none" : "translateY(-50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "#f3d675",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      zIndex: 10,
                    }}
                  >
                    <CheckCircle size={14} />
                    {t("copy-notification")}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Partner Coupon */}
          <div style={{ marginTop: "24px" }}>
            <h2
              style={{
                fontSize: isMobile ? "18px" : "20px",
                margin: "0 0 20px 0",
                color: "#f3d675",
                fontWeight: "bold",
              }}
            >
              <Gift
                size={isMobile ? 16 : 18}
                style={{ marginRight: "8px", verticalAlign: "text-bottom" }}
              />
              {t("partner-coupon.title")}
            </h2>
            <div style={{ display: "flex", gap: "8px", position: "relative" }}>
              <input
                type="text"
                value={
                  couponCreated ? "PARTNER5" : t("partner-coupon.not-created")
                }
                readOnly
                style={{
                  flex: 1,
                  padding: isMobile ? "10px 12px" : "12px 14px",
                  backgroundColor: "rgba(243, 214, 117, 0.05)",
                  border: "1px solid rgba(243, 214, 117, 0.2)",
                  borderRadius: "6px",
                  color: couponCreated ? "#f3d675" : "#666666",
                  fontSize: isMobile ? "12px" : "14px",
                  fontFamily: "monospace",
                }}
              />
              {couponCreated ? (
                <button
                  onClick={() => copyToClipboard("PARTNER5", "coupon")}
                  style={{
                    padding: isMobile ? "10px" : "12px",
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    border: "1px solid rgba(243, 214, 117, 0.2)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#f3d675",
                    transition: "all 0.2s",
                    flexShrink: 0,
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
                  <Copy size={isMobile ? 16 : 18} />
                </button>
              ) : (
                <button
                  onClick={createCoupon}
                  style={{
                    padding: isMobile ? "10px 16px" : "12px 20px",
                    backgroundColor: "#f3d675",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "#000000",
                    fontWeight: "500",
                    fontSize: isMobile ? "13px" : "14px",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5c968";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3d675";
                  }}
                >
                  {t("partner-coupon.create")}
                </button>
              )}
              {showCopyNotification === "coupon" && (
                <div
                  style={{
                    position: "absolute",
                    right: isMobile ? "0" : "50px",
                    top: isMobile ? "-30px" : "50%",
                    transform: isMobile ? "none" : "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#f3d675",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    zIndex: 10,
                  }}
                >
                  <CheckCircle size={14} />
                  {t("copy-notification")}
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
            padding: isMobile ? "16px" : "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "18px" : "20px",
              margin: "0 0 16px 0",
              color: "#f3d675",
              fontWeight: "bold",
            }}
          >
            {t("important-info.title")}
          </h2>
          <p
            style={{
              color: "#4CAF50",
              fontSize: isMobile ? "14px" : "15px",
              marginBottom: "16px",
            }}
          >
            {t("important-info.daily-rewards")}
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: isMobile ? "14px" : "15px",
              marginBottom: "16px",
              lineHeight: "1.5",
            }}
          >
            {t("important-info.withdrawal-info")}{" "}
            <a
              href="mailto:admin@proxy.luxe"
              style={{ color: "#f3d675", textDecoration: "none" }}
            >
              admin@proxy.luxe
            </a>{" "}
            {t("important-info.withdrawal-info-2")}
          </p>
          <p
            style={{
              color: "#FF5252",
              fontSize: isMobile ? "14px" : "15px",
              margin: 0,
            }}
          >
            {t("important-info.warning")}
          </p>
        </div>

        {/* Statistics Section */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: isMobile ? "16px" : "20px",
            borderRadius: "8px",
            border: "1px solid rgba(243, 214, 117, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "20px" : "24px",
              margin: "0 0 24px 0",
              color: "#FFFFFF",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {t("stats.title")}
          </h2>

          {/* Statistics table - Mobile version */}
          {isMobile && (
            <div>
              {partnerDetails?.referrals?.length ? (
                partnerDetails.referrals.map((referral: any, index: number) => (
                  <div
                    key={`${referral.id}-${index}`}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "6px",
                      padding: "12px",
                      marginBottom: "12px",
                      border: "1px solid rgba(243, 214, 117, 0.05)",
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      <span
                        style={{
                          color: "#999",
                          fontSize: "12px",
                          marginRight: "6px",
                        }}
                      >
                        {t("referrals.table.date")}:
                      </span>
                      <span style={{ color: "#fff", fontSize: "13px" }}>
                        {new Date(referral.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <span
                        style={{
                          color: "#999",
                          fontSize: "12px",
                          marginRight: "6px",
                        }}
                      >
                        {t("referrals.table.user")}:
                      </span>
                      <span style={{ color: "#fff", fontSize: "13px" }}>
                        {referral.userId}
                      </span>
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <span
                        style={{
                          color: "#999",
                          fontSize: "12px",
                          marginRight: "6px",
                        }}
                      >
                        {t("referrals.table.purchases")}:
                      </span>
                      <span style={{ color: "#fff", fontSize: "13px" }}>—</span>
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#999",
                          fontSize: "12px",
                          marginRight: "6px",
                        }}
                      >
                        {t("referrals.table.commission")}:
                      </span>
                      <span style={{ color: "#f3d675", fontSize: "13px" }}>
                        —
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#999999",
                    padding: "16px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  {t("referrals.empty")}
                </div>
              )}
            </div>
          )}

          {/* Statistics table - Desktop version */}
          {!isMobile && (
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
                      {t("referrals.table.date")}
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
                      {t("referrals.table.user")}
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
                      {t("referrals.table.purchases")}
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
                      {t("referrals.table.commission")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {partnerDetails?.referrals?.length ? (
                    partnerDetails.referrals.map(
                      (referral: any, index: number) => (
                        <tr key={`${referral.id}-${index}`}>
                          <td style={tdStyle}>
                            {new Date(referral.createdAt).toLocaleDateString()}
                          </td>
                          <td style={tdStyle}>{referral.userId}</td>
                          <td style={tdStyle}>—</td>
                          <td style={tdStyle}>—</td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          color: "#999999",
                          padding: "12px 16px",
                          borderBottom: "1px solid rgba(243, 214, 117, 0.05)",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {t("referrals.empty")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(200px, 1fr))",
              gap: isMobile ? "12px" : "16px",
              marginTop: "24px",
              padding: isMobile ? "12px" : "16px",
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              borderRadius: "6px",
              border: "1px solid rgba(243, 214, 117, 0.1)",
            }}
          >
            <div>
              <span
                style={{
                  color: "#999999",
                  fontSize: isMobile ? "13px" : "14px",
                  marginRight: "8px",
                }}
              >
                {t("stats.referrals")}:
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "500",
                }}
              >
                {partnerDetails?.referrals?.length || 0}
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#999999",
                  fontSize: isMobile ? "13px" : "14px",
                  marginRight: "8px",
                }}
              >
                {t("stats.earnings")}:
              </span>
              <span
                style={{
                  color: "#f3d675",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "500",
                }}
              >
                {partnerDetails?.allTimeEarn || "0.00"} $
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#999999",
                  fontSize: isMobile ? "13px" : "14px",
                  marginRight: "8px",
                }}
              >
                {t("stats.available")}:
              </span>
              <span
                style={{
                  color: "#4CAF50",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "500",
                }}
              >
                {partnerDetails?.availableBalance || "0.00"} $
              </span>
            </div>
          </div>
        </div>
        {partnerDetails?.availableBalance >= 5 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <button
              onClick={() => setPayoutPopupOpen(true)}
              style={{
                padding: isMobile ? "10px 16px" : "12px 20px",
                backgroundColor: "#f3d675",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#000000",
                fontWeight: "500",
                fontSize: isMobile ? "13px" : "14px",
                transition: "all 0.2s",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {t("withdrawal.submit-button")}
            </button>
          </div>
        )}
      </div>
      {isPayoutPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              padding: isMobile ? "20px" : "30px",
              borderRadius: "10px",
              maxWidth: isMobile ? "90%" : "400px",
              width: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <h3
              style={{
                color: "#f3d675",
                marginBottom: "20px",
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              {t("withdrawal.title")}
            </h3>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder={t("withdrawal.address-placeholder")}
              style={{
                width: "100%",
                padding: isMobile ? "8px 10px" : "10px",
                marginBottom: "12px",
                borderRadius: "6px",
                border: "1px solid #f3d675",
                backgroundColor: "#2a2a2a",
                color: "#f3d675",
                fontSize: isMobile ? "13px" : "14px",
              }}
            />
            {payoutError && (
              <div
                style={{
                  color: "#ff4d4d",
                  fontSize: isMobile ? "12px" : "13px",
                  marginBottom: "10px",
                }}
              >
                {payoutError}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <button
                onClick={() => setPayoutPopupOpen(false)}
                style={{
                  padding: isMobile ? "8px 12px" : "10px 14px",
                  backgroundColor: "#999999",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                {t("withdrawal.cancel")}
              </button>
              <button
                onClick={handlePayoutSubmit}
                disabled={isPayoutLoading || wallet.trim() === ""}
                style={{
                  padding: isMobile ? "8px 12px" : "10px 14px",
                  backgroundColor: "#f3d675",
                  border: "none",
                  borderRadius: "6px",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: wallet.trim() ? "pointer" : "not-allowed",
                  opacity: wallet.trim() ? 1 : 0.6,
                  width: isMobile ? "100%" : "auto",
                }}
              >
                {isPayoutLoading
                  ? t("withdrawal.sending")
                  : t("withdrawal.submit-button")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
