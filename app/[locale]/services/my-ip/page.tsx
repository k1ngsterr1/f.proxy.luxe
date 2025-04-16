"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import YandexMap from "@/components/YandexMap";
import RuFlag from "@/assets/images/rus-lang.png";
import { getMyIp } from "@/entities/ip/api/get/get-my-ip.api";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/shared/utils/use-is-mobile";
import {
  Globe,
  MapPin,
  Clock,
  Info,
  Copy,
  RefreshCw,
  MapIcon,
  Navigation,
  Building,
  Hash,
  Layers,
  AlertCircle,
} from "lucide-react";

export interface IpData {
  ip: string;
  country: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  time: string;
  headers: {
    [key: string]: string;
  };
}

export default function MyIpClient() {
  const t = useTranslations();
  const i18n = useTranslations("myIp");
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ip = await getMyIp();
        setIpData(ip);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : i18n("errors.unknownError")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyIp = () => {
    if (ipData) {
      navigator.clipboard.writeText(ipData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const ip = await getMyIp();
      setIpData(ip);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : i18n("errors.unknownError")
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid rgba(243, 214, 117, 0.3)",
              borderTop: "3px solid #f3d675",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "#f3d675", fontSize: "16px", fontWeight: "500" }}>
            {i18n("loading")}
          </p>
          <style jsx global>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <main
        style={{
          paddingTop: isMobile ? 116 : 116,
          backgroundColor: "#000000",
          color: "#FFFFFF",
          minHeight: "100vh",
          padding: isMobile ? "20px 16px" : "40px 20px",
        }}
      >
        <title>{t("myIp.title")}</title>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 82, 82, 0.1)",
            border: "1px solid rgba(255, 82, 82, 0.2)",
            borderRadius: "8px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <AlertCircle size={24} color="#FF5252" />
          <div>
            <h2
              style={{
                color: "#FF5252",
                fontSize: "18px",
                marginBottom: "8px",
              }}
            >
              {i18n("errors.error")}
            </h2>
            <p style={{ color: "#FFFFFF", fontSize: "14px" }}>{error}</p>
            <button
              onClick={handleRefresh}
              style={{
                backgroundColor: "rgba(243, 214, 117, 0.1)",
                color: "#f3d675",
                border: "1px solid rgba(243, 214, 117, 0.3)",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer",
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <RefreshCw size={14} />
              {i18n("tryAgain")}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!ipData) {
    return (
      <main
        style={{
          paddingTop: isMobile ? 116 : 256,
          backgroundColor: "#000000",
          color: "#FFFFFF",
          minHeight: "100vh",
          padding: isMobile ? "20px 16px" : "40px 20px",
        }}
      >
        <title>{t("myIp.title")}</title>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "rgba(243, 214, 117, 0.05)",
            border: "1px solid rgba(243, 214, 117, 0.2)",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <Info size={32} style={{ color: "#f3d675", margin: "0 auto 16px" }} />
          <p style={{ color: "#FFFFFF", fontSize: "16px" }}>
            {i18n("errors.noData")}
          </p>
          <button
            onClick={handleRefresh}
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.1)",
              color: "#f3d675",
              border: "1px solid rgba(243, 214, 117, 0.3)",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
              marginTop: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <RefreshCw size={14} />
            {i18n("tryAgain")}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        paddingTop: isMobile ? 116 : 256,
        backgroundColor: "#000000",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <title>{t("myIps.title")}</title>
      <section style={{ padding: isMobile ? "20px 16px" : "40px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Hero Section */}
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              padding: isMobile ? "24px 16px" : "40px",
              marginBottom: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: isMobile ? "120px" : "200px",
                height: isMobile ? "120px" : "200px",
                background:
                  "radial-gradient(circle, rgba(243, 214, 117, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
                zIndex: 0,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Globe size={24} color="#f3d675" />
                </div>
                <h1
                  style={{
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {i18n("header")}
                </h1>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "16px" : "24px",
                  marginTop: "24px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(243, 214, 117, 0.3)",
                    borderRadius: "8px",
                    padding: "16px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: isMobile ? "20px" : "24px",
                      fontWeight: "600",
                      fontFamily: "monospace",
                      color: "#f3d675",
                    }}
                  >
                    {ipData.ip}
                  </div>
                  <button
                    onClick={handleCopyIp}
                    style={{
                      backgroundColor: copied
                        ? "rgba(76, 175, 80, 0.2)"
                        : "rgba(243, 214, 117, 0.1)",
                      border: copied
                        ? "1px solid rgba(76, 175, 80, 0.3)"
                        : "1px solid rgba(243, 214, 117, 0.3)",
                      borderRadius: "4px",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    title={i18n("copyIp")}
                  >
                    <Copy size={16} color={copied ? "#4CAF50" : "#f3d675"} />
                  </button>
                </div>

                <button
                  onClick={handleRefresh}
                  style={{
                    backgroundColor: "rgba(243, 214, 117, 0.1)",
                    color: "#f3d675",
                    border: "1px solid rgba(243, 214, 117, 0.3)",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: refreshing ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                    opacity: refreshing ? 0.7 : 1,
                  }}
                  disabled={refreshing}
                >
                  <RefreshCw
                    size={16}
                    className={refreshing ? "animate-spin" : ""}
                  />
                  {refreshing ? i18n("refreshing") : i18n("refresh")}
                </button>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#CCCCCC",
                  marginTop: "24px",
                  maxWidth: "800px",
                }}
              >
                {i18n("description.line1")} <br />
                {i18n("description.line2")}
              </p>
            </div>
          </div>

          {/* IP Information Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <InfoCard
              icon={<Globe size={20} color="#f3d675" />}
              label={i18n("fields.country")}
              value={ipData.country}
            />
            <InfoCard
              icon={<Building size={20} color="#f3d675" />}
              label={i18n("fields.city")}
              value={ipData.city}
            />
            <InfoCard
              icon={<Hash size={20} color="#f3d675" />}
              label={i18n("fields.postalCode")}
              value={ipData.postalCode}
            />
            <InfoCard
              icon={<Navigation size={20} color="#f3d675" />}
              label={i18n("fields.latitude")}
              value={ipData.latitude.toString()}
            />
            <InfoCard
              icon={
                <Navigation
                  size={20}
                  color="#f3d675"
                  style={{ transform: "rotate(90deg)" }}
                />
              }
              label={i18n("fields.longitude")}
              value={ipData.longitude.toString()}
            />
            <InfoCard
              icon={<Clock size={20} color="#f3d675" />}
              label={i18n("fields.time")}
              value={ipData.time}
            />
          </div>

          {/* Map Section */}
          <div
            style={{
              position: "relative",
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              padding: isMobile ? "16px" : "24px",
              marginBottom: isMobile ? "32px" : "356px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <MapIcon size={20} color="#f3d675" />
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#f3d675",
                  margin: 0,
                }}
              >
                {i18n("mapTitle")}
              </h2>
            </div>

            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(243, 214, 117, 0.2)",
              }}
            >
              <YandexMap
                latitude={ipData.latitude}
                longitude={ipData.longitude}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                color: "#CCCCCC",
                fontSize: "14px",
              }}
            >
              <MapPin size={16} color="#f3d675" />
              <span>
                {ipData.city}, {ipData.country} ({ipData.latitude.toFixed(4)},{" "}
                {ipData.longitude.toFixed(4)})
              </span>
            </div>
          </div>

          {/* Browser Information Section */}
          <div
            style={{
              backgroundColor: "rgba(243, 214, 117, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(243, 214, 117, 0.2)",
              padding: isMobile ? "16px" : "24px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <Layers size={20} color="#f3d675" />
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#f3d675",
                  margin: 0,
                }}
              >
                {i18n("browserInfo.title")}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid rgba(243, 214, 117, 0.1)",
              }}
            >
              {Object.entries(ipData.headers).map(([header, value]) => (
                <div
                  key={header}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "4px" : "16px",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(243, 214, 117, 0.1)",
                  }}
                >
                  <div
                    style={{
                      minWidth: "180px",
                      fontWeight: "500",
                      color: "#f3d675",
                      fontSize: "14px",
                    }}
                  >
                    {header}
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "14px",
                      wordBreak: "break-word",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper component for info cards
function InfoCard({ icon, label, value, flag = null }: any) {
  return (
    <div
      style={{
        backgroundColor: "rgba(243, 214, 117, 0.05)",
        borderRadius: "8px",
        border: "1px solid rgba(243, 214, 117, 0.2)",
        padding: "16px",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      className="hover:transform hover:scale-102 hover:shadow-md"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {icon}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#CCCCCC",
          }}
        >
          {label}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {flag && (
          <Image
            src={flag || "/placeholder.svg"}
            alt=""
            width={24}
            height={16}
            style={{ borderRadius: "2px" }}
          />
        )}
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#FFFFFF",
          }}
        >
          {value || "—"}
        </div>
      </div>
    </div>
  );
}
