"use client";

import { useState } from "react";
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
  const t = useTranslations('personal-partner');
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

  console.log(partnerDetails)

  const handlePayoutSubmit = async () => {
    setPayoutError("");
    setPayoutLoading(true);
    try {
      await apiClient.post("/api/v1/user/partner/payout", { wallet });
      setPayoutPopupOpen(false);
      setWallet("");
    } catch (err: any) {
      setPayoutError(t('withdrawal.error'));
      console.error(err);
    } finally {
      setPayoutLoading(false);
    }
  };

  const tdStyle = {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(243, 214, 117, 0.05)",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(type);
    setTimeout(() => setShowCopyNotification(null), 2000);
  };

  const createCoupon = () => {
    setCouponCreated(true);
  };

  const id = user?.id
  const referralLink = `${window.location.origin}/register?ref=${id}`;

  const stats = [
    {
      value: "743 551",
      label: t('stats.clients'),
    },
    {
      value: "32 277 133",
      label: t('stats.proxies-sold'),
    },
    {
      value: "477 489",
      label: t('stats.proxies-active'),
    },
    {
      value: "9 206 727",
      label: t('stats.orders-processed'),
    },
  ];

  // Referral data
  const referralLinks = [
    {
      label: t('referral.title'),
      value: referralLink,
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
                {t('verification.message')}
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
            {t('title')}
          </h1>
          <p
            style={{ color: "#f3d675", fontSize: "16px", marginBottom: "12px" }}
          >
            {t('description')} <strong>30%</strong> {t('description-2')}
          </p>
          <p style={{ color: "#FFFFFF", fontSize: "15px" }}>
            {t('requirements')}
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
            {t('participation.title')}
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
                {t('participation.method1.title')}
              </span>{" "}
              {t('participation.method1.description')}
              {t(`percent`)}
            </li>
            <li>
              <span style={{ color: "#f3d675", fontWeight: "500" }}>
                {t('participation.method2.title')}
              </span>{" "}
              {t('participation.method2.description')}
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
            {t('referral-links.title')}
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
                    {t('copy-notification')}
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
              {t('partner-coupon.title')}
            </h2>
            <div style={{ display: "flex", gap: "8px", position: "relative" }}>
              <input
                type="text"
                value={couponCreated ? "PARTNER5" : t('partner-coupon.not-created')}
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
                  {t('partner-coupon.create')}
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
                  {t('copy-notification')}
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
            {t('important-info.title')}
          </h2>
          <p
            style={{ color: "#4CAF50", fontSize: "15px", marginBottom: "16px" }}
          >
            {t('important-info.daily-rewards')}
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "15px",
              marginBottom: "16px",
              lineHeight: "1.5",
            }}
          >
            {t('important-info.withdrawal-info')} <a href="mailto:admin@proxy.luxe" style={{ color: "#f3d675", textDecoration: "none" }}>admin@proxy.luxe</a> {t('important-info.withdrawal-info-2')}
          </p>
          <p style={{ color: "#FF5252", fontSize: "15px", margin: 0 }}>
            {t('important-info.warning')}
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
            {t('stats.title')}
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
                    {t('referrals.table.date')}
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
                    {t('referrals.table.user')}
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
                    {t('referrals.table.purchases')}
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
                    {t('referrals.table.commission')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {partnerDetails?.referrals?.length ? (
                  partnerDetails.referrals.map((referral: any, index: number) => (
                    <tr key={`${referral.id}-${index}`}>
                      <td style={tdStyle}>
                        {new Date(referral.createdAt).toLocaleDateString()}
                      </td>
                      <td style={tdStyle}>{referral.userId}</td>
                      <td style={tdStyle}>—</td>
                      <td style={tdStyle}>—</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{
                      textAlign: "center",
                      color: "#999999",
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(243, 214, 117, 0.05)",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                    }}>
                      {t('referrals.empty')}
                    </td>
                  </tr>
                )}
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
                {t('stats.referrals')}:
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
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
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                {t('stats.earnings')}:
              </span>
              <span
                style={{
                  color: "#f3d675",
                  fontSize: "16px",
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
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                {t('stats.available')}:
              </span>
              <span
                style={{
                  color: "#4CAF50",
                  fontSize: "16px",
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
            >
              {t('withdrawal.submit-button')}
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
              padding: "30px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            <h3 style={{ color: "#f3d675", marginBottom: "20px" }}>{t('withdrawal.title')}</h3>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder={t('withdrawal.address-placeholder')}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "6px",
                border: "1px solid #f3d675",
                backgroundColor: "#2a2a2a",
                color: "#f3d675",
              }}
            />
            {payoutError && (
              <div style={{ color: "#ff4d4d", fontSize: "13px", marginBottom: "10px" }}>
                {payoutError}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                onClick={() => setPayoutPopupOpen(false)}
                style={{
                  padding: "10px 14px",
                  backgroundColor: "#999999",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {t('withdrawal.cancel')}
              </button>
              <button
                onClick={handlePayoutSubmit}
                disabled={isPayoutLoading || wallet.trim() === ""}
                style={{
                  padding: "10px 14px",
                  backgroundColor: "#f3d675",
                  border: "none",
                  borderRadius: "6px",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: wallet.trim() ? "pointer" : "not-allowed",
                  opacity: wallet.trim() ? 1 : 0.6,
                }}
              >
                {isPayoutLoading ? t('withdrawal.sending') : t('withdrawal.submit-button')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
